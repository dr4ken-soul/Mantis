# Phase 10 Demo Results

## Status Notes

- Supabase/Postgres connection worked and the Phase 10 runner saved backtest rows.
- Bitget public OHLCV worked through the direct REST fallback and all backtest rows used `bitget` as the data source.
- The unchanged Mantis backtest rules produced no executed trades on BTC, ETH, SOL, XRP, and DOGE over this 30 day window. This is conservative behaviour, not a runner failure.
- Live scans were saved for all five tokens, but no manipulation stage was triggered in the current market snapshot.
- Bitget Skill Hub did not populate fields because `BITGET_API_KEY`, `BITGET_SECRET`, and `BITGET_PASSPHRASE` are still empty or placeholders in `.env`.
- Coinglass fallback calls returned `Invalid API key provided`, so derivative fallback data was also degraded.

## Backtest Results

symbol | trades | win rate % | pnl % | sharpe | max dd % | profit factor | source
-------+--------+------------+-------+--------+----------+---------------+-------
BTC    | 0      | 0.0        | 0.00  | 0.00   | 0.00     | 0.00          | bitget
ETH    | 0      | 0.0        | 0.00  | 0.00   | 0.00     | 0.00          | bitget
SOL    | 0      | 0.0        | 0.00  | 0.00   | 0.00     | 0.00          | bitget
XRP    | 0      | 0.0        | 0.00  | 0.00   | 0.00     | 0.00          | bitget
DOGE   | 0      | 0.0        | 0.00  | 0.00   | 0.00     | 0.00          | bitget

## Live Detection Scans

symbol | stage | confidence % | layers | recommendation
-------+-------+--------------+--------+---------------
BTC    | None  | 20           | none   | Watch         
ETH    | None  | 20           | none   | Watch         
SOL    | None  | 20           | none   | Watch         
XRP    | None  | 20           | none   | Watch         
DOGE   | None  | 20           | none   | Watch         

## Skill Hub vs Fallback Summary

symbol | bitget skill hub | fallback or empty                                                                                                                                                                        
-------+------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
BTC    | none populated   | funding_rate fallback/empty, long_short_ratio fallback/default, fear_greed_index empty, oi_change_1h fallback/empty, whale_activity_score empty, etf_flow_usd empty, news narrative empty
ETH    | none populated   | funding_rate fallback/empty, long_short_ratio fallback/default, fear_greed_index empty, oi_change_1h fallback/empty, whale_activity_score empty, etf_flow_usd empty, news narrative empty
SOL    | none populated   | funding_rate fallback/empty, long_short_ratio fallback/default, fear_greed_index empty, oi_change_1h fallback/empty, whale_activity_score empty, etf_flow_usd empty, news narrative empty
XRP    | none populated   | funding_rate fallback/empty, long_short_ratio fallback/default, fear_greed_index empty, oi_change_1h fallback/empty, whale_activity_score empty, etf_flow_usd empty, news narrative empty
DOGE   | none populated   | funding_rate fallback/empty, long_short_ratio fallback/default, fear_greed_index empty, oi_change_1h fallback/empty, whale_activity_score empty, etf_flow_usd empty, news narrative empty

## Raw JSON

```json
{
  "backtests": [
    {
      "symbol": "BTC",
      "period_days": 30,
      "total_trades": 0,
      "win_rate": 0.0,
      "total_pnl_pct": 0.0,
      "sharpe_ratio": 0.0,
      "max_drawdown_pct": 0.0,
      "profit_factor": 0.0,
      "data_source": "bitget",
      "db_id": 1
    },
    {
      "symbol": "ETH",
      "period_days": 30,
      "total_trades": 0,
      "win_rate": 0.0,
      "total_pnl_pct": 0.0,
      "sharpe_ratio": 0.0,
      "max_drawdown_pct": 0.0,
      "profit_factor": 0.0,
      "data_source": "bitget",
      "db_id": 2
    },
    {
      "symbol": "SOL",
      "period_days": 30,
      "total_trades": 0,
      "win_rate": 0.0,
      "total_pnl_pct": 0.0,
      "sharpe_ratio": 0.0,
      "max_drawdown_pct": 0.0,
      "profit_factor": 0.0,
      "data_source": "bitget",
      "db_id": 3
    },
    {
      "symbol": "XRP",
      "period_days": 30,
      "total_trades": 0,
      "win_rate": 0.0,
      "total_pnl_pct": 0.0,
      "sharpe_ratio": 0.0,
      "max_drawdown_pct": 0.0,
      "profit_factor": 0.0,
      "data_source": "bitget",
      "db_id": 4
    },
    {
      "symbol": "DOGE",
      "period_days": 30,
      "total_trades": 0,
      "win_rate": 0.0,
      "total_pnl_pct": 0.0,
      "sharpe_ratio": 0.0,
      "max_drawdown_pct": 0.0,
      "profit_factor": 0.0,
      "data_source": "bitget",
      "db_id": 5
    }
  ],
  "scans": [
    {
      "symbol": "BTC",
      "stage": "None",
      "stage_number": 0,
      "confidence": 0.2,
      "layers": "none",
      "recommendation": "Watch",
      "skill_hub": [],
      "fallback": [
        "funding_rate fallback/empty",
        "long_short_ratio fallback/default",
        "fear_greed_index empty",
        "oi_change_1h fallback/empty",
        "whale_activity_score empty",
        "etf_flow_usd empty",
        "news narrative empty"
      ]
    },
    {
      "symbol": "ETH",
      "stage": "None",
      "stage_number": 0,
      "confidence": 0.2,
      "layers": "none",
      "recommendation": "Watch",
      "skill_hub": [],
      "fallback": [
        "funding_rate fallback/empty",
        "long_short_ratio fallback/default",
        "fear_greed_index empty",
        "oi_change_1h fallback/empty",
        "whale_activity_score empty",
        "etf_flow_usd empty",
        "news narrative empty"
      ]
    },
    {
      "symbol": "SOL",
      "stage": "None",
      "stage_number": 0,
      "confidence": 0.2,
      "layers": "none",
      "recommendation": "Watch",
      "skill_hub": [],
      "fallback": [
        "funding_rate fallback/empty",
        "long_short_ratio fallback/default",
        "fear_greed_index empty",
        "oi_change_1h fallback/empty",
        "whale_activity_score empty",
        "etf_flow_usd empty",
        "news narrative empty"
      ]
    },
    {
      "symbol": "XRP",
      "stage": "None",
      "stage_number": 0,
      "confidence": 0.2,
      "layers": "none",
      "recommendation": "Watch",
      "skill_hub": [],
      "fallback": [
        "funding_rate fallback/empty",
        "long_short_ratio fallback/default",
        "fear_greed_index empty",
        "oi_change_1h fallback/empty",
        "whale_activity_score empty",
        "etf_flow_usd empty",
        "news narrative empty"
      ]
    },
    {
      "symbol": "DOGE",
      "stage": "None",
      "stage_number": 0,
      "confidence": 0.2,
      "layers": "none",
      "recommendation": "Watch",
      "skill_hub": [],
      "fallback": [
        "funding_rate fallback/empty",
        "long_short_ratio fallback/default",
        "fear_greed_index empty",
        "oi_change_1h fallback/empty",
        "whale_activity_score empty",
        "etf_flow_usd empty",
        "news narrative empty"
      ]
    }
  ]
}
```
