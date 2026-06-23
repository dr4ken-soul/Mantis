# Mantis Submission Notes

## Short Description

Mantis is a Bitget-native trading agent that detects coordinated market manipulation across four data layers and waits for cleaner entries before retail sees the trap.

## Team Form

Team name:

```text
Mantis
```

Competition track:

```text
Trading agent
```

Team introduction:

```text
Mantis detects coordinated market manipulation across four data layers and helps a Bitget trading agent find cleaner entries.
```

## Links To Submit

- GitHub: `https://github.com/dr4ken-soul/Mantis`
- Demo video: add the final video link here
- X build post: add the posted X link here
- Frontend demo link: add deployed dashboard link if deployed
- Backend/API link: add deployed API link if required

## Demo Video Flow

Keep it around 2-3 minutes.

1. Show the dashboard landing page.
2. Explain the four-layer manipulation detector.
3. Open one token detail page and show lifecycle stage/layer scores.
4. Run or show `run_phase10_demo.py`.
5. Show `data_store/phase10_demo_results.md`.
6. Explain that Bitget is the primary market/backtest source and Skill Hub is wired as the primary perception source when keys are available.
7. End with the core point: Mantis is not trying to trade more, it is trying to avoid bad entries and act only when the trap is visible.

## Current Phase 10 Snapshot

The current saved Phase 10 report is at:

```text
data_store/phase10_demo_results.md
```

The last committed report shows Bitget OHLCV working through the public Bitget REST fallback, but Skill Hub fields were empty because the local `.env` used during that run did not contain the Bitget keys.

Before final recording, restore `.env` locally and rerun:

```bash
python run_phase10_demo.py
```

Then record the dashboard and report together.
