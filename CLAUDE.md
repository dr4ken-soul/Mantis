# Mantis — Claude Code Context

## What This Is

Mantis is a Bitget trading agent that detects coordinated market manipulation across four data layers and trades the full crime pump lifecycle for alpha. It is a hackathon submission for the Bitget AI Base Camp Hackathon S1 (Track 1 — Trading Agent) with a submission deadline of 25 June 2026.

The core detection logic is adapted from Quil, an existing Python trading bot. The data perception layer is replaced with Bitget Skill Hub APIs. Execution runs on Bitget via CCXT in paper mode by default.

---

## Stack

| Layer | Technology |
|---|---|
| Backend agent | Python 3.11+ (adapted from Quil) |
| REST API layer | FastAPI + Uvicorn |
| Frontend dashboard | React 18 + Vite + TypeScript |
| Database | Supabase PostgreSQL |
| Exchange execution | Bitget via CCXT |
| Perception | Bitget Skill Hub (sentiment-analyst, market-intel, news-briefing) |
| Deployment | Railway (backend) + Vercel (frontend) |

---

## Project Structure

```
mantis/
├── config/
│   ├── __init__.py
│   ├── settings.py           # All env vars and thresholds
│   └── exchanges.py          # Bitget-primary exchange config
├── core/
│   ├── __init__.py
│   ├── backtester.py         # From Quil — backtest engine
│   ├── chart_analysis.py     # From Quil — candlestick + indicator engine
│   ├── data_pipeline.py      # Adapted — adds Bitget Skill Hub as primary source
│   ├── execution_engine.py   # Adapted — Bitget primary, paper mode default
│   ├── position_monitor.py   # From Quil — live PnL tracking
│   ├── risk_manager.py       # From Quil — circuit breaker + correlation filter
│   └── signal_aggregator.py  # Adapted — plugs crime pump stage into decision
├── data/
│   ├── __init__.py
│   ├── bitget_skills.py      # NEW — Bitget Skill Hub client (all 5 skills)
│   ├── coinglass.py          # From Quil — fallback for OI + funding data
│   ├── dexscreener.py        # From Quil — DEX price fallback
│   └── blockchain_explorers.py  # From Quil — on-chain data
├── detection/
│   ├── __init__.py
│   ├── layer1_onchain.py     # Supply concentration + cold wallet signals
│   ├── layer2_perp.py        # OI manipulation + price suppression
│   ├── layer3_funding.py     # Funding rate dynamics (MVP core layer)
│   ├── layer4_orderbook.py   # Spoof orders + liquidation cascades
│   ├── crime_pump_detector.py  # Orchestrates all 4 layers
│   └── lifecycle.py          # Stage classifier (accumulation → trap → distribution)
├── models/
│   ├── __init__.py
│   ├── alert.py
│   ├── token.py
│   └── trade.py
├── patterns/
│   └── crime_coin_patterns.json
├── frameworks/
│   └── trap_bot/
├── utils/
│   ├── __init__.py
│   ├── database.py
│   └── logger.py
├── frontend/                 # React dashboard
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── api.py                    # FastAPI — bridges Python agent to React frontend
├── main.py                   # Entry point
├── run_backtest.py
├── requirements.txt
├── Procfile
└── .env.example
```

---

## What Is In the MVP

1. Detection using Bitget Skill Hub (sentiment-analyst + market-intel) feeding Layers 2 and 3
2. Lifecycle classification — Stage 1 to Stage 4 for each tracked token
3. Trade execution on Bitget in paper mode when Stage 2 or Stage 3 is confirmed
4. Risk manager controlling position size, stop loss, and the daily circuit breaker
5. Backtester producing win rate, Sharpe ratio, and profit factor against historical data
6. React dashboard showing live lifecycle stages and active positions

## Build Progress

- Phases 1-9 are complete as of 2026-06-11.
- Bitget Skill Hub now feeds token sentiment, market intel, and news context before Coinglass fallbacks.
- Layers 2 and 3 now prefer Bitget Skill Hub-derived token model fields.
- The crime pump stage is now part of signal aggregation, with Stage 4 blocking trades.
- Supabase PostgreSQL is connected and initialized for the new Mantis project.
- Current execution mode remains paper by default, Bitget is the only execution exchange, and backtests fetch Bitget OHLCV before CoinGecko fallback.
- FastAPI is available in `api.py` for the React dashboard on port 8001.
- React dashboard is implemented in `frontend/` and runs with Vite on port 5173.
- Next phase: demo preparation.

## What Is Post-MVP (do not build until core works)

- Layer 1 (on-chain supply) and Layer 4 (order book) detection
- Live trade execution (paper mode is sufficient for the hackathon)
- Telegram bot interface
- Social monitoring

---

## Key Integration: Bitget Skill Hub

Mantis uses three Bitget Skill Hub skills as the primary perception layer.

| Skill | What Mantis Uses It For |
|---|---|
| `sentiment-analyst` | Funding rates, long/short ratios, Fear and Greed index (feeds Layer 3) |
| `market-intel` | Whale activity, ETF flows, OI data (feeds Layer 2) |
| `news-briefing` | News context for manipulation narrative confirmation |

The Bitget Skill Hub client lives in `data/bitget_skills.py`. It calls the Bitget Agent Hub REST endpoints and returns structured data that feeds the existing Token model in `models/token.py`.

---

## Bitget Agent Hub MCP (for Claude Code use during development)

Install once in Claude Code:

```bash
npx bitget-hub upgrade-all --target claude
```

Then add the MCP server:

```bash
claude mcp add -s user \
  --env BITGET_API_KEY=your-api-key \
  --env BITGET_SECRET_KEY=your-secret-key \
  --env BITGET_PASSPHRASE=your-passphrase \
  bitget \
  -- npx -y bitget-mcp-server
```

Use this during development to query Bitget tools directly from the Claude Code terminal.

---

## Environment Variables

See `.env.example` for the full list. Critical ones:

```
BITGET_API_KEY=
BITGET_SECRET_KEY=
BITGET_PASSPHRASE=
TRADING_MODE=paper
DATABASE_URL=
TELEGRAM_BOT_TOKEN=
COINGLASS_API_KEY=
```

---

## Code Rules (Claude Code must follow these)

- Python: snake_case for all variables and functions
- Python: async/await throughout — no sync blocking calls in the agent loop
- Python: structlog for all logging via `utils/logger.py` — never use `print()`
- Python: full docstrings on every class and public method
- TypeScript: camelCase for all variables and functions
- TypeScript: JSDoc comments on every function
- No hardcoded API keys or secrets anywhere — always read from environment
- All detection layer thresholds live in `config/settings.py` — never inline them
- Paper mode must be the default — never default to live trading

---

## Hackathon Submission Checklist

- [ ] Register on bitget.com/activity-hub/hackathon before 14 June
- [ ] Join Bitget Telegram community and claim Qwen credits
- [ ] Claim MuleRun credits with code `0526BITGET` at credits.mule.page
- [ ] Repost Bitget official interaction post tagged `#BitgetHackathon`
- [ ] Publish project intro post tagged `#BitgetHackathon` @BitgetAI
- [ ] Submit demo link + project description (under 200 words) by 25 June
- [ ] Include post links in submission for Community Impact Award (500 USDT)
- [ ] Record 3-minute demo video (optional but recommended)
