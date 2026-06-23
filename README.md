# Mantis

Mantis is a Bitget-native trading agent built for the Bitget AI hackathon.

Instead of acting like a trend-following or mean-reversion bot, Mantis watches for coordinated market manipulation across four data layers:

- on-chain movement
- perpetual futures pressure
- funding and exchange divergence
- orderbook and liquidity behaviour

The goal is simple: detect when a market move starts looking manufactured, classify the token's crime-pump lifecycle stage, and only produce a trade signal when the setup is clean enough.

## What It Does

- Builds token profiles from market, derivatives, on-chain, and narrative data
- Uses Bitget Skill Hub as the primary perception layer where available
- Falls back to Coinglass, explorers, DexScreener, CoinGecko, and public Bitget market data
- Classifies tokens into lifecycle stages:
  - Stage 1: accumulation
  - Stage 2: OI matrix
  - Stage 3: trap
  - Stage 4: distribution
- Runs Bitget-market backtests
- Exposes a FastAPI backend for the dashboard
- Includes a React/Vite dashboard for token stages, detection layers, positions, and stats

## Project Structure

```text
api.py                         FastAPI dashboard API
run_phase10_demo.py            Hackathon demo/backtest runner
core/                          data pipeline, backtester, signal aggregation, execution
detection/                     four-layer manipulation detector
data/                          external data clients
models/                        token, alert, and trade models
utils/                         database and logging helpers
frontend/                      React dashboard
data_store/phase10_demo_results.md
```

## Local Setup

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Fill `.env` with your own keys:

- `BITGET_API_KEY`
- `BITGET_SECRET`
- `BITGET_PASSPHRASE`
- `DATABASE_URL`
- `COINGLASS_API_KEY` if available

Keep `TRADING_MODE=paper` for demos.

## Run The Backend

```bash
uvicorn api:app --host 127.0.0.1 --port 8001
```

## Run The Frontend

```bash
cd frontend
npm install
npm run dev
```

Dashboard: `http://127.0.0.1:5173`

## Run The Demo Prep Script

```bash
python run_phase10_demo.py
```

This runs:

- 30-day Bitget backtests for BTC, ETH, SOL, XRP, and DOGE
- live detector scans for the same five tokens
- dashboard database writes
- a markdown report at `data_store/phase10_demo_results.md`

## Verification

These checks passed locally:

```bash
python -m py_compile api.py main.py run_phase10_demo.py core\backtester.py core\data_pipeline.py core\signal_aggregator.py core\execution_engine.py detection\crime_pump_detector.py data\bitget_skills.py utils\database.py
cd frontend && npm run build
```

## Safety

Mantis defaults to paper mode. Live trading requires explicit environment configuration and should not be enabled for the hackathon demo unless intentionally tested.
