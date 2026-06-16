"""
Mantis FastAPI dashboard API.

Exposes scan results, paper positions, aggregate stats, and backtest rows to
the React dashboard. Run locally with:
    uvicorn api:app --host 0.0.0.0 --port 8001
"""

import json
from contextlib import asynccontextmanager
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from core.data_pipeline import DataPipeline
from detection.crime_pump_detector import CrimePumpDetector
from models import CrimeStage
from utils.database import (
    get_active_positions,
    get_backtest_stats,
    get_dashboard_tokens,
    get_latest_backtest_result,
    get_latest_detection_results,
    init_db,
    save_detection_results,
    upsert_dashboard_token,
)
from utils.logger import get_logger

log = get_logger("api")

data_pipeline: DataPipeline | None = None
detector: CrimePumpDetector | None = None


def _stage_to_number(stage: CrimeStage | str | None) -> int:
    """Map lifecycle stage values to the numeric stage used by the dashboard."""
    value = stage.value if isinstance(stage, CrimeStage) else str(stage or "")
    return {
        CrimeStage.STAGE_ONE.value: 1,
        CrimeStage.STAGE_TWO.value: 2,
        CrimeStage.STAGE_THREE.value: 3,
        CrimeStage.STAGE_FOUR.value: 4,
    }.get(value, 0)


def _jsonable_row(row: dict[str, Any]) -> dict[str, Any]:
    """Convert database rows into JSON-friendly dictionaries."""
    clean = {}
    for key, value in row.items():
        if hasattr(value, "isoformat"):
            clean[key] = value.isoformat()
        else:
            clean[key] = value
    return clean


def _normalize_signals(value: Any) -> list:
    """Return signals as a list regardless of SQLite/Postgres representation."""
    if value is None:
        return []
    if isinstance(value, list):
        return value
    if isinstance(value, str):
        try:
            parsed = json.loads(value)
            return parsed if isinstance(parsed, list) else [parsed]
        except json.JSONDecodeError:
            return []
    return [value]


def _layer_to_dict(layer) -> dict:
    """Convert a DetectionLayerResult model into a DB-ready dict."""
    if hasattr(layer, "model_dump"):
        data = layer.model_dump()
    else:
        data = dict(layer)
    return {
        "layer_number": data.get("layer_number"),
        "layer_name": data.get("layer_name"),
        "score": data.get("score", 0.0),
        "triggered": data.get("triggered", False),
        "signals": data.get("signals", []),
    }


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize shared API resources."""
    global data_pipeline, detector
    await init_db()
    data_pipeline = DataPipeline()
    detector = CrimePumpDetector()
    log.info("api_started")
    try:
        yield
    finally:
        if data_pipeline:
            await data_pipeline.close()
        log.info("api_stopped")


app = FastAPI(title="Mantis API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/tokens")
async def list_tokens() -> list[dict]:
    """Return monitored tokens with lifecycle stage and last scan time."""
    rows = await get_dashboard_tokens()
    return [_jsonable_row(row) for row in rows]


@app.get("/api/tokens/{symbol}")
async def get_token(symbol: str) -> dict:
    """Return latest detection layer scores for a token."""
    rows = await get_latest_detection_results(symbol)
    if not rows:
        raise HTTPException(status_code=404, detail=f"No detection results for {symbol.upper()}")

    layers = []
    for row in rows:
        item = _jsonable_row(row)
        item["signals"] = _normalize_signals(item.get("signals"))
        item["triggered"] = bool(item.get("triggered"))
        layers.append(item)

    return {"symbol": symbol.upper().replace("$", ""), "layers": layers}


@app.get("/api/positions")
async def list_positions() -> list[dict]:
    """Return all open paper positions."""
    rows = await get_active_positions()
    positions = []
    for row in rows:
        item = _jsonable_row(row)
        positions.append({
            "id": item.get("id"),
            "symbol": item.get("symbol") or item.get("token_symbol"),
            "direction": item.get("direction"),
            "entry_price": item.get("entry_price", 0.0),
            "current_price": item.get("current_price", 0.0),
            "unrealised_pnl": item.get("pnl_pct", 0.0),
            "unrealised_pnl_usd": item.get("pnl_usd", 0.0),
            "leverage": item.get("leverage", 1),
            "status": "open" if item.get("is_open", 1) else "closed",
        })
    return positions


@app.get("/api/stats")
async def get_stats() -> dict:
    """Return aggregate stats from the latest backtest rows."""
    return await get_backtest_stats()


@app.post("/api/scan/{symbol}")
async def scan_symbol(symbol: str) -> dict:
    """Run an immediate full detection scan and persist dashboard rows."""
    if data_pipeline is None or detector is None:
        raise HTTPException(status_code=503, detail="Scanner is not initialized")

    token = await data_pipeline.build_token_profile(symbol)
    if token is None:
        raise HTTPException(status_code=404, detail=f"Token not found: {symbol.upper()}")

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

    current_stage = _stage_to_number(alert.crime_stage)
    await upsert_dashboard_token(
        alert.token_symbol,
        current_stage=current_stage,
        stage_confidence=alert.stage_confidence,
    )
    await save_detection_results(
        alert.token_symbol,
        [_layer_to_dict(layer) for layer in alert.layer_results],
    )

    return {
        "symbol": alert.token_symbol,
        "current_stage": current_stage,
        "stage": alert.crime_stage.value,
        "stage_confidence": alert.stage_confidence,
        "confidence_level": alert.confidence_level.value,
        "layers_triggered": alert.layers_triggered,
        "recommendation": alert.recommendation.value,
        "signals": alert.signals_detected,
    }


@app.get("/api/backtest/{symbol}")
async def get_backtest(symbol: str) -> dict:
    """Return the most recent backtest result for a token."""
    row = await get_latest_backtest_result(symbol)
    if not row:
        raise HTTPException(status_code=404, detail=f"No backtest result for {symbol.upper()}")
    return _jsonable_row(row)
