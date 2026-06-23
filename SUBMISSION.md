# Mantis Submission Guide

Deadline: June 25, 2026 24:00 UTC+8.

Current local time on June 23 means there is time, but this should now be treated as packaging work, not new feature work.

## Official Requirement Check

Mantis fits Track 1: Trading Agent.

Required for this track:

- public GitHub repo or public Agent/demo link
- clear project description/thesis
- live trading record or paper trading log
- Bitget UID matching the registration UID
- all links publicly accessible without login

Recommended:

- demo video, max 3 minutes
- backtest report with runnable code
- qualifying X post for participation/community impact

Mantis currently has:

- public repo: `https://github.com/dr4ken-soul/Mantis`
- complete README
- runnable code
- Phase 10 runner: `run_phase10_demo.py`
- backtest/report output: `data_store/phase10_demo_results.md`
- dashboard frontend
- FastAPI backend

Still needed before final submit:

- restore `.env` locally
- rerun `python run_phase10_demo.py`
- create/update a paper trading log or use the Phase 10 report as the demo run record
- record a demo video
- get public links for the video and X posts

## Page 1 Form Answers

Team Name:

```text
Mantis
```

Team Lead Bitget UID:

```text
paste the UID from the Bitget account you registered with
```

Important: this must match the UID used during registration.

Team Lead Contact:

```text
web3psycho000@gmail.com / @your_telegram_username
```

Replace `@your_telegram_username` with your actual Telegram username.

Team Members:

```text
leave blank
```

Use this if you are submitting solo. If someone else is officially on the team, add their name/email/Telegram.

Team Background:

Choose:

```text
Web3 & AI developer
```

If you want, also choose:

```text
Crypto KOL / KOC
```

Only choose the KOL option if you are comfortable presenting yourself that way. The safest choice is just `Web3 & AI developer`.

How did you hear about this hackathon?

Choose the true one. Based on what you have shown, likely:

```text
Bitget / Bitget AI official Twitter
```

If you actually joined through Telegram, choose:

```text
Bitget official Telegram community
```

## Track

Choose:

```text
Trading Agent
```

Reason: Mantis perceives market conditions, decides whether a setup is manipulation/trap-like, produces trade signals, and uses paper/backtest records. Do not choose Trading Infra unless you want to position it mainly as a dashboard/data product.

## Project Description

Use this if the form asks for a short description:

```text
Mantis is a Bitget-native trading agent that detects coordinated market manipulation across on-chain, perp, funding, and orderbook layers before producing cleaner trade signals.
```

Use this if the form asks for a longer description:

```text
Mantis is a Bitget-native trading agent built around one thesis: manipulated crypto moves leave traces across multiple data layers before retail fully reacts.

Instead of following trends or mean-reverting, Mantis checks on-chain movement, open interest pressure, funding behaviour, exchange divergence, sentiment, and orderbook/liquidity signals together. It classifies each token into a lifecycle stage and only produces a paper trade signal when the setup is clean enough.

The demo includes a FastAPI backend, React dashboard, Bitget market backtests, live scan output, and a Phase 10 report that can be reproduced from the repo.
```

## Public Links To Prepare

GitHub:

```text
https://github.com/dr4ken-soul/Mantis
```

Phase 10 report:

```text
https://github.com/dr4ken-soul/Mantis/blob/main/data_store/phase10_demo_results.md
```

Demo video:

```text
paste the public X/YouTube/Drive link after recording
```

X dev post:

```text
paste your existing Mantis post URL
```

Community/participation post:

```text
paste the quote-post URL after you quote the official Bitget interaction post
```

Frontend deployment:

```text
optional; paste link if deployed
```

If there is no deployed frontend, submit the demo video and repo. The rules allow demo video, and the repo is runnable.

## Demo Video Plan

Maximum: 3 minutes.

Best place to record:

- Use OBS Studio if installed
- If not, use Xbox Game Bar: `Win + G`, record screen
- Record your browser plus terminal
- Upload to X, YouTube unlisted/public, or Google Drive with public view access

Recommended: upload to X as the final submission/demo tweet, because the rules specifically say a public Twitter/X demo is accepted and it helps community visibility.

## Demo Video Script

Keep it natural. Do not over-explain.

0:00-0:15 - intro

```text
this is mantis, my bitget ai hackathon trading agent

it is not a trend bot or a mean reversion bot

it watches for coordinated market manipulation across four data layers
```

0:15-0:45 - show dashboard

Show `http://127.0.0.1:5173`.

Say:

```text
the dashboard shows monitored tokens, lifecycle stage, confidence, paper stats and open positions

the idea is to see the market state first, not just a raw buy or sell signal
```

0:45-1:20 - show token/detail or scan output

Open a token page if dashboard data is populated. If not, show terminal/report.

Say:

```text
each scan checks on-chain, perp pressure, funding, and orderbook behaviour

mantis only becomes interesting when multiple layers start agreeing
```

1:20-2:00 - show Phase 10 report

Open:

```text
data_store/phase10_demo_results.md
```

Say:

```text
phase 10 runs a 30 day bitget-market backtest and live scans five tokens

the current run is conservative, which is intentional

when the trap is not there, the agent should stay out
```

2:00-2:35 - show repo/code proof

Show:

- `run_phase10_demo.py`
- `data/bitget_skills.py`
- `detection/`
- `api.py`
- `frontend/`

Say:

```text
bitget is the primary market source

skill hub is wired as the perception layer for sentiment, market intel and news

the repo includes the runner, backend, dashboard and report so judges can reproduce it
```

2:35-3:00 - close

```text
the whole point of mantis is simple

crypto traps usually look obvious after they happen

mantis is trying to see the setup before the crowd reacts
```

## What To Run Before Recording

In project root:

```bash
copy .env.example .env
```

Fill `.env` with your Bitget, Supabase and optional Coinglass keys.

Then:

```bash
python run_phase10_demo.py
uvicorn api:app --host 127.0.0.1 --port 8001
```

In another terminal:

```bash
cd frontend
npm run dev
```

Open:

```text
http://127.0.0.1:5173
```

## If Something Breaks During Recording

Do not panic.

If live API keys or Supabase fail, record:

- dashboard
- repo
- `data_store/phase10_demo_results.md`
- terminal showing the runner command

Then say:

```text
the demo is running in paper mode, with Bitget market data and a reproducible phase 10 report committed in the repo
```

This still satisfies the runnable/project evidence side better than a pure pitch.

## Final Submit Checklist

- [ ] UID copied from the registered Bitget account
- [ ] GitHub repo public
- [ ] README visible on GitHub
- [ ] `.env` not pushed
- [ ] Phase 10 report exists in repo
- [ ] demo video recorded, max 3 minutes
- [ ] demo video link public
- [ ] existing Mantis dev post link saved
- [ ] quote-post of official Bitget interaction post made with `#BitgetHackathon` and `@Bitget_AI`
- [ ] quote-post link saved
- [ ] form submitted before June 25, 2026 24:00 UTC+8
