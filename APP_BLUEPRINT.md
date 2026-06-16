# Mantis — App Blueprint

## One-Line Pitch

Mantis is a Bitget trading agent that detects coordinated market manipulation across four data layers and trades the full crime pump lifecycle before retail traders see it coming.

---

## The Problem

Crypto markets lose billions annually to coordinated manipulation known as crime pumps. A small group of market makers accumulates a token, engineers artificial price movements through perp markets, traps short sellers with fake exhaustion signals, then distributes at the top while retail holds the loss. Existing trading bots are designed for trend-following or mean-reversion. None detect the coordinated manipulation pattern itself.

Bitget is one of the three exchanges most commonly used as the spot venue for crime pump operations (alongside Gate and Aster) due to its lighter risk controls and thinner order books. This makes Bitget the most important place to have this detection running.

---

## The Solution

Mantis monitors tokens across four independent data layers simultaneously. Each layer scores a token for manipulation signals. The lifecycle classifier aggregates those scores and assigns each token to one of four stages: accumulation, OI matrix, trap or distribution. Mantis then makes a trading decision based on the stage, executes on Bitget via CCXT, and manages risk dynamically throughout the position lifecycle.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  PERCEPTION LAYER                        │
│  Bitget Skill Hub (sentiment-analyst + market-intel)    │
│  Coinglass (OI + funding fallback)                      │
│  DexScreener (DEX price fallback)                       │
└─────────────────┬───────────────────────────────────────┘
                  │ feeds Token model
┌─────────────────▼───────────────────────────────────────┐
│                  DETECTION ENGINE (4 Layers)             │
│  Layer 1: On-Chain Supply Control                       │
│  Layer 2: Perp / Index Manipulation (MVP)               │
│  Layer 3: Funding Rate Dynamics     (MVP)               │
│  Layer 4: Order Book Manipulation                       │
└─────────────────┬───────────────────────────────────────┘
                  │ scored results
┌─────────────────▼───────────────────────────────────────┐
│              LIFECYCLE CLASSIFIER                        │
│  Stage 1: Accumulation   → Watch only                   │
│  Stage 2: OI Matrix      → Consider long                │
│  Stage 3: Trap           → Fade / short setup           │
│  Stage 4: Distribution   → Exit all                     │
└─────────────────┬───────────────────────────────────────┘
                  │ trade signal + stage
┌─────────────────▼───────────────────────────────────────┐
│           SIGNAL AGGREGATOR + RISK MANAGER               │
│  Technical analysis confirmation (40% weight)           │
│  Crime pump stage overlay (primary driver)              │
│  Position sizing, SL adjustment, circuit breaker        │
└─────────────────┬───────────────────────────────────────┘
                  │ approved trade signal
┌─────────────────▼───────────────────────────────────────┐
│              EXECUTION ENGINE                            │
│  Bitget via CCXT (paper mode default)                   │
│  Market orders + conditional SL/TP                      │
│  Two-step confirmation for live mode                    │
└─────────────────┬───────────────────────────────────────┘
                  │ position data
┌─────────────────▼───────────────────────────────────────┐
│               REACT DASHBOARD                            │
│  Live lifecycle stage per token                         │
│  Active positions + PnL                                 │
│  Backtest results table                                 │
└─────────────────────────────────────────────────────────┘
```

---

## Detection Layers

### Layer 2 — Perp / Index Manipulation (MVP priority)

Signals monitored:
- OI-to-market-cap ratio above 50% (suspicious accumulation via perp)
- Volume-to-market-cap spike above 200% in hours before expected pump
- Price suppression followed by a 15%+ move (flat then spike pattern)
- Order book thinness below 2% depth relative to market cap

Threshold in `config/settings.py`:
```python
OI_TO_MCAP_HIGH_RATIO = 0.5
VOLUME_TO_MCAP_SPIKE_RATIO = 2.0
ORDER_BOOK_THIN_THRESHOLD = 0.02
PRICE_SUPPRESSION_THEN_SPIKE_PCT = 15.0
```

Data source: `market-intel` Skill Hub skill + Coinglass fallback

### Layer 3 — Funding Rate Dynamics (MVP priority)

Signals monitored:
- Current funding rate at or below -1.5% (alert threshold)
- Current funding rate at or below -2.0% (critical threshold)
- Funding rate trend — is it worsening over 4h intervals
- Source analysis — is negative funding from market maker shorting or retail
- Cross-exchange funding divergence between Bitget and Binance

Thresholds in `config/settings.py`:
```python
FUNDING_RATE_ALERT_THRESHOLD = -0.015
FUNDING_RATE_CRITICAL_THRESHOLD = -0.02
FUNDING_CHECK_INTERVAL_HOURS = 4
```

Data source: `sentiment-analyst` Skill Hub skill (funding rates + long/short ratios)

### Layer 1 — On-Chain Supply Control (post-MVP)

Signals: supply concentration above 90%, cold wallet withdrawal spikes, sudden accumulation by small wallet clusters, token age under 30 days, unlocked liquidity.

Data source: `market-intel` Skill Hub + blockchain explorers (Etherscan, BSCScan, Solscan)

### Layer 4 — Order Book Manipulation (post-MVP)

Signals: liquidation cascades, spoof orders (large walls that disappear), volume anomalies, abnormal bid/ask spreads at key price levels.

Data source: Bitget order book API via Agent Hub tools

---

## Lifecycle Trading Logic

| Stage | What It Means | Mantis Action |
|---|---|---|
| Stage 1: Accumulation | Market makers quietly accumulating. OI rising slowly. Price flat | Watch only. No trade |
| Stage 2: OI Matrix | OI rising fast. Volume spike. Price beginning to move | Long if technical analysis confirms direction |
| Stage 3: Trap | Fake exhaustion signal. Candles suggest reversal but it is manufactured | Short the fake reversal or fade the trap. Highest confidence trade |
| Stage 4: Distribution | Market makers selling. Funding normalising. Price collapsing | Exit all positions. Stand aside |

---

## Signal Aggregation Weights

```python
FRAMEWORK_WEIGHTS = {
    "crime_pump_stage": 0.45,    # Primary — lifecycle stage drives direction
    "technical_analysis": 0.30,  # Confirmation — EMA, RSI, MACD, BB
    "volume_analysis":    0.15,  # Confirmation — volume pattern alignment
    "market_structure":   0.10,  # Context — support/resistance
}
```

Crime pump stage is the primary driver in Mantis. Technical analysis confirms but does not override a clear Stage 3 signal.

---

## Risk Management

All from Quil's `core/risk_manager.py`, unchanged:

- Daily loss circuit breaker at 10% max daily loss — stops all trading
- Correlation filter — max 3 positions on the same chain simultaneously
- Volatility-based stop loss tightening — wider in low vol, tighter in high vol
- Confidence threshold — minimum 40% signal confidence to open a position
- Liquidity-aware position sizing — no oversizing into thin markets
- Paper mode default — two-step confirmation required for live mode

---

## Bitget Skill Hub Integration

Mantis uses three of the five available Bitget Skill Hub skills.

```
data/bitget_skills.py
```

```python
class BitgetSkillsClient:
    BASE_URL = "https://agenthub.bitget.com/skills"

    async def get_sentiment(self, symbol: str) -> dict:
        """sentiment-analyst: funding rates, Fear and Greed, long/short ratio"""

    async def get_market_intel(self, symbol: str) -> dict:
        """market-intel: whale activity, ETF flows, OI data"""

    async def get_news(self, symbol: str) -> dict:
        """news-briefing: recent news and narrative context"""
```

The `DataPipeline.build_token_profile()` method calls these three skills first before falling back to Coinglass and blockchain explorers. Bitget Skill Hub data populates the `DerivativesMetrics` and `OnChainMetrics` fields on the Token model.

---

## Tech Stack

### Backend (Python)

| Package | Purpose |
|---|---|
| `fastapi` + `uvicorn` | REST API for the React dashboard |
| `ccxt` | Bitget exchange connection |
| `httpx` | Async HTTP for Skill Hub calls |
| `sqlalchemy` + `asyncpg` | Supabase PostgreSQL ORM |
| `structlog` | Structured logging |
| `python-dotenv` | Environment variable loading |
| `pandas` + `numpy` | Backtester calculations |
| `ta` | Technical indicators (RSI, MACD, BB, EMA) |
| `python-telegram-bot` | Telegram interface (post-MVP) |

### Frontend (TypeScript / React)

| Package | Purpose |
|---|---|
| `react` 18 + `vite` | UI framework and bundler |
| `@tanstack/react-query` | API data fetching and caching |
| `recharts` | PnL charts and detection layer scores |
| `tailwindcss` | Styling |
| `lucide-react` | Icons |

### Infrastructure

| Service | Purpose |
|---|---|
| Railway | Python backend + agent loop (always-on) |
| Vercel | React dashboard (static + CDN) |
| Supabase | PostgreSQL database |
| Bitget Agent Hub | MCP server for Claude Code development |

---

## API Endpoints (FastAPI)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/tokens` | All tokens being monitored with current lifecycle stage |
| `GET` | `/api/tokens/{symbol}` | Full detection layer scores for one token |
| `GET` | `/api/positions` | All active paper positions with live PnL |
| `GET` | `/api/backtest/{symbol}` | Backtest results for a token |
| `POST` | `/api/scan/{symbol}` | Trigger an immediate detection scan |
| `GET` | `/api/stats` | Portfolio stats: win rate, total PnL, Sharpe ratio |

All endpoints return JSON. No auth required for the hackathon demo.

---

## Database Schema

```sql
-- Tokens being monitored
CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(20) NOT NULL UNIQUE,
    current_stage INTEGER DEFAULT 0,
    stage_confidence FLOAT DEFAULT 0.0,
    last_scanned_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Detection layer results per scan
CREATE TABLE detection_results (
    id SERIAL PRIMARY KEY,
    token_symbol VARCHAR(20) NOT NULL,
    layer_number INTEGER NOT NULL,
    layer_name VARCHAR(100),
    score FLOAT,
    triggered BOOLEAN DEFAULT FALSE,
    signals JSONB,
    scanned_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trade signals generated
CREATE TABLE trade_signals (
    id SERIAL PRIMARY KEY,
    token_symbol VARCHAR(20) NOT NULL,
    direction VARCHAR(10),
    entry_price FLOAT,
    stop_loss FLOAT,
    take_profit_1 FLOAT,
    take_profit_2 FLOAT,
    leverage INTEGER,
    confidence FLOAT,
    crime_stage INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Paper positions tracked
CREATE TABLE positions (
    id SERIAL PRIMARY KEY,
    token_symbol VARCHAR(20) NOT NULL,
    direction VARCHAR(10),
    entry_price FLOAT,
    current_price FLOAT,
    stop_loss FLOAT,
    take_profit FLOAT,
    leverage INTEGER,
    size_usd FLOAT,
    unrealised_pnl FLOAT DEFAULT 0.0,
    status VARCHAR(20) DEFAULT 'open',
    opened_at TIMESTAMPTZ DEFAULT NOW(),
    closed_at TIMESTAMPTZ
);

-- Backtest results
CREATE TABLE backtest_results (
    id SERIAL PRIMARY KEY,
    token_symbol VARCHAR(20) NOT NULL,
    period_days INTEGER,
    total_trades INTEGER,
    win_rate FLOAT,
    total_pnl_pct FLOAT,
    sharpe_ratio FLOAT,
    max_drawdown_pct FLOAT,
    profit_factor FLOAT,
    ran_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## MVP Scope (18-day build)

### In MVP
- Bitget Skill Hub client (`data/bitget_skills.py`) with three skills
- Layer 2 and Layer 3 detection using Skill Hub data
- Lifecycle classifier outputting Stage 1 to Stage 4
- Signal aggregator with crime_pump_stage as primary weight
- Bitget paper execution via CCXT
- Risk manager (from Quil, unchanged)
- Backtester (from Quil, adapted to use Bitget historical data)
- FastAPI layer serving token stages and positions
- React dashboard: token list with lifecycle badges, active positions, backtest table

### Not In MVP
- Layer 1 (on-chain supply) and Layer 4 (order book)
- Telegram bot interface
- Live trade execution
- Social monitoring

---

## Hackathon Submission Requirements

**Track 1 — Trading Agent**

Submission needs:
- Demo link (publicly accessible, must actually run)
- Backtest or sim trading records
- Project description under 200 words covering: what problem it solves, strategy loop (perception → decision → execution → risk management), which Bitget AI modules used
- Optional 3-minute demo video

**Strategy loop to describe in submission:**

Perception: Mantis reads funding rates and OI data from Bitget Skill Hub (sentiment-analyst and market-intel skills). Decision: the 4-layer detection engine and lifecycle classifier determine the manipulation stage (1-4). Execution: when Stage 2 or Stage 3 is confirmed with technical analysis alignment, Mantis executes on Bitget in paper mode. Risk management: the dynamic risk manager controls position sizing, adjusts stop losses based on volatility, and triggers a circuit breaker at 10% daily loss.

---

## Build Sequence

### Week 1 (June 7-13): Core detection + data bridge
- Adapt `data/bitget_skills.py` with Skill Hub client
- Wire Skill Hub data into the Token model via `data_pipeline.py`
- Test Layer 2 and Layer 3 detection with live Bitget data
- Verify lifecycle classifier output

### Week 2 (June 14-20): Execution + backtester + API
- Adapt execution engine to Bitget primary
- Run backtester against Bitget historical OHLCV data
- Build FastAPI layer (`api.py`)
- Start React dashboard shell

### Week 3 (June 21-25): Dashboard + polish + submission
- Complete React dashboard (token lifecycle view + positions + backtest)
- Deploy Python to Railway and React to Vercel
- Record 3-minute demo video
- Write 200-word project description
- Submit by 25 June 24:00 UTC+8
