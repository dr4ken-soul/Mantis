# Mantis — Build Guide

Step-by-step Claude Code prompts. Complete each phase in order. Do not move to the next phase until the current one runs without errors.

---

## Before You Start

1. Copy your Quil codebase into a new folder called `mantis/`
2. Install the Bitget Agent Hub MCP in Claude Code:

```bash
npx bitget-hub upgrade-all --target claude
```

3. Add the MCP server:

```bash
claude mcp add -s user \
  --env BITGET_API_KEY=your-api-key \
  --env BITGET_SECRET_KEY=your-secret-key \
  --env BITGET_PASSPHRASE=your-passphrase \
  bitget \
  -- npx -y bitget-mcp-server
```

4. Copy `.env.example` to `.env` and fill in your Bitget API key, Supabase URL, and Coinglass key.

---

## Phase 1 — Bitget Skill Hub Data Client

**Prompt to paste into Claude Code:**

```
Create a new file at data/bitget_skills.py.

This is an async Python client for the Bitget Skill Hub REST API. It wraps three skills:
sentiment-analyst, market-intel, and news-briefing.

The client must:
- Use httpx.AsyncClient with a 30-second timeout
- Read the BITGET_API_KEY from environment variables for authentication
- Have a separate async method for each skill: get_sentiment(symbol), get_market_intel(symbol), get_news(symbol)
- Return a structured dict from each method with all fields normalised to float or None
- Log all errors using the existing utils/logger.py get_logger pattern
- Handle HTTP errors and API errors gracefully — never raise, always return None on failure
- Include full docstrings on the class and each method

The sentiment data needed from get_sentiment: funding_rate (float), long_short_ratio (float), fear_greed_index (float).

The market intel data needed from get_market_intel: oi_change_1h (float), whale_activity_score (float, 0-1), etf_flow_usd (float).

The news data needed from get_news: has_negative_narrative (bool), narrative_summary (str).

Add BITGET_SKILL_HUB_BASE_URL to config/settings.py reading from environment with default "https://agenthub.bitget.com/v1/skills".
```

---

## Phase 2 — Wire Skill Hub Into the Data Pipeline

**Prompt to paste into Claude Code:**

```
Adapt core/data_pipeline.py to use data/bitget_skills.py as the primary perception source.

In the build_token_profile() method, before calling Coinglass or blockchain explorers, call BitgetSkillsClient and use its output to populate the token's DerivativesMetrics and OnChainMetrics fields.

Mapping:
- sentiment.funding_rate → token.derivatives.funding_rate
- sentiment.long_short_ratio → token.derivatives.long_short_ratio
- sentiment.fear_greed_index → token.metrics.fear_greed_index (add this field to TokenMetrics if missing)
- market_intel.oi_change_1h → token.derivatives.oi_change_1h
- market_intel.whale_activity_score → token.on_chain.whale_activity_score (add if missing)
- market_intel.etf_flow_usd → token.on_chain.etf_flow_usd (add if missing)

If BitgetSkillsClient returns None for a field, fall through to the existing Coinglass or explorer source as before. Do not remove any existing data source — Bitget Skill Hub is additive, not a replacement.

Log which source populated each field at DEBUG level.
```

---

## Phase 3 — Adapt Layer 3 to Use Skill Hub Funding Data

**Prompt to paste into Claude Code:**

```
Update detection/layer3_funding.py so that _check_current_funding() and _check_funding_trend() read from token.derivatives.funding_rate first (which is now populated by the Bitget Skill Hub sentiment-analyst skill) before falling back to any direct Coinglass call.

The logic and thresholds must remain identical — only the data source changes. If token.derivatives.funding_rate is not None, use it directly. If it is None, call Coinglass as the existing code does.

Also update _check_cross_exchange_funding() to use Bitget as one of the comparison exchanges since Mantis runs on Bitget. If there is funding rate data available for both Binance and Bitget, calculate the divergence between them. A divergence above 0.5% in either direction is an additional signal. Add this as Signal 5 in the layer with a weight of 0.8 within the max_score.

Do not change anything else in this file.
```

---

## Phase 4 — Adapt Layer 2 to Use Skill Hub OI Data

**Prompt to paste into Claude Code:**

```
Update detection/layer2_perp.py so that _check_oi_ratio() and _check_volume_spike() read from token.derivatives.oi_change_1h (populated by the Bitget Skill Hub market-intel skill) when available, before falling back to any Coinglass call.

The logic and thresholds remain identical. Only add a comment at the top of each affected method indicating the primary data source is now Bitget Skill Hub via the token model.

Do not change scoring weights or signal structure.
```

---

## Phase 5 — Update Signal Aggregator for Mantis

**Prompt to paste into Claude Code:**

```
Update core/signal_aggregator.py with new framework weights for Mantis.

Replace the existing FRAMEWORK_WEIGHTS dict with:

FRAMEWORK_WEIGHTS = {
    "crime_pump_stage": 0.45,
    "technical_analysis": 0.30,
    "volume_analysis": 0.15,
    "market_structure": 0.10,
}

Remove the existing "crime_pump_overlay" weight. Crime pump is now the PRIMARY driver in Mantis, not an overlay warning.

In generate_trade_signal(), after the lifecycle classifier runs and returns a stage, apply this logic before _determine_direction():
- If stage is STAGE_THREE (trap): force direction to SHORT with a 0.85 confidence floor, regardless of technical signals, unless technical analysis is strongly opposing (above 70% signal strength in the opposite direction)
- If stage is STAGE_TWO (OI matrix): allow direction from technical analysis but apply a 0.1 confidence boost
- If stage is STAGE_FOUR (distribution): return None signal — do not trade
- If stage is STAGE_ONE or NONE: use existing technical analysis logic unchanged

The crime_pump_detector must be called at the start of generate_trade_signal() if not already called upstream. Pass in the layer results from detection/crime_pump_detector.py.
```

---

## Phase 6 — Adapt Execution Engine to Bitget Primary

**Prompt to paste into Claude Code:**

```
Update core/execution_engine.py so that Bitget is the primary exchange for all paper and live trade execution.

In initialize_exchanges(), attempt Bitget connection first. If Bitget connection fails, log an error and exit — do not fall back to another exchange for Mantis.

In the EXCHANGE_CONFIGS in config/settings.py, update the Bitget entry to include:
options: {"defaultType": "swap"}

This sets Bitget to futures/perpetual swap mode by default.

Make sure TRADING_MODE reads from the TRADING_MODE environment variable with "paper" as the default. Never default to live.

Do not change the two-step confirmation flow for live trades.
```

---

## Phase 7 — Backtester Adaptation

**Prompt to paste into Claude Code:**

```
Update core/backtester.py so it fetches historical OHLCV data from Bitget instead of CoinGecko.

Use the CCXT Bitget client (already in core/execution_engine.py) to call exchange.fetch_ohlcv(symbol, timeframe, limit) for historical candles. Timeframe should be "1d" for the backtest. Fall back to CoinGecko if the CCXT call fails.

The backtest logic, trade simulation, and metrics calculation (win rate, Sharpe, max drawdown, profit factor) must remain exactly as they are. Only the OHLCV data source changes.

Add a note in the BacktestResult dataclass for a new field: data_source (str) — either "bitget" or "coingecko" — so the dashboard can show where the data came from.
```

---

## Phase 8 — FastAPI Layer

**Prompt to paste into Claude Code:**

```
Create api.py at the project root. This is a FastAPI application that exposes the Mantis agent data to the React dashboard.

Endpoints to create:

GET /api/tokens
Returns a list of all tokens in the database with their current lifecycle stage, stage_confidence, and last_scanned_at. Query from the tokens table via utils/database.py.

GET /api/tokens/{symbol}
Returns the full detection layer scores for the last scan of that symbol. Include layer_number, layer_name, score, triggered, and the signals list from the detection_results table.

GET /api/positions
Returns all open paper positions with symbol, direction, entry_price, current_price, unrealised_pnl, leverage, and status.

GET /api/stats
Returns win_rate, total_pnl_pct, total_trades, and sharpe_ratio from the most recent backtest results for all symbols combined.

POST /api/scan/{symbol}
Triggers an immediate full detection scan for the symbol. Runs the crime pump detector pipeline and updates the tokens and detection_results tables. Returns the new lifecycle stage.

GET /api/backtest/{symbol}
Returns the most recent backtest result for the symbol from the backtest_results table.

Add CORS middleware allowing all origins for the hackathon demo. Use the existing utils/database.py async session pattern. Run with uvicorn on port 8001.
```

---

## Phase 9 — React Dashboard

**Prompt to paste into Claude Code:**

```
Create a React 18 + Vite + TypeScript frontend in the frontend/ directory.

Install: react, react-dom, typescript, vite, @tanstack/react-query, recharts, tailwindcss, lucide-react, axios.

The dashboard has three pages:

1. / — Token Board
A grid of cards, one per monitored token. Each card shows: token symbol, current lifecycle stage as a coloured badge (Stage 1 = grey, Stage 2 = blue, Stage 3 = red, Stage 4 = yellow), stage confidence as a percentage, and last scanned time. Clicking a card opens the token detail view.

2. /token/:symbol — Token Detail
Shows the four detection layers as a horizontal bar chart (recharts). Each bar shows the layer score from 0 to 1. Below the chart, show the lifecycle stage explanation: what stage it is in and what Mantis will do. Show the most recent trade signal if one exists (direction, entry, SL, TP, leverage).

3. /positions — Active Positions
A table showing all open paper positions: symbol, direction (LONG/SHORT as coloured tag), entry price, current price, unrealised PnL as percentage (green if positive, red if negative), leverage.

Design: dark background (#0d0d0d), off-white text (#f0f0f0), monospace numbers (JetBrains Mono), minimal top navigation bar with two items (Board and Positions). Use tailwindcss utility classes throughout.

All data fetches use @tanstack/react-query hitting http://localhost:8001/api in development and the Railway URL in production. Polling interval: 30 seconds.

Stage badge colours:
- Stage 1 (Accumulation): bg-zinc-700 text-zinc-300
- Stage 2 (OI Matrix): bg-blue-900 text-blue-300
- Stage 3 (Trap): bg-red-900 text-red-300
- Stage 4 (Distribution): bg-yellow-900 text-yellow-300
```

---

## Phase 10 — Demo Preparation

**Prompt to paste into Claude Code:**

```
Run a full backtest for BTC, ETH, and three altcoins from the Bitget market. Use a 30-day period. Output the results as a formatted table showing: symbol, total trades, win rate, total PnL %, Sharpe ratio, max drawdown %, profit factor.

Save the results to the backtest_results table.

Also run the crime pump detector live on at least five tokens from the Bitget markets and classify their current lifecycle stages. Log the stage and confidence for each.

Print a summary of what data came from Bitget Skill Hub vs fallback sources for each scan so we can document the Skill Hub usage in the submission.
```

---

## Deployment

### Railway (Python backend)

```bash
# Procfile
web: uvicorn api:app --host 0.0.0.0 --port $PORT
worker: python main.py
```

Set all environment variables in Railway dashboard. Enable Supabase PostgreSQL as the database.

### Vercel (React frontend)

```bash
cd frontend
npm run build
# Deploy the dist/ folder to Vercel
# Set VITE_API_URL to your Railway backend URL
```

---

## Submission Checklist

- [ ] Demo URL loads without login and shows live token lifecycle stages
- [ ] Backtest results table visible in the dashboard
- [ ] At least one paper position visible in the positions view
- [ ] Project description written (under 200 words, mentions Bitget Skill Hub skills used)
- [ ] Repost of Bitget official interaction post published tagged `#BitgetHackathon`
- [ ] Project intro post published tagged `#BitgetHackathon` @BitgetAI
- [ ] Both post links included in the submission form
- [ ] Demo video recorded (3 minutes maximum, optional but recommended)
- [ ] Submitted via the Bitget submission link before 25 June 24:00 UTC+8
