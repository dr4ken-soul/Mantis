# Mantis — Whitepaper

**Version 1.0 — June 2026**

---

## Abstract

Mantis is an autonomous trading agent built on Bitget that detects coordinated market manipulation — known in crypto as a crime pump — across four independent data layers and trades the full manipulation lifecycle for systematic alpha. Where conventional trading bots react to price movements after they occur, Mantis identifies the structural conditions that precede those movements: supply concentration, open interest engineering, funding rate distortion and order book manipulation. By classifying a token's position within the crime pump lifecycle, Mantis executes trades that are positioned ahead of the crowd rather than behind it.

---

## 1. The Problem

### 1.1 Coordinated Market Manipulation at Scale

Crypto markets operate with minimal regulatory oversight compared to traditional financial markets. This creates conditions where a small group of coordinated actors — typically market makers or token project insiders — can engineer artificial price movements across hundreds of tokens simultaneously. The pattern is systematic, repeatable and extremely costly to retail participants.

The mechanics follow a predictable sequence. A project team or affiliated market maker quietly accumulates a large portion of the token's supply across multiple wallets. They then use perpetual futures markets to engineer open interest imbalances that attract short sellers looking to profit from an apparently overextended token. Once a sufficient short position has been built up by the market, the market makers push spot prices aggressively upward. Short sellers face liquidation cascades and forced buying. The resulting price spike — manufactured rather than organic — allows the original accumulators to distribute their holdings into the buying pressure at a significant profit.

This pattern is referred to throughout this document as a crime pump. The term reflects the coordinated, predatory nature of the operation. It is distinct from organic pump-and-dump schemes driven by social media hype. Crime pumps are engineered through derivatives market mechanics, not narrative alone.

### 1.2 The Cost to Retail Participants

Retail traders who encounter a crime pump in progress typically interpret the signals incorrectly. A token with extreme negative funding rates appears to be a good shorting opportunity — negative funding means shorts are being paid to hold their position, which feels like confirmation. In reality, extreme negative funding is often a deliberate trap: the market makers are engineering a condition that will force exactly these short positions to be liquidated when they push spot prices higher.

Similarly, a token that appears to show early signs of exhaustion during a crime pump — falling volume, weakening momentum candles, a potential double top — is frequently in the Stage 3 trap phase. The exhaustion is manufactured to attract additional short sellers before the final squeeze.

Without a system that can identify the coordinated structural signals behind these patterns, retail traders are systematically disadvantaged.

### 1.3 Bitget as a Primary Crime Pump Venue

Bitget is one of the three exchanges most commonly used as the spot venue for crime pump operations, alongside Gate.io and Aster. The reason is structural: Bitget has lighter risk controls than Binance or OKX, does not enforce position limits, and has thinner order books on smaller-cap tokens. These characteristics make it easier for market makers to move spot prices on Bitget while using the price action there to influence the mark price calculation on broader derivatives markets.

This makes Bitget simultaneously the exchange where manipulation signals are most visible and the exchange where a detection system built specifically for this pattern would have the highest impact.

---

## 2. What Mantis Is

Mantis is a Python-based autonomous trading agent integrated with the Bitget ecosystem. It monitors a watchlist of tokens continuously, runs each token through a four-layer detection engine every 30 seconds, classifies the token into one of four crime pump lifecycle stages, and executes paper or live trades on Bitget based on the stage classification.

The detection logic is built on original research into crime pump mechanics. Each of the four layers corresponds to a specific mechanism used in coordinated manipulation:

- Layer 1 monitors on-chain supply control: wallet concentration, cold wallet withdrawals and accumulation timing
- Layer 2 monitors perpetual and index manipulation: OI-to-market-cap ratios, volume spikes and price suppression patterns
- Layer 3 monitors funding rate dynamics: rate depth, trend direction and cross-exchange divergence
- Layer 4 monitors order book mechanics: liquidation cascades, spoof orders and abnormal spread behaviour

Mantis aggregates the scores from all four layers, classifies the lifecycle stage, and makes a trading decision. Technical analysis from chart indicators provides confirmation but does not override a high-confidence stage signal.

---

## 3. The Crime Pump Lifecycle

Understanding how crime pumps unfold is the foundation of how Mantis trades. The lifecycle has four stages. Each stage has distinct characteristics visible across the four detection layers.

### Stage 1 — Accumulation

The project team or market maker is building their position quietly. Supply concentration in a small number of wallets begins to rise. On-chain transfer activity is elevated but the price shows minimal movement — this is deliberate. The goal of Stage 1 is to accumulate as much supply as possible before price movement attracts attention.

Visible signals: supply concentration in top wallets exceeds 90%, cold wallet withdrawal spikes from major exchanges (tokens moving off exchange into accumulation wallets), young token contract age (below 30 days increases suspicion), and transfer volume spikes of 5x or more from small wallet clusters.

Mantis action in Stage 1: monitor only. No trade is opened. The agent adds the token to its watchlist and elevates scan frequency.

### Stage 2 — OI and Price Matrix

The market maker begins using perpetual futures to attract short sellers. Open interest rises relative to market cap. The spot price may be suppressed — held flat or dipped slightly — to encourage shorts to believe the token is overvalued or exhausted. Funding rates begin moving negative as the short side grows.

Visible signals: OI-to-market-cap ratio above 50%, volume-to-market-cap spike above 200% in the hours preceding the anticipated pump, order book thinness below 2% depth relative to market cap, and a price suppression pattern followed by a 15%+ move.

Mantis action in Stage 2: consider a long position if technical analysis (EMA crossover, RSI confirmation, MACD alignment) agrees with the expected upward move. The crime pump stage provides the directional bias and the confidence floor. This is a medium-confidence signal.

### Stage 3 — The Trap

Stage 3 is the highest-conviction and most profitable signal. The market maker engineers a false exhaustion pattern: price drops slightly, volume appears to fade, candlestick patterns suggest a top is forming. This is deliberate. The goal is to attract additional short sellers who interpret the apparent exhaustion as confirmation of a reversal.

In reality, the market maker is absorbing these new short positions before executing the final squeeze. When the trap closes, price moves sharply upward and all recent short positions face liquidation simultaneously. The resulting forced buying amplifies the price move further.

Visible signals: extreme negative funding at the -1.5% to -2.0% threshold or deeper, funding rate trend worsening over consecutive 4-hour intervals, cross-exchange funding divergence between Bitget and Binance above 0.5%, OI remaining elevated despite an apparent price pullback, and order book spoofing signals near key support levels.

Mantis action in Stage 3: open a short position against the fake exhaustion or — if the squeeze has just triggered — wait for Stage 4. Stage 3 is the primary alpha signal. Confidence floor is 0.85 when all layer signals are aligned.

### Stage 4 — Distribution

The market maker is selling. The pump is complete or completing. Funding rates begin normalising as the short pressure is eliminated. Price action becomes erratic as accumulated supply is sold into the buying pressure generated by the squeeze.

Visible signals: funding rate returning toward neutral from extreme negative, OI declining from its peak, volume remaining elevated but price failing to make new highs, and on-chain data showing large transfers from accumulation wallets back to exchanges.

Mantis action in Stage 4: close any open positions. Do not open new positions. The opportunity has passed.

---

## 4. Detection Engine

### 4.1 Architecture

The four detection layers operate in parallel. Each layer produces a score between 0 and 1 and a boolean triggered flag. The Layer Orchestrator collects all four results and passes them to the Lifecycle Classifier, which determines the current stage based on the combination of scores.

```
Token Data (funding rates, OI, on-chain, order book)
         │
         ▼
┌────────────────────────────────┐
│      Layer 1: On-Chain         │  Score: 0-1   Signals: supply, wallets, age
│      Layer 2: Perp / Index     │  Score: 0-1   Signals: OI, volume, suppression
│      Layer 3: Funding Rates    │  Score: 0-1   Signals: rate depth, trend, divergence
│      Layer 4: Order Book       │  Score: 0-1   Signals: cascades, spoofs, spreads
└────────────┬───────────────────┘
             │
             ▼
      Lifecycle Classifier
      Stage 1 / 2 / 3 / 4 / None
             │
             ▼
      Signal Aggregator
      (crime pump stage × 0.45 + technicals × 0.30 + volume × 0.15 + structure × 0.10)
             │
             ▼
      Trade Decision + Risk Validation
             │
             ▼
      Bitget Execution (paper or live)
```

### 4.2 Layer 1 — On-Chain Supply Control

On-chain supply control analysis examines wallet concentration, accumulation timing and exchange withdrawal patterns to detect the preparation phase of a crime pump.

**Supply concentration check:** if the top 10 wallets hold more than 90% of circulating supply, the token is flagged. This threshold is high because legitimate projects typically have more distributed supply by the time they reach significant trading volume.

**Cold wallet withdrawal check:** exchanges publishing real-time proof of reserves allow monitoring of withdrawal spikes. A withdrawal above 500,000 USD from a single exchange wallet within a 24-hour window is flagged, particularly for tokens with market caps below 100 million USD.

**Sudden accumulation check:** a spike in inbound transfers to 5 or fewer wallet addresses over a 72-hour window, where those addresses have no prior holding history, is a strong accumulation signal.

**Token age check:** contracts deployed fewer than 30 days before the detection scan receive elevated scrutiny across all signals. Young contracts are disproportionately represented in crime pump operations.

**Transfer spike check:** if aggregate transfer volume from small wallet clusters exceeds 5x the rolling 7-day average, a supply movement signal is raised.

Data sources: Etherscan (EVM chains), BSCScan (BSC), Solscan (Solana), and Bitget's `market-intel` Skill Hub skill for whale activity and ETF flows.

### 4.3 Layer 2 — Perpetual and Index Manipulation

Perp and index manipulation detection monitors the derivatives market conditions that market makers engineer to attract short sellers before a squeeze.

**OI-to-market-cap ratio:** when open interest across major exchanges exceeds 50% of the token's market cap, the derivatives tail is wagging the spot dog. This is unusual for organically traded tokens and indicates leveraged positions disproportionate to the spot market.

**Volume-to-market-cap spike:** a 200%+ volume-to-market-cap ratio in the hours preceding an expected pump indicates abnormal trading activity. For reference, liquid large-cap tokens rarely exceed 30-50% on a typical day.

**Price suppression pattern:** a token that trades in a tight range for 12-48 hours and then moves 15% or more in a short window has shown the flat-then-spike suppression pattern. The flat period allows accumulation and short position building before the manufactured catalyst.

**Order book thinness:** if the combined bid and ask depth within 2% of the mid price is below 2% of market cap, the order book can be moved cheaply. This is a prerequisite for the spot manipulation that drives cross-exchange mark price divergence.

Data sources: Bitget `market-intel` Skill Hub skill (primary), Coinglass (fallback for OI and exchange-specific volume data).

### 4.4 Layer 3 — Funding Rate Dynamics

Funding rate analysis is the highest-signal layer for crime pump detection in the trap stage. Negative funding rates are not inherently manipulative — they occur naturally when the market is bearish on a token. However, the depth, trend and cross-exchange consistency of negative funding can distinguish natural from engineered conditions.

**Current rate level:** a funding rate at or below -1.5% (per 8-hour period) triggers an alert. A rate at or below -2.0% is classified as critical. For context, standard funding rates on most tokens hover within ±0.05% under normal conditions. Rates at -1.5% represent 30x the normal absolute level.

**Rate trend:** if funding has moved deeper negative across consecutive 4-hour settlement periods, the trend suggests active engineering rather than passive market positioning.

**Funding source analysis:** not all negative funding is manufactured. The layer attempts to distinguish three sources: retail short sellers (correlated with bearish social sentiment and high Fear and Greed pessimism), market maker shorting while distributing (correlated with elevated OI and declining price), and deliberate spot pushing to force negative funding (correlated with Bitget-specific volume spike without equivalent Binance volume). The last pattern is the crime pump signal.

**Cross-exchange divergence:** when Bitget's funding rate is significantly more negative than Binance's funding rate for the same token (divergence above 0.5%), this indicates that spot price manipulation is occurring specifically on Bitget, pushing the Bitget-weighted index price and causing Bitget-specific funding distortion. This is a direct signal of Bitget-focused crime pump activity.

Data sources: Bitget `sentiment-analyst` Skill Hub skill (funding rates, long/short ratios, Fear and Greed index), Coinglass (cross-exchange funding rate comparison).

### 4.5 Layer 4 — Order Book Manipulation

Order book analysis detects the mechanical execution of a crime pump: the cascading liquidations and spoofing behaviour that accompany the squeeze phase.

**Liquidation cascade detection:** when liquidation volume spikes above 3x the rolling average while price moves sharply upward, forced buying from short liquidations is amplifying the move. This confirms Stage 3 is executing.

**Spoof order detection:** large orders that appear and disappear without executing near key price levels are spoof signals. Spoofing is used to create false resistance or support levels that encourage retail positioning in a direction that benefits the market maker.

**Volume anomalies:** when buy volume is disproportionate to price movement (i.e. the price is not moving as much as the volume would suggest), there is likely significant sell pressure absorbing the engineered buying. This is a Stage 4 distribution signal.

Data sources: Bitget order book API via the Agent Hub tools (58 trading APIs).

---

## 5. Signal Aggregation and Trade Decision

### 5.1 Framework Weights

Once the lifecycle stage is classified, Mantis generates a trade signal by combining the stage signal with technical confirmation.

```python
FRAMEWORK_WEIGHTS = {
    "crime_pump_stage": 0.45,   # Primary — lifecycle stage drives direction
    "technical_analysis": 0.30, # EMA crossover, RSI, MACD, Bollinger Bands
    "volume_analysis":    0.15, # Volume pattern confirmation
    "market_structure":   0.10, # Support and resistance context
}
```

The crime pump stage is the primary driver in Mantis. Unlike conventional trading bots where technical analysis leads, Mantis uses the stage classification to set the directional bias and the confidence floor. Technical analysis provides confirmation and refinement, not direction.

### 5.2 Stage-Specific Decision Rules

**Stage 3 (Trap):** forces direction to SHORT with a confidence floor of 0.85. The only condition that overrides this is technical analysis showing above 70% signal strength in the opposite direction, which would indicate the trap has already closed and the squeeze is in progress.

**Stage 2 (OI Matrix):** allows technical analysis to set direction but applies a 0.10 confidence boost. The bias is long given the engineering of short positions by the market maker.

**Stage 4 (Distribution):** returns a null signal. No position is opened. Mantis waits for the next cycle.

**Stage 1 or None:** falls through to standard technical analysis logic. RSI, EMA crossover, MACD and Bollinger Band signals drive the decision without crime pump stage influence.

### 5.3 Technical Indicators Used

| Indicator | Parameters | Signal Role |
|---|---|---|
| EMA Crossover | 9 / 21 period | Trend direction confirmation |
| RSI | 14 period | Overbought/oversold detection |
| MACD | 12 / 26 / 9 | Momentum alignment |
| Bollinger Bands | 20 period, 2σ | Volatility and price position |
| Candlestick patterns | 8 patterns | Entry timing refinement |
| Support/Resistance | Automated from price history | Stop loss and take profit placement |

Multi-timeframe analysis uses 15-minute, 1-hour and 4-hour candles. The 4-hour timeframe carries the highest weight (1.2x multiplier) as it is less susceptible to the manufactured volatility seen in shorter timeframes during active crime pump operations.

---

## 6. Risk Management

### 6.1 Position Sizing

Position size is calculated as a percentage of total portfolio value, adjusted by signal confidence and current market volatility. A 75% confidence signal on a low-volatility token might result in a 5% portfolio allocation. The same signal on a high-volatility token would be sized to 2-3% to keep risk equivalent in dollar terms.

### 6.2 Dynamic Stop Loss

Stop losses are set based on the nearest support or resistance level identified by the chart analysis engine, then tightened or widened based on current volatility. In high-volatility conditions, a wider stop prevents premature ejection. In low-volatility conditions, a tighter stop protects capital more efficiently.

Stage 3 short positions use a stop above the most recent local high that preceded the fake exhaustion candle. This is the structural point at which the Stage 3 signal is invalidated.

### 6.3 Daily Loss Circuit Breaker

If total daily losses reach 10% of portfolio value, all new trade opening is suspended until the following UTC day. Open positions continue to be monitored and their stop losses remain active. This prevents a cascading loss scenario where a series of false signals compounds into significant capital drawdown.

### 6.4 Correlation Filter

A maximum of three open positions on tokens from the same blockchain at any time. This limits correlated exposure: if a negative macro event affects all Solana tokens simultaneously, Mantis is not fully exposed through multiple correlated positions.

### 6.5 Minimum Confidence Threshold

No trade is executed below 40% signal confidence. For Stage 3 signals, the floor is raised to 85% requiring high alignment across multiple detection layer signals before opening.

---

## 7. Bitget Integration

### 7.1 Bitget Skill Hub

Mantis uses three of the five Bitget Skill Hub analyst-grade perception modules as the primary data source for its detection layers.

**sentiment-analyst:** provides funding rates across exchanges, long/short ratios, and the Fear and Greed index. This feeds directly into Layer 3 (funding rate dynamics). The skill provides the current rate, recent trend and market-wide positioning data that allows Mantis to distinguish retail-driven from market-maker-driven funding conditions.

**market-intel:** provides whale activity scores, ETF flow data and open interest aggregated across exchanges. This feeds Layer 2 (perp and index manipulation). The whale activity score in particular is a strong complement to Mantis's own on-chain analysis in Layer 1.

**news-briefing:** provides recent news aggregation and narrative synthesis for the token being scanned. This is used as a context layer — a token with a strong positive news narrative and simultaneously extreme negative funding is more likely to be in a crime pump setup than one where the negative sentiment is reflected in both the funding and the news.

### 7.2 Bitget Agent Hub

Execution uses the Bitget Agent Hub's 58 trading API tools through CCXT. The execution engine places market orders with automatic leverage setting, conditional stop loss and take profit orders, and position tracking after execution. Paper trading mode is the default. Live trading requires a two-step confirmation — Execute then Confirm — to prevent accidental real-money trades.

### 7.3 Why Bitget Specifically

Bitget is not incidentally the platform Mantis trades on. It is the correct platform for this strategy. The cross-exchange funding divergence signal in Layer 3 specifically monitors the gap between Bitget and Binance funding rates because Bitget's index weighting and risk control structure make it the most common spot manipulation venue. Mantis is built where the manipulation happens. The detection is sharpest where the signals are clearest.

---

## 8. Backtesting Methodology

Mantis includes a dual-mode backtesting engine adapted from the Quil project. The backtester replays historical OHLCV data from Bitget through the signal generation pipeline, simulating trades day by day and tracking position outcomes.

### 8.1 Metrics Produced

| Metric | Definition |
|---|---|
| Win Rate | Percentage of trades that closed in profit |
| Total PnL % | Cumulative percentage return over the backtest period |
| Sharpe Ratio | Risk-adjusted return: average return divided by return standard deviation |
| Maximum Drawdown | Largest peak-to-trough decline during the period |
| Profit Factor | Gross profit divided by gross loss |
| Average Trade Duration | Mean time in hours from entry to exit |
| Buy and Hold Comparison | What a passive hold of the same token would have returned |

### 8.2 Limitations

Historical backtesting of crime pump detection has an inherent limitation: the detection layers rely partially on on-chain and derivatives data that may not be available at historical resolution for all tokens. Where Bitget historical OHLCV is available (used as the primary source), the technical analysis components of the backtest are fully accurate. The crime pump detection layers are simulated using available historical funding rate and OI data from Coinglass where accessible.

Results are validated against known historical crime pump events to confirm the detection logic would have triggered during those events and not triggered during normal market conditions for the same tokens.

---

## 9. Architecture Summary

```
┌────────────────────────────────────────────────────────────────┐
│                    PERCEPTION LAYER                             │
│  Bitget Skill Hub: sentiment-analyst, market-intel,            │
│  news-briefing (primary)                                        │
│  Coinglass: OI + funding cross-exchange (secondary)            │
│  Blockchain explorers: Etherscan, BSCScan, Solscan (Layer 1)   │
│  DexScreener: DEX price fallback                               │
└─────────────────────┬──────────────────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────────────────┐
│                 DETECTION ENGINE                                 │
│  Layer 1: On-Chain Supply Control          (post-MVP)           │
│  Layer 2: Perp / Index Manipulation        (MVP)                │
│  Layer 3: Funding Rate Dynamics            (MVP)                │
│  Layer 4: Order Book Manipulation          (post-MVP)           │
└─────────────────────┬──────────────────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────────────────┐
│              LIFECYCLE CLASSIFIER                               │
│  Stage 1: Accumulation    Stage 3: Trap                        │
│  Stage 2: OI Matrix       Stage 4: Distribution                │
└─────────────────────┬──────────────────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────────────────┐
│            SIGNAL AGGREGATOR + RISK MANAGER                     │
│  Crime pump stage weight: 0.45                                  │
│  Technical analysis weight: 0.30                                │
│  Volume analysis weight: 0.15                                   │
│  Market structure weight: 0.10                                  │
│                                                                 │
│  Risk: position sizing, dynamic SL, circuit breaker             │
└─────────────────────┬──────────────────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────────────────┐
│              EXECUTION ENGINE                                   │
│  Bitget via CCXT — paper mode default                          │
│  58 Agent Hub tools available                                   │
│  Two-step confirmation for live mode                            │
└─────────────────────┬──────────────────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────────────────┐
│              REACT DASHBOARD                                    │
│  Live lifecycle stage per token                                 │
│  Detection layer scores visualised                              │
│  Active positions with real-time PnL                            │
│  Backtest results table                                         │
└────────────────────────────────────────────────────────────────┘
```

---

## 10. Technical Stack

| Component | Technology | Reason |
|---|---|---|
| Agent runtime | Python 3.11+ | Quil codebase is Python. Async throughout with asyncio |
| REST API | FastAPI + Uvicorn | Lightweight, async, serves React dashboard |
| Exchange client | CCXT | Bitget already configured. Supports paper and live mode |
| Skill Hub client | httpx | Async HTTP for Bitget Skill Hub REST API calls |
| Database | Supabase PostgreSQL | Persistent storage for positions, signals, backtest results |
| ORM | SQLAlchemy + asyncpg | Async database access |
| Technical indicators | ta (Python) | RSI, MACD, Bollinger Bands, EMA |
| Frontend | React 18 + Vite + TypeScript | Fast, minimal, well-documented |
| Charts | recharts | Detection layer score bars and PnL history |
| Styling | Tailwind CSS | Utility-first, rapid iteration |
| Deployment | Railway (backend) + Vercel (frontend) | Railway for always-on Python agent loop |

---

## 11. Hackathon Context

Mantis is submitted to the Bitget AI Base Camp Hackathon S1 under Track 1 — Trading Agent. It addresses every element of the judging criteria: it solves a real and costly problem, the demo is runnable with verifiable paper trading and backtest records, and it uses Bitget AI modules (Skill Hub: sentiment-analyst and market-intel) as the primary perception layer.

The complete strategy loop:

Perception: Mantis reads funding rates and OI data from the Bitget Skill Hub sentiment-analyst and market-intel skills every 30 seconds. Decision: the four-layer detection engine and lifecycle classifier determine the manipulation stage for each monitored token. Execution: when Stage 2 or Stage 3 is confirmed with sufficient technical alignment, Mantis opens a position on Bitget in paper mode through the Agent Hub execution layer. Risk management: the dynamic risk manager controls position sizing using portfolio-percentage allocation adjusted for volatility, tightens stop losses in high-volatility conditions, and suspends all new position opening when daily losses reach 10% of portfolio value.

---

## Appendix — Glossary

**Crime pump:** a coordinated market manipulation operation where a token's price is artificially inflated through a combination of spot accumulation, perp market engineering and funded short trapping, followed by distribution at the manipulated high.

**Funding rate:** a periodic payment between long and short position holders in perpetual futures markets. Negative funding means longs pay shorts. Extreme negative funding (below -1.5% per 8 hours) indicates disproportionate short positioning.

**Open interest (OI):** the total value of outstanding derivatives contracts for a token. Rising OI with flat or suppressed price indicates accumulation of short positions by the market, which is the precondition for a crime pump squeeze.

**Lifecycle stage:** Mantis's classification of where a token is within the crime pump cycle. Stages 1 through 4 correspond to accumulation, OI matrix, trap and distribution respectively.

**Skill Hub:** Bitget's library of analyst-grade market intelligence modules. Mantis uses sentiment-analyst, market-intel and news-briefing as its primary data perception layer.

**Circuit breaker:** an automatic risk control that halts all new position opening when cumulative daily losses reach a defined threshold. Mantis sets this at 10% of portfolio value.
