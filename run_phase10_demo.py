"""
Phase 10 demo runner for Mantis.

Runs the Bitget-market backtests, saves dashboard-ready rows, scans live
tokens, and prints a compact Skill Hub versus fallback summary for submission.
"""

import asyncio
import json
import sys
from pathlib import Path
from typing import Any

from dotenv import load_dotenv

load_dotenv()

import detection.crime_pump_detector as detector_module
from core.backtester import BacktestEngine
from core.data_pipeline import DataPipeline
from core.signal_aggregator import SignalAggregator
from detection.crime_pump_detector import CrimePumpDetector
from models import CrimeStage
from utils.database import (
    init_db,
    save_backtest_result,
    save_detection_results,
    upsert_dashboard_token,
)
from utils.logger import setup_logging

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


BACKTEST_SYMBOLS = ["BTC", "ETH", "SOL", "XRP", "DOGE"]
SCAN_SYMBOLS = ["BTC", "ETH", "SOL", "XRP", "DOGE"]


async def _skip_backtest_persistence(*args, **kwargs) -> int:
    """Skip per-candle detector writes during backtests."""
    return 0


async def persist_with_retries(label: str, func, *args, attempts: int = 3, **kwargs):
    """Persist a row without letting transient database issues kill the report."""
    last_error = None
    for attempt in range(1, attempts + 1):
        try:
            return await func(*args, **kwargs)
        except Exception as error:
            last_error = error
            print(f"  {label} save failed ({attempt}/{attempts}): {error}")
            if attempt < attempts:
                await asyncio.sleep(2 * attempt)
    return {"error": str(last_error)}


def stage_to_number(stage: CrimeStage | str | None) -> int:
    """Convert a lifecycle stage enum/string to the dashboard number."""
    value = stage.value if isinstance(stage, CrimeStage) else str(stage or "")
    return {
        CrimeStage.STAGE_ONE.value: 1,
        CrimeStage.STAGE_TWO.value: 2,
        CrimeStage.STAGE_THREE.value: 3,
        CrimeStage.STAGE_FOUR.value: 4,
    }.get(value, 0)


def layer_to_dict(layer: Any) -> dict:
    """Convert a detection layer model to a database-ready dictionary."""
    data = layer.model_dump() if hasattr(layer, "model_dump") else dict(layer)
    return {
        "layer_number": data.get("layer_number"),
        "layer_name": data.get("layer_name"),
        "score": data.get("score", 0.0),
        "triggered": data.get("triggered", False),
        "signals": data.get("signals", []),
    }


def fmt(value: float | int | None, places: int = 2) -> str:
    """Format a number for table output."""
    if value is None:
        return "n/a"
    try:
        return f"{float(value):.{places}f}"
    except (TypeError, ValueError):
        return "n/a"


def table(headers: list[str], rows: list[list[Any]]) -> str:
    """Render a small plain-text table."""
    text_rows = [[str(cell) for cell in row] for row in rows]
    widths = [
        max(len(headers[i]), *(len(row[i]) for row in text_rows))
        for i in range(len(headers))
    ]
    header = " | ".join(headers[i].ljust(widths[i]) for i in range(len(headers)))
    divider = "-+-".join("-" * width for width in widths)
    body = "\n".join(
        " | ".join(row[i].ljust(widths[i]) for i in range(len(headers)))
        for row in text_rows
    )
    return f"{header}\n{divider}\n{body}" if body else f"{header}\n{divider}"


def skill_source_summary(token) -> dict:
    """Summarize which token fields appear to be populated by Skill Hub."""
    skill_fields = []
    fallback_fields = []

    if token.derivatives.funding_rate != 0:
        skill_fields.append("sentiment funding_rate")
    else:
        fallback_fields.append("funding_rate fallback/empty")

    if token.derivatives.long_short_ratio != 1:
        skill_fields.append("sentiment long_short_ratio")
    else:
        fallback_fields.append("long_short_ratio fallback/default")

    if token.metrics.fear_greed_index != 0:
        skill_fields.append("sentiment fear_greed_index")
    else:
        fallback_fields.append("fear_greed_index empty")

    if token.derivatives.oi_change_1h != 0:
        skill_fields.append("market-intel oi_change_1h")
    else:
        fallback_fields.append("oi_change_1h fallback/empty")

    if token.onchain.whale_activity_score != 0:
        skill_fields.append("market-intel whale_activity_score")
    else:
        fallback_fields.append("whale_activity_score empty")

    if token.onchain.etf_flow_usd != 0:
        skill_fields.append("market-intel etf_flow_usd")
    else:
        fallback_fields.append("etf_flow_usd empty")

    if any(s.get("source") == "bitget_skill_hub.news-briefing" for s in token.detection_signals):
        skill_fields.append("news-briefing narrative")
    else:
        fallback_fields.append("news narrative empty")

    return {
        "skill_hub": skill_fields,
        "fallback": fallback_fields,
    }


async def run_backtests(backtester: BacktestEngine) -> list[dict]:
    """Run 30-day backtests and persist summary rows."""
    results = []
    for symbol in BACKTEST_SYMBOLS:
        print(f"\nbacktesting {symbol} on bitget markets")
        result = await backtester.run_backtest(symbol, days=30)
        if result.error:
            print(f"  error: {result.error}")
            results.append({"symbol": symbol, "error": result.error})
            continue

        row = {
            "symbol": result.symbol,
            "period_days": result.period_days,
            "total_trades": result.total_trades,
            "win_rate": result.win_rate,
            "total_pnl_pct": result.total_pnl_pct,
            "sharpe_ratio": result.sharpe_ratio,
            "max_drawdown_pct": result.max_drawdown_pct,
            "profit_factor": result.profit_factor,
            "data_source": result.data_source or "unknown",
        }
        db_result = await persist_with_retries(
            f"{symbol} backtest_result",
            save_backtest_result,
            row,
        )
        if isinstance(db_result, dict) and "error" in db_result:
            row["db_error"] = db_result["error"]
        else:
            row["db_id"] = db_result
        results.append(row)
    return results


async def run_live_scans(data_pipeline: DataPipeline, detector: CrimePumpDetector) -> list[dict]:
    """Run live detector scans and persist dashboard rows."""
    rows = []
    for symbol in SCAN_SYMBOLS:
        print(f"\nscanning {symbol} live")
        token = await data_pipeline.build_token_profile(symbol)
        if token is None:
            rows.append({"symbol": symbol, "error": "token profile unavailable"})
            print("  error: token profile unavailable")
            continue

        derivatives_data = await data_pipeline.get_derivatives_snapshot(token)
        wallet_data = await data_pipeline.get_wallet_analysis(token)
        funding_data = derivatives_data.get("funding_rates") if derivatives_data else None

        alert = await detector.scan_token(
            token,
            wallet_data=wallet_data,
            derivatives_data=derivatives_data,
            funding_data=funding_data,
            is_refresh=True,
        )

        current_stage = stage_to_number(alert.crime_stage)
        token_save = await persist_with_retries(
            f"{alert.token_symbol} dashboard_token",
            upsert_dashboard_token,
            alert.token_symbol,
            current_stage=current_stage,
            stage_confidence=alert.stage_confidence,
        )
        if isinstance(token_save, dict) and "error" in token_save:
            print(f"  dashboard token save skipped: {token_save['error']}")

        detection_save = await persist_with_retries(
            f"{alert.token_symbol} detection_results",
            save_detection_results,
            alert.token_symbol,
            [layer_to_dict(layer) for layer in alert.layer_results],
        )
        if isinstance(detection_save, dict) and "error" in detection_save:
            print(f"  detection result save skipped: {detection_save['error']}")

        source_summary = skill_source_summary(token)
        rows.append({
            "symbol": alert.token_symbol,
            "stage": alert.crime_stage.value,
            "stage_number": current_stage,
            "confidence": alert.stage_confidence,
            "layers": ",".join(str(layer) for layer in alert.layers_triggered) or "none",
            "recommendation": alert.recommendation.value,
            "skill_hub": source_summary["skill_hub"],
            "fallback": source_summary["fallback"],
        })
    return rows


def write_report(backtests: list[dict], scans: list[dict]) -> Path:
    """Write a markdown report for the demo/submission folder."""
    output = Path("data_store") / "phase10_demo_results.md"
    output.parent.mkdir(exist_ok=True)

    backtest_rows = [
        [
            row.get("symbol"),
            row.get("total_trades", "err"),
            fmt(row.get("win_rate"), 1),
            fmt(row.get("total_pnl_pct"), 2),
            fmt(row.get("sharpe_ratio"), 2),
            fmt(row.get("max_drawdown_pct"), 2),
            fmt(row.get("profit_factor"), 2),
            row.get("data_source", row.get("error", "")),
        ]
        for row in backtests
    ]
    scan_rows = [
        [
            row.get("symbol"),
            row.get("stage", row.get("error", "")),
            fmt(float(row.get("confidence", 0)) * 100, 0) if "confidence" in row else "n/a",
            row.get("layers", "n/a"),
            row.get("recommendation", "n/a"),
        ]
        for row in scans
    ]

    source_rows = [
        [
            row.get("symbol"),
            ", ".join(row.get("skill_hub", [])) or "none populated",
            ", ".join(row.get("fallback", [])) or "none",
        ]
        for row in scans
        if "error" not in row
    ]

    content = "\n\n".join([
        "# Phase 10 Demo Results",
        "## Backtest Results",
        table(
            ["symbol", "trades", "win rate %", "pnl %", "sharpe", "max dd %", "profit factor", "source"],
            backtest_rows,
        ),
        "## Live Detection Scans",
        table(
            ["symbol", "stage", "confidence %", "layers", "recommendation"],
            scan_rows,
        ),
        "## Skill Hub vs Fallback Summary",
        table(
            ["symbol", "bitget skill hub", "fallback or empty"],
            source_rows,
        ),
        "## Raw JSON",
        "```json\n" + json.dumps({"backtests": backtests, "scans": scans}, indent=2, default=str) + "\n```",
    ])
    output.write_text(content, encoding="utf-8")
    return output


async def main() -> None:
    """Run Phase 10 end to end."""
    setup_logging("INFO")
    db_init = await persist_with_retries("database_init", init_db, attempts=2)
    if isinstance(db_init, dict) and "error" in db_init:
        print(f"database init failed, continuing with report-only mode: {db_init['error']}")

    detector = CrimePumpDetector()
    data_pipeline = DataPipeline()
    backtester = BacktestEngine(
        signal_aggregator=SignalAggregator(),
        detector=detector,
    )

    try:
        original_alert_save = detector_module.save_crime_pump_alert
        original_scan_save = detector_module.save_scan_result
        detector_module.save_crime_pump_alert = _skip_backtest_persistence
        detector_module.save_scan_result = _skip_backtest_persistence
        backtests = await run_backtests(backtester)
        detector_module.save_crime_pump_alert = original_alert_save
        detector_module.save_scan_result = original_scan_save
        scans = await run_live_scans(data_pipeline, detector)
        report = write_report(backtests, scans)
    finally:
        if detector_module.save_crime_pump_alert is _skip_backtest_persistence:
            detector_module.save_crime_pump_alert = original_alert_save
        if detector_module.save_scan_result is _skip_backtest_persistence:
            detector_module.save_scan_result = original_scan_save
        await backtester.close()
        await data_pipeline.close()

    print("\nBACKTEST TABLE")
    print(table(
        ["symbol", "trades", "win rate %", "pnl %", "sharpe", "max dd %", "profit factor", "source"],
        [
            [
                row.get("symbol"),
                row.get("total_trades", "err"),
                fmt(row.get("win_rate"), 1),
                fmt(row.get("total_pnl_pct"), 2),
                fmt(row.get("sharpe_ratio"), 2),
                fmt(row.get("max_drawdown_pct"), 2),
                fmt(row.get("profit_factor"), 2),
                row.get("data_source", row.get("error", "")),
            ]
            for row in backtests
        ],
    ))

    print("\nLIVE SCAN TABLE")
    print(table(
        ["symbol", "stage", "confidence %", "layers", "recommendation"],
        [
            [
                row.get("symbol"),
                row.get("stage", row.get("error", "")),
                fmt(float(row.get("confidence", 0)) * 100, 0) if "confidence" in row else "n/a",
                row.get("layers", "n/a"),
                row.get("recommendation", "n/a"),
            ]
            for row in scans
        ],
    ))

    print("\nSKILL HUB VS FALLBACK")
    for row in scans:
        if "error" in row:
            print(f"{row.get('symbol')}: {row['error']}")
            continue
        print(f"{row['symbol']}:")
        print(f"  bitget skill hub: {', '.join(row['skill_hub']) or 'none populated'}")
        print(f"  fallback or empty: {', '.join(row['fallback']) or 'none'}")

    print(f"\nreport saved to {report}")


if __name__ == "__main__":
    asyncio.run(main())
