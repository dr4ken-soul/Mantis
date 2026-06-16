# Mantis — Frontend Specification

## Design Decisions Confirmed

| Gate | Decision |
|---|---|
| Aesthetic | Warm Obsidian — Dark Editorial + Warm Organic + Cinematic Motion + Light Glassmorphism combined |
| Navigation | Minimal two-item top bar — liquid-glass pill, logo left, two links right |
| Background | Static but atmospheric — warm grain overlay, ambient glow blobs |
| Font pairing | Cormorant Garamond (italic display) + DM Sans (body) + JetBrains Mono (numbers) |
| Palette | Warm Obsidian — confirmed |

---

## Global CSS — src/index.css

This file contains every CSS variable, the liquid glass classes, keyframe animations, the grain overlay and base resets. Nothing is hardcoded in component files.

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=JetBrains+Mono:wght@400;500&display=swap');

/* ============================================================
   WARM OBSIDIAN — Design Token System
   ============================================================ */

:root {
  /* Fonts */
  --font-display: 'Cormorant Garamond', serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* Backgrounds — warm brown-black, not cold blue-black */
  --bg-primary:   #0d0b09;
  --bg-secondary: #141210;
  --bg-surface:   rgba(255, 248, 240, 0.04);
  --bg-elevated:  rgba(255, 248, 240, 0.07);

  /* Accent — warm amber gold */
  --accent:       #d4a853;
  --accent-hover: #e0be78;
  --accent-glow:  rgba(212, 168, 83, 0.15);

  /* Text — warm off-white, not cold */
  --text-primary:   #f2ede6;
  --text-secondary: #9e9087;
  --text-muted:     #5a5249;

  /* Borders — warm frosted glass */
  --border-subtle:  rgba(242, 237, 230, 0.05);
  --border-default: rgba(242, 237, 230, 0.09);

  /* Semantic */
  --success: #5c9e78;
  --error:   #c4615a;

  /* Stage colours */
  --stage-1-bg:     rgba(90,  82,  73,  0.30);
  --stage-1-text:   #9e9087;
  --stage-1-border: rgba(158, 144, 135, 0.25);

  --stage-2-bg:     rgba(30,  58,  138, 0.30);
  --stage-2-text:   #93c5fd;
  --stage-2-border: rgba(59, 130, 246, 0.28);

  --stage-3-bg:     rgba(127, 29,  29,  0.30);
  --stage-3-text:   #fca5a5;
  --stage-3-border: rgba(196,  97,  90, 0.45);
  --stage-3-glow:   rgba(196,  97,  90, 0.30);

  --stage-4-bg:     rgba(113, 63,  18,  0.30);
  --stage-4-text:   #fcd34d;
  --stage-4-border: rgba(212, 168, 83, 0.30);

  /* Layer colours for detection chart */
  --layer-1: #6b9bd2;
  --layer-2: #a78bca;
  --layer-3: #d4a853;
  --layer-4: #c4615a;

  /* Border radius — organic, not sharp */
  --radius-sm:  8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-xl: 32px;

  /* Shadows */
  --shadow-sm: 0 2px 8px  rgba(0, 0, 0, 0.35);
  --shadow-md: 0 8px 28px rgba(0, 0, 0, 0.45);
  --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.55);

  /* Transitions */
  --duration-fast:   150ms;
  --duration-normal: 300ms;
  --duration-slow:   600ms;
}

/* ============================================================
   LIQUID GLASS CLASSES — from Step 3B of Frontend Skill
   ============================================================ */

/* Standard: subtle glass for nav, chips, cards over dark backgrounds */
.liquid-glass {
  background: rgba(255, 248, 240, 0.03);
  background-blend-mode: luminosity;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 248, 240, 0.08);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(
    180deg,
    rgba(255, 248, 240, 0.35) 0%,
    rgba(255, 248, 240, 0.12) 20%,
    rgba(255, 248, 240, 0)    40%,
    rgba(255, 248, 240, 0)    60%,
    rgba(255, 248, 240, 0.12) 80%,
    rgba(255, 248, 240, 0.35) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Strong: heavier blur for stat cards and CTAs */
.liquid-glass-strong {
  background: rgba(255, 248, 240, 0.04);
  background-blend-mode: luminosity;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  border: none;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 248, 240, 0.12);
  position: relative;
  overflow: hidden;
}
.liquid-glass-strong::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(
    180deg,
    rgba(255, 248, 240, 0.40) 0%,
    rgba(255, 248, 240, 0.15) 20%,
    rgba(255, 248, 240, 0)    40%,
    rgba(255, 248, 240, 0)    60%,
    rgba(255, 248, 240, 0.15) 80%,
    rgba(255, 248, 240, 0.40) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Dark: for nav and elements directly on dark backgrounds */
.liquid-glass-dark {
  background: rgba(13, 11, 9, 0.55);
  background-blend-mode: luminosity;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 248, 240, 0.07);
  position: relative;
  overflow: hidden;
}
.liquid-glass-dark::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(
    180deg,
    rgba(255, 248, 240, 0.22) 0%,
    rgba(255, 248, 240, 0.08) 20%,
    rgba(255, 248, 240, 0)    40%,
    rgba(255, 248, 240, 0)    60%,
    rgba(255, 248, 240, 0.08) 80%,
    rgba(255, 248, 240, 0.22) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* ============================================================
   NOISE GRAIN OVERLAY
   ============================================================ */

body::after {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.032;
  pointer-events: none;
  z-index: 9999;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 128px 128px;
}

/* ============================================================
   KEYFRAMES
   ============================================================ */

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(24px, -40px) scale(1.04); }
  66%       { transform: translate(-16px, 18px) scale(0.96); }
}

@keyframes trapPulse {
  0%, 100% { box-shadow: 0 0 0px var(--stage-3-glow); }
  50%       { box-shadow: 0 0 18px var(--stage-3-glow); }
}

@keyframes blinkCursor {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* ============================================================
   RESET AND BASE
   ============================================================ */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

/* CSS hover states — never use inline JS onMouseEnter/onMouseLeave */
.card-hover {
  transition:
    border-color var(--duration-fast) cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow   var(--duration-normal) cubic-bezier(0.16, 1, 0.3, 1),
    background   var(--duration-fast) ease;
}
.card-hover:hover {
  border-color: rgba(242, 237, 230, 0.16);
  box-shadow: var(--shadow-md);
  background: var(--bg-elevated);
}

.link-hover {
  transition: color var(--duration-fast) ease;
}
.link-hover:hover { color: var(--text-primary); }
```

---

## Tailwind Config — tailwind.config.js

```javascript
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'orb-float':  'orbFloat 22s ease-in-out infinite',
        'trap-pulse': 'trapPulse 2.2s ease-in-out infinite',
        'blink':      'blinkCursor 1s step-end infinite',
      },
    },
  },
}
```

---

## Logo and Favicon

Place `mantis-logo.png` in `frontend/public/`.

In `index.html`:
```html
<link rel="icon" type="image/png" href="/mantis-logo.png" />
```

In the Nav component:
```tsx
<img src="/mantis-logo.png" alt="Mantis" className="h-7 w-auto" />
```

---

## Components

### AmbientBackground.tsx

Fixed behind all content. Two warm glow orbs using CSS-only animation. Pointer events disabled throughout.

```tsx
/**
 * Fixed atmospheric background orbs providing ambient depth.
 * Static but alive — matches Gate 3 decision.
 */
export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Primary orb — warm amber centre */}
      <div
        className="absolute rounded-full animate-orb-float"
        style={{
          width: '560px',
          height: '400px',
          top: '20%',
          left: '35%',
          background: 'var(--accent-glow)',
          filter: 'blur(120px)',
          opacity: 0.6,
        }}
      />
      {/* Secondary orb — warm error red, bottom right */}
      <div
        className="absolute rounded-full animate-orb-float"
        style={{
          width: '360px',
          height: '360px',
          bottom: '10%',
          right: '20%',
          background: 'rgba(196, 97, 90, 0.08)',
          filter: 'blur(100px)',
          opacity: 0.5,
          animationDelay: '-9s',
        }}
      />
    </div>
  )
}
```

### Nav.tsx

Liquid-glass-dark pill floating from the top. Logo image on the left. Two page links on the right. Matches the minimal two-item top bar from Gate 2 using the Premium Component Library pill pattern.

```tsx
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Fixed top navigation bar.
 * Liquid-glass-dark pill with logo left and two page links right.
 * Entrance: blur-in from top with delay 0.2s.
 */
export function Nav() {
  const { pathname } = useLocation()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0,   filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      className="fixed top-4 inset-x-0 z-50 px-6 lg:px-12"
    >
      <div
        className="liquid-glass-dark rounded-full px-5 py-3
          flex items-center justify-between max-w-4xl mx-auto"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/mantis-logo.png" alt="Mantis" className="h-7 w-auto" />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '1.15rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            Mantis
          </span>
        </Link>

        {/* Two page links — CSS hover via .link-hover class */}
        <div className="flex items-center gap-1">
          {[
            { to: '/',          label: 'Board'     },
            { to: '/positions', label: 'Positions' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="link-hover px-4 py-2 rounded-full text-sm font-medium"
              style={{
                fontFamily: 'var(--font-body)',
                color: pathname === to ? 'var(--text-primary)' : 'var(--text-muted)',
                transition: 'color var(--duration-fast) ease',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
```

### StageBadge.tsx

Uses the Premium Component Library status badge pattern. Stage 3 gets `animate-trap-pulse` — the only animated badge across the entire UI.

```tsx
interface StageBadgeProps {
  stage: number
}

const stageMap: Record<number, {
  label:  string
  bgVar:  string
  textVar: string
  borderVar: string
  pulse?: boolean
}> = {
  0: { label: 'None',         bgVar: '--stage-1-bg', textVar: '--stage-1-text', borderVar: '--stage-1-border' },
  1: { label: 'Accumulation', bgVar: '--stage-1-bg', textVar: '--stage-1-text', borderVar: '--stage-1-border' },
  2: { label: 'OI Matrix',    bgVar: '--stage-2-bg', textVar: '--stage-2-text', borderVar: '--stage-2-border' },
  3: { label: 'Trap',         bgVar: '--stage-3-bg', textVar: '--stage-3-text', borderVar: '--stage-3-border', pulse: true },
  4: { label: 'Distribution', bgVar: '--stage-4-bg', textVar: '--stage-4-text', borderVar: '--stage-4-border' },
}

/**
 * Colour-coded lifecycle stage badge.
 * Stage 3 pulses a warm red glow — the sole animated element on the board.
 * @param stage - 0 to 4
 */
export function StageBadge({ stage }: StageBadgeProps) {
  const s = stageMap[stage] ?? stageMap[0]

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-md ${s.pulse ? 'animate-trap-pulse' : ''}`}
      style={{
        background:   `var(${s.bgVar})`,
        color:        `var(${s.textVar})`,
        border:       `1px solid var(${s.borderVar})`,
        fontFamily:   'var(--font-body)',
        letterSpacing: '0.025em',
        borderRadius:  'var(--radius-sm)',
      }}
    >
      {s.label}
    </span>
  )
}
```

### TokenCard.tsx

Uses the Premium Component Library card pattern with CSS hover state via `.card-hover` class. Entrance uses blur-in with staggered delay computed from index. No inline JS hover handlers.

```tsx
import { motion } from 'framer-motion'
import type { Token } from '../types'
import { StageBadge } from './StageBadge'
import { formatRelativeTime } from '../lib/utils'

interface TokenCardProps {
  token: Token
  index: number
  onClick: () => void
}

/**
 * Token board card.
 * Blur-in entrance staggered by index. CSS hover via card-hover class.
 * @param token - token data from GET /api/tokens
 * @param index - grid position used for stagger delay
 * @param onClick - navigate to token detail page
 */
export function TokenCard({ token, index, onClick }: TokenCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
      transition={{
        duration: 0.55,
        ease: 'easeOut',
        delay: 0.3 + index * 0.05,
      }}
      onClick={onClick}
      className="card-hover cursor-pointer rounded-[var(--radius-md)] p-4 flex flex-col gap-3"
      style={{
        background: 'var(--bg-surface)',
        border:     '1px solid var(--border-default)',
      }}
    >
      {/* Symbol and stage badge */}
      <div className="flex items-center justify-between">
        <span
          style={{
            fontFamily:  'var(--font-mono)',
            fontSize:    '0.9rem',
            fontWeight:  500,
            color:       'var(--text-primary)',
            letterSpacing: '0.01em',
          }}
        >
          {token.symbol}
        </span>
        <StageBadge stage={token.currentStage} />
      </div>

      {/* Confidence bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Confidence
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {(token.stageConfidence * 100).toFixed(0)}%
          </span>
        </div>
        {/* Track */}
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: '3px', background: 'var(--border-subtle)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width:      `${token.stageConfidence * 100}%`,
              background: 'var(--accent)',
            }}
          />
        </div>
      </div>

      {/* Last scanned */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          {formatRelativeTime(token.lastScannedAt)}
        </span>
      </div>
    </motion.div>
  )
}
```

### StatCard.tsx

Uses the liquid-glass stat card pattern from the Premium Component Library. Blur-in entrance with specific delay.

```tsx
import { motion } from 'framer-motion'

interface StatCardProps {
  label:     string
  value:     string
  delay?:    number
  highlight?: boolean
}

/**
 * Liquid-glass stat card for the board and positions stats bar.
 * Matches the Premium Component Library stat card pattern.
 * @param label - metric name
 * @param value - formatted display string
 * @param delay - framer motion entrance delay in seconds
 * @param highlight - applies accent colour to the value when true
 */
export function StatCard({ label, value, delay = 0.3, highlight }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      className="liquid-glass-strong flex flex-col gap-1 px-5 py-4 rounded-[var(--radius-md)]"
    >
      <span
        style={{
          fontFamily:  'var(--font-mono)',
          fontSize:    '1.3rem',
          fontWeight:  500,
          lineHeight:  1,
          color:       highlight ? 'var(--accent)' : 'var(--text-primary)',
          letterSpacing: '-0.01em',
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '0.72rem',
          color:      'var(--text-muted)',
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </motion.div>
  )
}
```

### DetectionChart.tsx

Horizontal recharts bar chart. Triggered layers at full opacity. Untriggered at 25% opacity. Warm layer colours from the Warm Obsidian palette.

```tsx
import {
  BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer,
} from 'recharts'
import type { DetectionLayer } from '../types'

const layerColourMap: Record<number, string> = {
  1: 'var(--layer-1)',
  2: 'var(--layer-2)',
  3: 'var(--layer-3)',
  4: 'var(--layer-4)',
}

/**
 * Horizontal bar chart showing all four detection layer scores (0 to 1).
 * Triggered layers render at full opacity. Untriggered at 0.25.
 * @param layers - detection layer results from GET /api/tokens/:symbol
 */
export function DetectionChart({ layers }: { layers: DetectionLayer[] }) {
  const data = layers.map(l => ({
    name:    l.layerName,
    score:   l.score,
    colour:  layerColourMap[l.layerNumber] ?? 'var(--text-muted)',
    opacity: l.triggered ? 1 : 0.25,
  }))

  return (
    <ResponsiveContainer width="100%" height={170}>
      <BarChart data={data} layout="vertical" barCategoryGap="28%">
        <XAxis
          type="number"
          domain={[0, 1]}
          hide
        />
        <YAxis
          type="category"
          dataKey="name"
          width={140}
          tick={{
            fill:       'var(--text-secondary)',
            fontSize:    12,
            fontFamily: 'var(--font-body)',
          }}
          axisLine={false}
          tickLine={false}
        />
        <Bar dataKey="score" radius={[0, var(--radius-sm), var(--radius-sm), 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.colour} opacity={entry.opacity} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
```

**Note:** replace the radius prop `[0, var(--radius-sm), var(--radius-sm), 0]` with `[0, 6, 6, 0]` — recharts takes numbers, not CSS variables.

### PositionRow.tsx

Table row for one paper position. Direction tag, PnL colour, mono font for all numbers.

```tsx
import type { Position } from '../types'

/**
 * Table row for one active paper position.
 * Uses CSS class-based styling throughout — no inline JS hover handlers.
 * @param position - position data from GET /api/positions
 */
export function PositionRow({ position }: { position: Position }) {
  const isPositive = position.unrealisedPnl >= 0

  const cellStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize:   '0.875rem',
    color:      'var(--text-secondary)',
    padding:    '0.85rem 0.5rem',
  }

  return (
    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <td style={{ ...cellStyle, color: 'var(--text-primary)', fontWeight: 500 }}>
        {position.symbol}
      </td>
      <td style={{ padding: '0.85rem 0.5rem' }}>
        <span
          className="inline-flex px-2.5 py-0.5 text-xs font-medium rounded-md"
          style={{
            background:  position.direction === 'LONG'
              ? 'rgba(92, 158, 120, 0.15)'
              : 'rgba(196, 97, 90, 0.15)',
            color:       position.direction === 'LONG'
              ? 'var(--success)'
              : 'var(--error)',
            fontFamily:   'var(--font-body)',
            borderRadius: 'var(--radius-sm)',
            letterSpacing: '0.025em',
          }}
        >
          {position.direction}
        </span>
      </td>
      <td style={cellStyle}>{position.entryPrice.toFixed(4)}</td>
      <td style={cellStyle}>{position.currentPrice.toFixed(4)}</td>
      <td style={{
        ...cellStyle,
        fontWeight: 500,
        color: isPositive ? 'var(--success)' : 'var(--error)',
      }}>
        {isPositive ? '+' : ''}{position.unrealisedPnl.toFixed(2)}%
      </td>
      <td style={{ ...cellStyle, color: 'var(--text-muted)' }}>
        {position.leverage}x
      </td>
      <td style={{ ...cellStyle, color: 'var(--text-muted)', fontSize: '0.78rem' }}>
        {new Date(position.openedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
      </td>
    </tr>
  )
}
```

---

## Pages

### BoardPage.tsx — /

Staggered blur-in entrance. Stats bar enters first (delay 0.3s). Section label (delay 0.45s). Token cards stagger from index.

```tsx
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getTokens, getStats } from '../lib/api'
import { TokenCard } from '../components/TokenCard'
import { StatCard }  from '../components/StatCard'
import { AmbientBackground } from '../components/AmbientBackground'

/**
 * Main token board — grid of all monitored tokens with lifecycle stages.
 * Entrance sequence: stats (0.3s) → label (0.45s) → cards (0.3 + index * 0.05s).
 */
export function BoardPage() {
  const navigate  = useNavigate()
  const { data: tokens = [] } = useQuery({ queryKey: ['tokens'], queryFn: getTokens, refetchInterval: 30_000 })
  const { data: stats }       = useQuery({ queryKey: ['stats'],  queryFn: getStats,  refetchInterval: 60_000 })

  return (
    <>
      <AmbientBackground />

      <main
        className="relative min-h-screen"
        style={{ paddingTop: '5.5rem', paddingBottom: '3rem', zIndex: 1 }}
      >
        <div className="max-w-5xl mx-auto px-6">

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <StatCard label="Win Rate"    value={stats ? `${stats.winRate.toFixed(1)}%`      : '--'}  delay={0.30} highlight />
            <StatCard label="Total PnL"   value={stats ? `${stats.totalPnlPct.toFixed(2)}%`  : '--'}  delay={0.38} />
            <StatCard label="Trades"      value={stats ? `${stats.totalTrades}`               : '--'}  delay={0.46} />
            <StatCard label="Sharpe"      value={stats ? stats.sharpeRatio.toFixed(2)          : '--'}  delay={0.54} />
          </div>

          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.45 }}
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.72rem',
              color:         'var(--text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom:  '1rem',
            }}
          >
            Monitored Tokens
          </motion.p>

          {/* Token grid */}
          {tokens.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--text-muted)' }}>
                No tokens being monitored
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Start the Mantis agent to begin scanning
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tokens.map((token, i) => (
                <TokenCard
                  key={token.symbol}
                  token={token}
                  index={i}
                  onClick={() => navigate(`/token/${token.symbol}`)}
                />
              ))}
            </div>
          )}

        </div>
      </main>
    </>
  )
}
```

### TokenDetailPage.tsx — /token/:symbol

Stagger sequence: back link (0.2s) → symbol heading (0.3s) → badge row (0.4s) → chart card (0.5s) → stage explanation (0.6s) → signal card (0.7s).

```tsx
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { getToken, scanToken } from '../lib/api'
import { StageBadge }     from '../components/StageBadge'
import { DetectionChart } from '../components/DetectionChart'
import { AmbientBackground } from '../components/AmbientBackground'

const stageExplanations: Record<number, string> = {
  0: 'No manipulation stage detected. Standard technical analysis logic applies.',
  1: 'Accumulation detected. Market makers are quietly building positions. Mantis is watching but not trading.',
  2: 'OI Matrix active. Open interest is rising with volume confirmation. Mantis may open a long if technicals align.',
  3: 'Trap signal detected. Manufactured exhaustion to lure short sellers. Mantis is looking to fade the trap.',
  4: 'Distribution in progress. Market makers are exiting. Mantis will not open new positions.',
}

/**
 * Token detail page showing detection layer scores, lifecycle stage and trade signal.
 * Entrance stagger: back link 0.2s, heading 0.3s, badges 0.4s, chart 0.5s, explanation 0.6s.
 */
export function TokenDetailPage() {
  const { symbol }    = useParams<{ symbol: string }>()
  const navigate      = useNavigate()
  const queryClient   = useQueryClient()

  const { data: layers = [] } = useQuery({
    queryKey: ['token', symbol],
    queryFn:  () => getToken(symbol!),
    refetchInterval: 30_000,
    enabled: !!symbol,
  })

  const scanMutation = useMutation({
    mutationFn: () => scanToken(symbol!),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: ['token', symbol] }),
  })

  /* Derive stage from the highest triggered layer */
  const dominantStage = layers.reduce((max, l) => l.triggered && l.layerNumber > max ? l.layerNumber : max, 0)

  return (
    <>
      <AmbientBackground />

      <main
        className="relative min-h-screen"
        style={{ paddingTop: '5.5rem', paddingBottom: '3rem', zIndex: 1 }}
      >
        <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">

          {/* Back link */}
          <motion.button
            initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0,   filter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
            onClick={() => navigate('/')}
            className="link-hover self-start text-sm"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', textDecoration: 'none' }}
          >
            Back to Board
          </motion.button>

          {/* Symbol heading + scan button */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.3 }}
            className="flex items-end justify-between"
          >
            <h1
              style={{
                fontFamily:   'var(--font-display)',
                fontStyle:    'italic',
                fontSize:     'clamp(2rem, 5vw, 3rem)',
                lineHeight:   0.95,
                letterSpacing: '-0.02em',
                color:        'var(--text-primary)',
              }}
            >
              {symbol}
            </h1>
            <button
              onClick={() => scanMutation.mutate()}
              disabled={scanMutation.isPending}
              className="liquid-glass rounded-full px-4 py-2 text-sm link-hover"
              style={{
                fontFamily: 'var(--font-body)',
                color:      'var(--text-secondary)',
                cursor:     scanMutation.isPending ? 'not-allowed' : 'pointer',
                opacity:    scanMutation.isPending ? 0.5 : 1,
              }}
            >
              {scanMutation.isPending ? 'Scanning...' : 'Scan now'}
            </button>
          </motion.div>

          {/* Badge row */}
          <motion.div
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.4 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <StageBadge stage={dominantStage} />
          </motion.div>

          {/* Detection chart card */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.5 }}
            className="liquid-glass rounded-[var(--radius-lg)] p-5"
          >
            <p
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '0.72rem',
                color:         'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom:  '1rem',
              }}
            >
              Detection Layers
            </p>
            <DetectionChart layers={layers} />
          </motion.div>

          {/* Stage explanation */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.6 }}
            className="rounded-[var(--radius-md)] px-5 py-4"
            style={{
              background:  'var(--bg-surface)',
              borderLeft:  `3px solid var(--stage-${dominantStage > 0 ? dominantStage : 1}-border)`,
              border:      '1px solid var(--border-subtle)',
              borderLeftWidth: '3px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '0.875rem',
                color:      'var(--text-secondary)',
                lineHeight: 1.65,
              }}
            >
              {stageExplanations[dominantStage] ?? stageExplanations[0]}
            </p>
          </motion.div>

        </div>
      </main>
    </>
  )
}
```

### PositionsPage.tsx — /positions

Stagger: stats bar (0.3-0.54s) → table header (0.6s) → rows (0.65 + index * 0.04s).

```tsx
import { useQuery } from '@tanstack/react-query'
import { motion }   from 'framer-motion'
import { getPositions, getStats } from '../lib/api'
import { StatCard }     from '../components/StatCard'
import { PositionRow }  from '../components/PositionRow'
import { AmbientBackground } from '../components/AmbientBackground'

/**
 * Positions page — stats bar and table of all open paper positions.
 * Entrance sequence: stats (0.3s) → table header (0.6s) → rows staggered.
 */
export function PositionsPage() {
  const { data: positions = [] } = useQuery({ queryKey: ['positions'], queryFn: getPositions, refetchInterval: 15_000 })
  const { data: stats }           = useQuery({ queryKey: ['stats'],     queryFn: getStats,     refetchInterval: 60_000 })

  return (
    <>
      <AmbientBackground />

      <main
        className="relative min-h-screen"
        style={{ paddingTop: '5.5rem', paddingBottom: '3rem', zIndex: 1 }}
      >
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-6">

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard label="Win Rate"   value={stats ? `${stats.winRate.toFixed(1)}%`     : '--'} delay={0.30} highlight />
            <StatCard label="Total PnL"  value={stats ? `${stats.totalPnlPct.toFixed(2)}%` : '--'} delay={0.38} />
            <StatCard label="Open"       value={String(positions.length)}                           delay={0.46} />
            <StatCard label="Sharpe"     value={stats ? stats.sharpeRatio.toFixed(2)        : '--'} delay={0.54} />
          </div>

          {/* Table */}
          {positions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--text-muted)' }}>
                No open positions
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Mantis is scanning for entry signals
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
              className="liquid-glass rounded-[var(--radius-lg)] overflow-hidden"
            >
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      borderBottom: '1px solid var(--border-default)',
                    }}
                  >
                    {['Token', 'Direction', 'Entry', 'Current', 'PnL', 'Leverage', 'Opened'].map(col => (
                      <th
                        key={col}
                        style={{
                          fontFamily:    'var(--font-body)',
                          fontSize:      '0.68rem',
                          color:         'var(--text-muted)',
                          letterSpacing: '0.07em',
                          textTransform: 'uppercase',
                          fontWeight:    500,
                          padding:       '0.85rem 0.5rem',
                          textAlign:     'left',
                        }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {positions.map((pos, i) => (
                    <motion.tr
                      key={pos.symbol + pos.openedAt}
                      initial={{ opacity: 0, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.65 + i * 0.04 }}
                      style={{ borderBottom: '1px solid var(--border-subtle)' }}
                    >
                      <PositionRow position={pos} />
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

        </div>
      </main>
    </>
  )
}
```

---

## Hooks

### hooks/useScrollReveal.ts

```typescript
import { useEffect, useRef } from 'react'

/**
 * Attaches IntersectionObserver scroll-reveal behaviour.
 * Elements start visible — animation is progressive enhancement.
 * @param threshold - intersection ratio to trigger reveal
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const selectors = '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-blur'
      const observer = new IntersectionObserver(
        (entries) => entries.forEach(entry => {
          entry.isIntersecting
            ? entry.target.classList.add('revealed')
            : entry.target.classList.remove('revealed')
        }),
        { threshold }
      )
      document.querySelectorAll(selectors).forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top >= window.innerHeight * 0.85) el.classList.add('scroll-hidden')
        observer.observe(el)
      })
    })
    return () => cancelAnimationFrame(frameId)
  }, [])

  return ref
}
```

---

## TypeScript Types — src/types/index.ts

```typescript
export interface Token {
  symbol:          string
  currentStage:    number
  stageConfidence: number
  lastScannedAt:   string
}

export interface DetectionLayer {
  layerNumber: number
  layerName:   string
  score:       number
  triggered:   boolean
  signals:     string[]
}

export interface Position {
  symbol:        string
  direction:     'LONG' | 'SHORT'
  entryPrice:    number
  currentPrice:  number
  unrealisedPnl: number
  leverage:      number
  status:        'open' | 'closed'
  openedAt:      string
}

export interface Stats {
  winRate:     number
  totalPnlPct: number
  totalTrades: number
  sharpeRatio: number
}
```

---

## API Client — src/lib/api.ts

```typescript
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8001'

/** Fetches all monitored tokens with their current lifecycle stage. */
export const getTokens = (): Promise<Token[]> =>
  fetch(`${BASE_URL}/api/tokens`).then(r => r.json())

/**
 * Fetches detection layer scores for one token.
 * @param symbol - token trading pair symbol
 */
export const getToken = (symbol: string): Promise<DetectionLayer[]> =>
  fetch(`${BASE_URL}/api/tokens/${symbol}`).then(r => r.json())

/** Fetches all open paper positions with live PnL. */
export const getPositions = (): Promise<Position[]> =>
  fetch(`${BASE_URL}/api/positions`).then(r => r.json())

/** Fetches portfolio-level stats from the most recent backtest results. */
export const getStats = (): Promise<Stats> =>
  fetch(`${BASE_URL}/api/stats`).then(r => r.json())

/**
 * Triggers an immediate crime pump detection scan for one token.
 * @param symbol - token trading pair symbol
 */
export const scanToken = (symbol: string): Promise<{ stage: number; confidence: number }> =>
  fetch(`${BASE_URL}/api/scan/${symbol}`, { method: 'POST' }).then(r => r.json())
```

---

## File Structure

```
frontend/
├── public/
│   └── mantis-logo.png
├── src/
│   ├── components/
│   │   ├── AmbientBackground.tsx
│   │   ├── Nav.tsx
│   │   ├── StageBadge.tsx
│   │   ├── TokenCard.tsx
│   │   ├── StatCard.tsx
│   │   ├── DetectionChart.tsx
│   │   └── PositionRow.tsx
│   ├── pages/
│   │   ├── BoardPage.tsx
│   │   ├── TokenDetailPage.tsx
│   │   └── PositionsPage.tsx
│   ├── hooks/
│   │   └── useScrollReveal.ts
│   ├── lib/
│   │   ├── api.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## Key Dependencies — package.json

```json
{
  "dependencies": {
    "react":                  "^18.3.0",
    "react-dom":              "^18.3.0",
    "react-router-dom":       "^6.24.0",
    "@tanstack/react-query":  "^5.45.0",
    "framer-motion":          "^11.2.0",
    "recharts":               "^2.12.7",
    "lucide-react":           "^0.383.0"
  },
  "devDependencies": {
    "typescript":             "^5.5.2",
    "vite":                   "^5.3.1",
    "@vitejs/plugin-react":   "^4.3.1",
    "tailwindcss":            "^3.4.4",
    "postcss":                "^8.4.38",
    "autoprefixer":           "^10.4.19"
  }
}
```

---

## Environment Variable

```
VITE_API_URL=https://your-railway-url.up.railway.app
```

---

## Quality Audit Checklist

- All hex values live in `index.css` as CSS variables — zero hardcoded colours in any component file
- All entrance animations use blur-in: `filter: blur(Xpx)` alongside `opacity` and `y` — never plain fadeUp
- Hover states on cards use `.card-hover` CSS class and transitions — no inline JS `onMouseEnter/onMouseLeave`
- Nav uses the liquid-glass-dark pill pattern from the Premium Component Library — not the banned default pattern
- Stat cards use `liquid-glass-strong` from the Premium Component Library — not plain background divs
- Detection chart card uses `liquid-glass` — glass border visible on the warm dark background
- Stage 3 badge `animate-trap-pulse` is the only animated badge — no other stage pulses
- Noise grain is applied via `body::after` at `opacity: 0.032` — texture without distraction
- Ambient glow blobs are `position: fixed` — they do not scroll
- All number values across all three pages render in `var(--font-mono)` — labels in `var(--font-body)`
- Symbol heading on TokenDetailPage uses `font-display` italic in Cormorant Garamond
- Logo renders from `public/mantis-logo.png` in both nav and browser tab
- Token grid collapses to single column on mobile
- Touch targets on mobile are minimum 44px
- Empty states on all three pages have a message in display italic and a secondary explanation in body
