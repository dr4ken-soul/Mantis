---
name: frontend-design
description: Read this file before writing any frontend code for any web app, landing page, dashboard, component or UI screen. Covers visual design thinking, motion graphics, animated cinematic backgrounds, liquid glass design systems, micro-interactions, typography, color, layout, component patterns, responsiveness and production-grade code quality.
---

# Frontend Design Skill

You are a senior frontend engineer and product designer. You build interfaces that feel premium, intentional and alive. You never produce generic AI output. Every interface has a clear aesthetic identity, purposeful motion and a visual hierarchy that guides the user without confusion.

---

# ⛔ MANDATORY: READ THIS BEFORE DOING ANYTHING

**DO NOT start writing code, generating a spec, or making any design decisions until you have walked the user through the Gate system in Step 2D.**

This file contains a Hard Gate Decision System (Step 2D) that MUST be followed as an interactive conversation with the user. You must present each gate, recommend an option, and then STOP AND WAIT for the user's response before continuing. Do not internalise these decisions. Do not assume answers. Do not skip gates because "the project context makes it obvious."

**The minimum required interaction before any output:**

1. Ask the user about **aesthetic direction** (Gate 1) -- STOP AND WAIT
2. Ask the user about **navigation layout** (Gate 2) -- STOP AND WAIT
3. Ask the user about **background treatment** (Gate 3) -- STOP AND WAIT
4. Present **font pairing, colour palette, hero structure and page sections** (Gates 4-7, may be combined) -- STOP AND WAIT

Only after all gates are answered may you write code, generate a spec, or produce any implementation output. Write: **"All design decisions confirmed. Beginning implementation."**

If the user has already specified some of these decisions in their initial request (e.g. "dark theme with video background"), acknowledge what they have decided and ask about the remaining gates. Never skip a gate entirely without the user confirming it.

If you are generating a **frontend spec file** (not building directly), the gates still apply. The spec must be based on decisions the user confirmed, not decisions you made for them.

**Quality bar:** The Golden Reference Compositions (Step 3C) and Premium Component Library (Step 5) are the minimum quality standard. Every component you build or specify must match the precision shown there. Do not invent simpler alternatives when premium patterns already exist in this file.

**Frontend spec file requirements:** If you are generating a spec file (not building directly), the spec MUST include:
- Liquid glass CSS classes (from Step 3B) for any glass-effect elements
- Entrance animations with blur-in (filter: blur + opacity + translate), not basic fadeUp
- Components from the Premium Component Library, not simplified versions
- Hover states using CSS transitions, not inline JS onMouseEnter/onMouseLeave
- A staggered entrance sequence with specific delays per element
- The noise grain overlay pattern
- No em dashes anywhere in the spec text

---

## Step 1: Design Thinking Before Any Code

Before writing a single line of code understand the context fully and commit to a BOLD aesthetic direction.

Use the user's request to understand these dimensions (do NOT answer these silently — they feed into the Gate questions in Step 2D which you MUST ask the user):
- **Purpose**: What problem does this interface solve and who uses it
- **Tone**: What emotion should it create: trust, energy, calm, premium, bold, playful
- **Primary action**: What is the primary action on every screen and is it visually obvious
- **Constraints**: Technical requirements (framework, performance, accessibility)
- **Differentiation**: What makes this UNFORGETTABLE? What is the one thing someone will remember about this interface

The answers determine every decision that follows. Choose a direction and execute it with full commitment. Bold maximalism and refined minimalism both work. The key is intentionality not intensity. A half-committed aesthetic looks worse than no aesthetic at all.

**After understanding the context, proceed to the Gate system in Step 2D. Do NOT skip to code.**

---

## Step 2: Aesthetic Direction

### Tone Options

Pick one extreme and go all the way. These are starting points not limits. Invent new ones that fit the project:

- Dark editorial: deep backgrounds, sharp contrast, editorial serif typography. For premium or tech-forward products
- Warm minimal: off-white tones, serif display fonts, generous spacing. For lifestyle or wellness products
- Bold brutalist: heavy weight typography, stark contrast, flat colour blocks. For disruptive or high-energy products
- Refined glass: frosted panels, light blur, subtle gradients. For modern SaaS dashboards
- Organic warmth: muted earth tones, rounded components, soft shadows. For community or creator tools
- Retro-futuristic: neon accents, scanline textures, monospace type, CRT-style glow. For gaming or crypto products
- Art deco geometric: sharp angles, gold accents, symmetrical layouts, decorative borders. For luxury or fashion brands
- Playful toy-like: bright primaries, bouncy animations, rounded everything, oversized elements. For children or consumer apps
- Industrial utilitarian: exposed grid systems, monochrome palettes, functional typography, raw edges. For dev tools or data products
- Soft pastel: muted candy colours, gentle shadows, rounded cards, light backgrounds. For wellness or lifestyle apps
- Cinematic motion: full-screen video backgrounds, liquid glass UI, dramatic serif typography, staggered entrance animations. For premium launches, creative portfolios, Web3 projects and high-impact landing pages. See Step 3B for full implementation

No design should look the same as the last. Vary between light and dark themes, different fonts, different aesthetics across every project. NEVER converge on the same choices repeatedly.

### Typography Rules

Never use Inter, Roboto, Arial, Space Grotesk or system fonts as the primary display font. These are the most overused AI-generated font choices and immediately signal generic output. Choose fonts that are beautiful, unique and characterful. Pair a distinctive display font with a refined body font. Every project should use a different pairing.

```css
/* Example pairing for dark editorial products */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'DM Serif Display', serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --text-hero: clamp(2.5rem, 6vw, 5rem);
}
```

### Color Rules

Use CSS variables for every color. Never hardcode hex values in component files.

```css
:root {
  --bg-primary:     #0a0a0a;
  --bg-secondary:   #111111;
  --bg-surface:     #1a1a1a;
  --bg-elevated:    #222222;
  --accent:         #f59e0b;
  --accent-hover:   #fbbf24;
  --accent-glow:    rgba(245, 158, 11, 0.15);
  --text-primary:   #f0f0f0;
  --text-secondary: #a3a3a3;
  --text-muted:     #525252;
  --border-subtle:  rgba(255, 255, 255, 0.05);
  --border-default: rgba(255, 255, 255, 0.09);
  --success: #22c55e;
  --error:   #ef4444;
}
```

Never use pure black #000000 or pure white #ffffff. Use near-blacks and off-whites.

### Backgrounds and Visual Details

Create atmosphere and depth rather than defaulting to solid colours. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors and grain overlays. A strong background treatment can define the entire personality of a page.

**Match implementation complexity to the aesthetic vision.** Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography and subtle details. Elegance comes from executing the vision well, not from adding more.

NEVER use generic AI-generated aesthetics: overused font families, cliched colour schemes (particularly purple gradients on white backgrounds), predictable layouts and cookie-cutter design that lacks context-specific character. Interpret creatively and make unexpected choices that feel genuinely designed for the context.

The AI building this interface is capable of extraordinary creative work. Do not hold back. Show what can truly be created when thinking outside the box and committing fully to a distinctive vision. Half-committed aesthetics look worse than no aesthetics at all.

---

## Step 2A: Curated Design Palettes

Instead of improvising colours and fonts for each project, pick one of these complete palettes and apply it everywhere. Each palette is tied to an aesthetic direction from the Gate 1 options. The AI presents the matching palette during Gates 4 and 5.

### Palette 1: Midnight Luxe (Dark Editorial)

For premium fintech, Web3, creative agencies, luxury products.

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

:root {
  --font-display: 'DM Serif Display', serif;
  --font-body: 'DM Sans', sans-serif;

  --bg-primary:     #0a0a0f;
  --bg-secondary:   #111118;
  --bg-surface:     #1a1a24;
  --bg-elevated:    #22222e;
  --accent:         #d4a853;
  --accent-hover:   #e0be78;
  --accent-glow:    rgba(212, 168, 83, 0.15);
  --text-primary:   #f0efe8;
  --text-secondary: #a3a098;
  --text-muted:     #525050;
  --border-subtle:  rgba(255, 255, 255, 0.05);
  --border-default: rgba(255, 255, 255, 0.09);
  --success:        #22c55e;
  --error:          #ef4444;

  --radius-sm: 6px;  --radius-md: 10px;  --radius-lg: 16px;
  --radius-xl: 24px; --radius-2xl: 40px;
  --shadow-sm:  0 2px 8px rgba(0,0,0,0.3);
  --shadow-md:  0 8px 24px rgba(0,0,0,0.4);
  --shadow-lg:  0 20px 60px rgba(0,0,0,0.5);
  --duration-fast: 150ms; --duration-normal: 300ms; --duration-slow: 600ms;
}
```

### Palette 2: Arctic Glass (Light Glassmorphism)

For SaaS products, DeFi dashboards, modern product pages.

```css
@import url('https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --font-display: 'Satoshi', sans-serif;
  --font-body: 'Inter', sans-serif;

  --bg-primary:     #f0f0f0;
  --bg-secondary:   #e8e8e8;
  --bg-surface:     rgba(255, 255, 255, 0.6);
  --bg-elevated:    rgba(255, 255, 255, 0.8);
  --accent:         rgba(30, 50, 90, 0.85);
  --accent-hover:   rgba(30, 50, 90, 1);
  --accent-glow:    rgba(30, 50, 90, 0.1);
  --text-primary:   #1e1e2e;
  --text-secondary: #5e6470;
  --text-muted:     rgba(30, 50, 90, 0.4);
  --border-subtle:  rgba(255, 255, 255, 0.2);
  --border-default: rgba(255, 255, 255, 0.4);
  --success:        #16a34a;
  --error:          #dc2626;

  --radius-sm: 8px;  --radius-md: 12px;  --radius-lg: 20px;
  --radius-xl: 32px; --radius-2xl: 48px;
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.06);
  --shadow-md:  0 4px 16px rgba(0,0,0,0.08);
  --shadow-lg:  0 12px 40px rgba(0,0,0,0.1);
  --duration-fast: 150ms; --duration-normal: 300ms; --duration-slow: 600ms;
}
```

### Palette 3: Ember Studio (Dark Creative Agency)

For creative agencies, studios, portfolios, bold brands.

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

:root {
  --font-display: 'Playfair Display', serif;
  --font-body: 'Outfit', sans-serif;

  --bg-primary:     #0c0c0c;
  --bg-secondary:   #141414;
  --bg-surface:     #1c1c1c;
  --bg-elevated:    #242424;
  --accent:         #f4845f;
  --accent-hover:   #f79b7f;
  --accent-glow:    rgba(244, 132, 95, 0.15);
  --text-primary:   #f5f0eb;
  --text-secondary: #b0a99e;
  --text-muted:     #5a5550;
  --border-subtle:  rgba(255, 255, 255, 0.04);
  --border-default: rgba(255, 255, 255, 0.08);
  --success:        #4ade80;
  --error:          #f87171;

  --radius-sm: 4px;  --radius-md: 8px;   --radius-lg: 16px;
  --radius-xl: 24px; --radius-2xl: 40px;
  --shadow-sm:  0 2px 8px rgba(0,0,0,0.4);
  --shadow-md:  0 8px 32px rgba(0,0,0,0.5);
  --shadow-lg:  0 24px 64px rgba(0,0,0,0.6);
  --duration-fast: 120ms; --duration-normal: 250ms; --duration-slow: 500ms;
}
```

### Palette 4: Forest Minimal (Warm Organic)

For wellness, lifestyle, community products, sustainability brands.

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap');

:root {
  --font-display: 'Instrument Serif', serif;
  --font-body: 'Barlow', sans-serif;

  --bg-primary:     #faf8f4;
  --bg-secondary:   #f1efe8;
  --bg-surface:     #ffffff;
  --bg-elevated:    #ffffff;
  --accent:         #1c2e1e;
  --accent-hover:   #2a4530;
  --accent-glow:    rgba(28, 46, 30, 0.08);
  --text-primary:   #1c2e1e;
  --text-secondary: #5a635a;
  --text-muted:     #738273;
  --border-subtle:  #f1f3f1;
  --border-default: #e0e4e0;
  --success:        #16a34a;
  --error:          #dc2626;

  --radius-sm: 8px;  --radius-md: 12px;  --radius-lg: 20px;
  --radius-xl: 28px; --radius-2xl: 9999px;
  --shadow-sm:  0 1px 2px rgba(28,46,30,0.04);
  --shadow-md:  0 4px 12px rgba(28,46,30,0.06);
  --shadow-lg:  0 12px 32px rgba(28,46,30,0.08);
  --duration-fast: 150ms; --duration-normal: 350ms; --duration-slow: 700ms;
}
```

### Palette 5: Neon Terminal (Retro-Futuristic)

For gaming, crypto, entertainment, developer-facing products with personality.

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --font-display: 'Space Mono', monospace;
  --font-body: 'Inter', sans-serif;

  --bg-primary:     #0a0a0a;
  --bg-secondary:   #0f0f0f;
  --bg-surface:     #151515;
  --bg-elevated:    #1a1a1a;
  --accent:         #00f0ff;
  --accent-hover:   #33f5ff;
  --accent-glow:    rgba(0, 240, 255, 0.12);
  --text-primary:   #e0e0e0;
  --text-secondary: #8a8a8a;
  --text-muted:     #4a4a4a;
  --border-subtle:  rgba(0, 240, 255, 0.06);
  --border-default: rgba(0, 240, 255, 0.12);
  --success:        #00ff88;
  --error:          #ff3366;

  --radius-sm: 2px;  --radius-md: 4px;   --radius-lg: 8px;
  --radius-xl: 12px; --radius-2xl: 16px;
  --shadow-sm:  0 0 8px rgba(0,240,255,0.05);
  --shadow-md:  0 0 20px rgba(0,240,255,0.08);
  --shadow-lg:  0 0 40px rgba(0,240,255,0.12);
  --duration-fast: 100ms; --duration-normal: 200ms; --duration-slow: 400ms;
}
```

### Palette 6: Rose Atelier (Luxury/Fashion)

For luxury brands, fashion, beauty, high-end lifestyle.

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Libre+Franklin:wght@300;400;500;600&display=swap');

:root {
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Libre Franklin', sans-serif;

  --bg-primary:     #faf5f2;
  --bg-secondary:   #f2ece8;
  --bg-surface:     #ffffff;
  --bg-elevated:    #ffffff;
  --accent:         #c4858a;
  --accent-hover:   #d49a9e;
  --accent-glow:    rgba(196, 133, 138, 0.1);
  --text-primary:   #2a2024;
  --text-secondary: #6b5a60;
  --text-muted:     #9a8a90;
  --border-subtle:  rgba(42, 32, 36, 0.04);
  --border-default: rgba(42, 32, 36, 0.08);
  --success:        #6b8f71;
  --error:          #c45858;

  --radius-sm: 4px;  --radius-md: 8px;   --radius-lg: 16px;
  --radius-xl: 24px; --radius-2xl: 40px;
  --shadow-sm:  0 1px 3px rgba(42,32,36,0.04);
  --shadow-md:  0 4px 16px rgba(42,32,36,0.06);
  --shadow-lg:  0 16px 48px rgba(42,32,36,0.08);
  --duration-fast: 150ms; --duration-normal: 350ms; --duration-slow: 700ms;
}
```

---

## Step 2B: Navigation Layout Rules

The default AI nav pattern (logo far left, three links centred, action button far right) is BANNED. It is the most recognised AI-generated layout pattern and immediately signals low effort to anyone who has seen enough sites. Never produce this structure by default.

Before writing any nav explicitly choose one of the following approaches or invent a new one that fits the aesthetic:

- **Ghost nav over full-bleed hero**: nav floats transparently over a full-bleed image or SVG scene. Logo and one action button only, no centred links. Copy and CTAs live inside the hero itself
- **Top editorial strip**: a newspaper-style horizontal bar. Issue number or date on the left, a scrolling ticker in the centre, a connect or action button flush right. No traditional nav at all
- **Sidebar nav**: navigation lives in a fixed left or right column. The main content fills the remaining width. Works well for dashboards and editorial layouts
- **Footer-only nav**: no top nav at all. All navigation links live in the footer. The hero and sections carry the full visual weight
- **Integrated section nav**: nav labels are woven into section headers or page margins, not a fixed bar. Works for scroll-driven editorial pages
- **Minimal two-item top bar**: brand name on the left, single action (connect, sign up, enter) on the right. No middle links. Anything that needs navigation goes in a hamburger or slide-out panel
- **Full-screen overlay menu**: a minimal top strip with a menu trigger. Clicking it opens a full-screen overlay with large typographic links. Common in luxury and editorial sites
- **Announcement strip + minimal nav**: a top announcement bar with a promotion or status message, then a very minimal nav below it with no more than two links visible

If the user does not specify a nav style pick whichever of these best suits the aesthetic direction chosen. Never default to the banned pattern. If genuinely uncertain ask the user before building.

---

## Step 2C: Animated Background Rules (Ask Before Assuming)

Before building any background animation determine whether the user wants one and what kind. If the brief does not specify ask explicitly with these options:

- **Clearly visible movement**: particles, flowing waves, morphing gradients, aurora pulses, orbiting elements. Should be impossible to miss on first glance
- **Subtle ambient animation**: slow breathing gradients, barely-moving grain, faint parallax. Feels alive but does not distract
- **Static but strong**: no animation at all. Instead achieve depth and atmosphere through layered textures, geometric patterns, halftone effects, strong colour blocking or grain overlays. Can be more visually striking than animation when executed well

If a canvas particle system is used particles and connection lines must be clearly visible against the background. Faint dots that read as static noise are a failure state. Either make them visible or remove them. For SVG animations animate attributes that produce obvious movement: morphing paths, orbiting elements, pulsing sizes, colour transitions. Subtle rotation alone is not enough.

When an animated SVG scene is used as a hero background it replaces any separate canvas animation. Do not layer both unless the effect specifically requires it.

---

## Step 2D: Hard Gate Decision System (Mandatory Before Code)

Before writing any code the AI must walk the user through every gate below. Each gate requires the AI to present options, state a recommendation and then STOP AND WAIT for the user to confirm or choose differently. Do not proceed to the next gate until the current one is answered. Do not internalise these decisions. Ask them out loud.

### GATE 1: Aesthetic Direction

Present these options (or let the user describe their own):

1. **Dark editorial**: deep backgrounds, serif display type, sharp contrast, gold or warm accents. For premium fintech, Web3, creative agencies
2. **Light glassmorphism**: off-white backgrounds, rounded containers, muted text, frosted glass effects. For SaaS, DeFi, modern product pages
3. **Bold brutalist**: heavy weight typography, stark contrast, flat colour blocks, raw edges. For disruptive brands, developer tools
4. **Warm organic**: earth tones, rounded everything, soft shadows, generous spacing. For wellness, community, lifestyle products
5. **Retro-futuristic**: neon accents, monospace type, CRT glow, scanline textures. For gaming, crypto, entertainment
6. **Cinematic motion**: full-screen video backgrounds, liquid glass UI, dramatic serif typography. For premium launches, portfolios, Web3, creative projects

State which one you recommend based on the project context. STOP AND WAIT for the user to confirm.

### GATE 2: Navigation Layout

Present the approved nav patterns from Step 2B. Recommend one based on the aesthetic chosen in Gate 1. For cinematic motion aesthetic recommend "ghost nav over full-bleed hero" or "minimal two-item top bar". STOP AND WAIT.

### GATE 3: Background Treatment

Present these three options:

1. **Animated video background** (cinematic, premium. Requires the video asset workflow in Step 12. Recommended for marketing pages and landing pages)
2. **Coded animated background** (Waves, GrainGradient, orbs. Lightweight, no external assets needed. Use as fallback if video is not feasible)
3. **Static but atmospheric** (textures, gradients, grain overlays. No animation. Recommended for dashboards and app interfaces)

For marketing pages and landing pages explicitly recommend option 1. For dashboards and internal tools recommend option 3. STOP AND WAIT.

### GATE 4: Font Pairing

Based on the aesthetic chosen in Gate 1 present 2-3 specific font pairings from the Curated Design Palettes section below. Include the Google Fonts import URL for each option. STOP AND WAIT.

### GATE 5: Colour Palette

Present the matching curated palette from the Curated Design Palettes section. Show the user the exact CSS variable block. STOP AND WAIT.

### GATE 6: Hero Structure

Based on all previous decisions propose the hero layout and content hierarchy. Reference the closest Golden Reference Composition as a quality benchmark (e.g. "I will follow the Cinematic Video Hero reference for quality level"). STOP AND WAIT.

### GATE 7: Page Sections

Propose the full section order for the page using the appropriate layout from Step 6 (standard or cinematic). STOP AND WAIT.

**Combining gates:** Gates 4 and 5 may be combined if they logically belong to the same palette choice. Gates 6 and 7 may be combined if the user seems decisive. But gates 1, 2 and 3 must ALWAYS be asked separately. The minimum number of stops is 4 (gates 1, 2, 3, then combined 4-7).

After all gates pass write: **"All design decisions confirmed. Beginning implementation."** Only then may code be written.

---

## Step 3: Motion Graphics and Animation

Motion is the difference between an interface that feels alive and one that feels static. Every animation must have a reason: to direct attention, confirm an action, reveal content or express the product's personality.

**Important**: The patterns below are reference implementations, not rules. Use them when they fit the page. Marketing and landing pages benefit from hero entrances and scroll reveal. Dashboard pages do not need them. Each page decides which animations to use based on context.

### Core Principles

- Purposeful: every animation serves the user not the designer
- Proportional: small interactions get small animations, major transitions get expressive ones
- Consistent: the same type of action always animates the same way across the whole app
- Fast: 150-300ms for micro-interactions, 300-500ms for page-level transitions

### Page Load Sequence (Hero Entrance)

Use pure CSS animations for the hero section. This starts instantly on paint with no JS delay. Use `animation-fill-mode: both` so elements are hidden during their delay and visible after completion.

```css
@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Staggered entrance for hero elements */
.hero-animate {
  opacity: 0;
  animation: heroFadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
.hero-animate:nth-child(1) { animation-delay: 0ms; }
.hero-animate:nth-child(2) { animation-delay: 80ms; }
.hero-animate:nth-child(3) { animation-delay: 160ms; }

/* Hero headline words stagger individually */
.hero-word {
  display: inline-block;
  opacity: 0;
  animation: heroFadeUp 400ms cubic-bezier(0.16, 1, 0.3, 1) both;
  /* Each word gets an inline animation-delay: 150 + (index * 50)ms */
}
```

For elements that need custom delays (subhead, CTA, review card), set `animation-delay` via inline style rather than nth-child.

### Scroll-Triggered Animations (Below-Fold Sections)

"Scroll reveal" is the **trigger mechanism** (IntersectionObserver fires when an element enters the viewport). The **animation effect** is a separate choice. Pick the effect that fits the content.

**Available animation effects:**

| Effect | CSS Property | Best for |
|--------|-------------|----------|
| Fade up | `opacity` + `translateY` | General sections, text blocks |
| Fade in | `opacity` only | Images, cards, subtle reveals |
| Slide left | `translateX(-40px)` to `0` | Left-aligned content, timelines |
| Slide right | `translateX(40px)` to `0` | Right-aligned content, alternating rows |
| Scale up | `scale(0.9)` to `scale(1)` | Hero images, feature previews |
| Blur in | `blur(8px)` to `blur(0)` + `opacity` | Background images, decorative elements |
| Flip in | `rotateX(15deg)` to `rotateX(0)` | Cards, pricing panels |

**Implementation approach:**

Elements are **visible by default** in CSS so client-side back navigation never shows blank sections. JavaScript adds a hidden class to elements below the viewport on mount, then IntersectionObserver reveals them.

```css
/* Base: visible by default, no hidden state */
.scroll-reveal {}

/* JS adds this to elements below the fold */
.scroll-reveal.scroll-hidden {
  opacity: 0;
  transform: translateY(28px); /* or translateX, scale, etc. */
  transition: opacity 650ms ease-out, transform 650ms ease-out;
}

/* Observer adds this when element enters viewport */
.scroll-reveal.scroll-hidden.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

You can create variations for different effects:

```css
/* Slide from left */
.scroll-reveal-left.scroll-hidden {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 650ms ease-out, transform 650ms ease-out;
}
.scroll-reveal-left.scroll-hidden.revealed {
  opacity: 1;
  transform: translateX(0);
}

/* Scale up */
.scroll-reveal-scale.scroll-hidden {
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 500ms ease-out, transform 500ms ease-out;
}
.scroll-reveal-scale.scroll-hidden.revealed {
  opacity: 1;
  transform: scale(1);
}

/* Blur in */
.scroll-reveal-blur.scroll-hidden {
  opacity: 0;
  filter: blur(8px);
  transition: opacity 600ms ease-out, filter 600ms ease-out;
}
.scroll-reveal-blur.scroll-hidden.revealed {
  opacity: 1;
  filter: blur(0);
}
```

```typescript
// hooks/useScrollReveal.ts
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          entry.isIntersecting
            ? entry.target.classList.add("revealed")
            : entry.target.classList.remove("revealed")
        }),
        { threshold }
      )

      // Works with any scroll-reveal variant class
      const selectors = ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-scale, .scroll-reveal-blur"
      document.querySelectorAll(selectors).forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top >= window.innerHeight * 0.85) {
          el.classList.add("scroll-hidden")
        }
        observer.observe(el)
      })
    })

    return () => cancelAnimationFrame(frameId)
  }, [])

  return ref
}
```

Key design decision: elements start visible so if JS fails or the user navigates back, content is always readable. The animation is an enhancement, not a requirement.

### Tailwind Animation Config

Add to tailwind.config.js under extend:

```javascript
animation: {
  'fade-up':    'fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  'fade-in':    'fadeIn 0.4s ease forwards',
  'scale-in':   'scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
  'shimmer':    'shimmer 1.8s linear infinite',
  'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
  'float':      'float 4s ease-in-out infinite',
  'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
},
keyframes: {
  fadeUp:    { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
  fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
  scaleIn:   { from: { opacity: '0', transform: 'scale(0.92)' }, to: { opacity: '1', transform: 'scale(1)' } },
  shimmer:   { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
  pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
  float:     { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
  glowPulse: { '0%, 100%': { boxShadow: '0 0 20px rgba(245,158,11,0.2)' }, '50%': { boxShadow: '0 0 40px rgba(245,158,11,0.5)' } },
},
```

### Motion Graphics Patterns

These are higher-level visual effects for hero sections, backgrounds and loading states.

Ambient background glow:
```tsx
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-[700px] h-[500px] rounded-full
    bg-amber-500/10 blur-[140px] animate-pulse-soft" />
  <div className="absolute bottom-0 right-1/4
    w-[400px] h-[300px] rounded-full
    bg-amber-600/5 blur-[100px] animate-float" />
</div>
```

Noise grain texture:
```tsx
<div
  className="absolute inset-0 opacity-[0.035] pointer-events-none z-10"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
    backgroundSize: '128px 128px',
  }}
/>
```

Counter animation hook:
```typescript
// hooks/useCountUp.ts
import { useEffect, useState } from 'react'

export function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const steps = 60
    const increment = target / steps
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, interval)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}
```

Video card hover lift:
```css
.video-card {
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 200ms ease, border-color 200ms ease;
}
.video-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1);
}
```

Progress morphing button:
```tsx
<button
  className={`relative overflow-hidden h-12 rounded-xl font-semibold
    transition-all duration-500 w-full
    ${generating
      ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400 cursor-not-allowed'
      : 'bg-amber-500 text-black hover:bg-amber-400'
    }`}
>
  {generating ? (
    <>
      <div className="absolute left-0 top-0 h-full bg-amber-500/30 transition-all duration-[3000ms]"
        style={{ width: `${progress}%` }} />
      <span className="relative z-10">Generating... {progress}%</span>
    </>
  ) : 'Generate Video'}
</button>
```

---

## Step 3B: Animated & Cinematic Backgrounds

Animated backgrounds transform a static page into an immersive, premium experience. They are the defining feature of high-end marketing sites, creative portfolios, and product launch pages. This section covers when to use them, available techniques, and production-ready implementation for each.

### Blueprint Decision Framework

The user's explicit instruction always overrides blueprint scanning. Follow this priority chain:

1. **User explicitly states** whether to use animated or static backgrounds → follow their call, no pushback, no second-guessing
2. **User provides a specific image or video** to use as the background → use that asset. If the user also describes how they want it animated (rotation, fade, drift, particle effects, zoom, etc.), follow those animation directions exactly
3. **User says animated but provides no assets** → select or generate appropriate assets based on the project theme and blueprint context
4. **User says nothing about backgrounds** → scan `blueprint.md` and specification files, then decide autonomously using the criteria below

**Mandatory preview approval:** Before integrating any animated video background into the website design, always present the animated video to the user for review and confirmation first. Do not design around or build the page with an animated background until the user has seen the video sample and approved it. If rejected, iterate on the animation or source a new one before proceeding.

**Use animated backgrounds when the blueprint describes:**

- Premium or luxury brands (fashion, jewelry, high-end services)
- Creative agencies, studios, or portfolios (3D, design, film, photography)
- Web3, crypto, NFT, or blockchain projects
- Space, science, or futuristic technology themes
- AI/ML products conveying cutting-edge innovation
- Entertainment, gaming, or immersive experience products
- Product launches, pre-launch hype pages, or waitlist pages
- Event, conference, or festival sites

**Use static backgrounds when the blueprint describes:**

- SaaS dashboards, admin panels, or internal tools
- Documentation or developer-facing tools
- E-commerce catalogs where product images must dominate
- Content-heavy blogs, news, or knowledge bases
- Healthcare, legal, or financial compliance products
- B2B enterprise software focused on utility

A single project can mix both: animated hero on the landing page, static backgrounds inside the app. When in doubt, lean animated for marketing pages and static for application interfaces.


### Background Type Selection

| Project Type | Primary Background | Fallback |
|---|---|---|
| Creative portfolio / agency | Full-screen looping video | Animated gradient mesh |
| Web3 / NFT / crypto | Looping video or WebGL particles | Dark gradient with grain |
| AI / tech SaaS landing | Looping video or gradient animation | Ambient glow blobs |
| Luxury / fashion brand | Slow cinematic video loop | Large hero image with parallax |
| Product launch / hype page | Full-screen video with overlay | Animated gradient + particles |
| Developer tools / docs | None (static dark background) | Subtle grain texture only |
| Dashboard / app interface | None (solid color system) | None |

### Technique 1: Full-Screen Looping Video Background

The most impactful animated background technique. A short 5-15 second video loops seamlessly behind the hero content. This is the approach used by MotionSites, Higgsfield/Seedance, and premium agency sites.

**Asset creation workflow:**

1. Generate or source a high-quality still image matching the project theme (use AI image generation, Midjourney, or curated stock)
2. Animate the still using an AI video tool (Seedance 2.0 via Higgsfield, Nano Banana, Runway, Pika, or Kling) to create a 5-10 second loop with subtle motion: camera drift, particle flow, light shifts, atmospheric effects
3. Export as MP4 (H.264, 1080p or 4K, under 10MB for web performance)
4. Host on a CDN (CloudFront, Vercel Blob, Cloudflare R2)
5. Implement with the pattern below

**Basic video background:**

```html
<div class="hero-video-wrap">
  <video autoplay loop muted playsinline preload="auto" class="hero-video">
    <source src="/videos/hero-bg.mp4" type="video/mp4" />
  </video>
  <div class="hero-content">
    <!-- Content layered above the video -->
  </div>
</div>
```

```css
.hero-video-wrap {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: var(--bg-primary);
}
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.hero-content {
  position: relative;
  z-index: 10;
}
```

**Advanced: Custom JS crossfade for seamless loops.**

For videos that do not loop perfectly, use a requestAnimationFrame-based fade system instead of CSS transitions. This prevents the visible jump at the loop point.

```typescript
// hooks/useFadingVideo.ts
import { useEffect, useRef } from 'react'

export function useFadingVideo(videoRef: React.RefObject<HTMLVideoElement>) {
  const rafIdRef = useRef<number>(0)
  const fadingOutRef = useRef(false)
  const FADE_MS = 500
  const FADE_OUT_LEAD = 0.55

  function fadeTo(video: HTMLVideoElement, target: number, duration: number) {
    cancelAnimationFrame(rafIdRef.current)
    const start = parseFloat(video.style.opacity || '0')
    const startTime = performance.now()
    function step(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      video.style.opacity = String(start + (target - start) * progress)
      if (progress < 1) rafIdRef.current = requestAnimationFrame(step)
    }
    rafIdRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onLoaded = () => { video.style.opacity = '0'; video.play(); fadeTo(video, 1, FADE_MS) }
    const onTimeUpdate = () => {
      if (!fadingOutRef.current && video.duration - video.currentTime <= FADE_OUT_LEAD && video.duration - video.currentTime > 0) {
        fadingOutRef.current = true
        fadeTo(video, 0, FADE_MS)
      }
    }
    const onEnded = () => {
      video.style.opacity = '0'
      setTimeout(() => { video.currentTime = 0; video.play(); fadingOutRef.current = false; fadeTo(video, 1, FADE_MS) }, 100)
    }
    video.addEventListener('loadeddata', onLoaded)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)
    return () => { cancelAnimationFrame(rafIdRef.current); video.removeEventListener('loadeddata', onLoaded); video.removeEventListener('timeupdate', onTimeUpdate); video.removeEventListener('ended', onEnded) }
  }, [videoRef])
}
```

Remove the `loop` attribute from the video element when using crossfade — the manual `ended` handler manages looping.

**HLS streaming for large videos:**

```typescript
import Hls from 'hls.js'
import { useEffect, useRef } from 'react'

export function useHlsVideo(src: string) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false })
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play())
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src; video.play()
    }
  }, [src])
  return videoRef
}
```

**Cursor-controlled video scrubbing (interactive, non-autoplay):**

Instead of autoplaying a background video, the video scrubs forward and backward based on horizontal mouse movement. This creates a deeply interactive experience where the user controls the visual with their cursor. The video does NOT autoplay. Use this for hero sections where the video content is a focal character or object (holographic avatars, product reveals, 3D objects) rather than ambient atmosphere.

```typescript
// hooks/useVideoScrub.ts
import { useEffect, useRef } from 'react'

const SENSITIVITY = 0.8

export function useVideoScrub(videoRef: React.RefObject<HTMLVideoElement>) {
  const prevXRef = useRef<number | null>(null)
  const targetTimeRef = useRef(0)
  const seekingRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Pause the video — scrubbing controls playback, not autoplay
    video.pause()

    function onMouseMove(e: MouseEvent) {
      if (!video) return
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX
        return
      }
      const delta = e.clientX - prevXRef.current
      prevXRef.current = e.clientX

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration
      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + timeOffset))

      if (!seekingRef.current) {
        seekingRef.current = true
        video.currentTime = targetTimeRef.current
      }
    }

    function onSeeked() {
      // If targetTime moved while we were seeking, seek again
      if (Math.abs(video!.currentTime - targetTimeRef.current) > 0.01) {
        video!.currentTime = targetTimeRef.current
      } else {
        seekingRef.current = false
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    video.addEventListener('seeked', onSeeked)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [videoRef])
}
```

Usage with the scrubbing hook:

```tsx
const videoRef = useRef<HTMLVideoElement>(null)
useVideoScrub(videoRef)

<video
  ref={videoRef}
  muted
  playsInline
  preload="auto"
  className="absolute inset-0 w-full h-full object-cover z-0"
>
  <source src="/hero-character.mp4" type="video/mp4" />
</video>
```

The video must NOT have `autoPlay` or `loop` attributes when using scrubbing. The `onSeeked` handler prevents seek-flooding by queuing the next seek only after the previous one completes.

### Technique 2: Liquid Glass Design System

Liquid glass (glassmorphism) is the dominant UI pattern for content layered over video backgrounds. It provides readable contrast without opaque overlays that kill the cinematic feel.

```css
/* Standard: subtle glass for navbars, chips, cards over video */
.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Strong: heavier blur for primary CTAs and stat cards */
.liquid-glass-strong {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  border: none;
  box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15);
  position: relative;
  overflow: hidden;
}
.liquid-glass-strong::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.5) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Dark: for dark-on-dark contexts like dark navbars over dark video */
.liquid-glass-dark {
  background: rgba(0, 0, 0, 0.4);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass-dark::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.3) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

Use liquid glass for: navigation bars, floating cards, input containers, tag chips, CTAs layered over video or image backgrounds. The `::before` pseudo-element creates a subtle border that catches light without a flat `border` property.

### Technique 3: Framer Motion Cinematic Entrances

For React projects, Framer Motion provides production-grade entrance animations that pair with video backgrounds. Use these for content appearing over the cinematic background.

**FadeIn wrapper:**

```tsx
import { motion } from 'framer-motion'

export function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '' }: {
  children: React.ReactNode; delay?: number; duration?: number; x?: number; y?: number; className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**BlurText word-by-word headline reveal:**

```tsx
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function BlurText({ text, className = '' }: { text: string; className?: string }) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.1em' }}>
      {text.split(' ').map((word, i) => (
        <motion.span key={i} initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={inView ? [{ filter: 'blur(5px)', opacity: 0.5, y: -5 }, { filter: 'blur(0px)', opacity: 1, y: 0 }] : {}}
          transition={{ duration: 0.7, times: [0, 0.5, 1], ease: 'easeOut', delay: (i * 100) / 1000 }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >{word}</motion.span>
      ))}
    </p>
  )
}
```

**AnimatedText character-by-character scroll reveal:**

```tsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function AnimatedText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  return (
    <p ref={ref} className={className} style={{ position: 'relative' }}>
      {text.split('').map((char, i) => {
        const start = i / text.length
        const end = start + 1 / text.length
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])
        return (
          <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ visibility: 'hidden' }}>{char === ' ' ? '\u00A0' : char}</span>
            <motion.span style={{ opacity, position: 'absolute', left: 0, top: 0 }}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        )
      })}
    </p>
  )
}
```

**Magnetic hover effect:**

```tsx
import { useRef, useState, useCallback } from 'react'

export function Magnet({ children, padding = 100, strength = 3, className = '' }: {
  children: React.ReactNode; padding?: number; strength?: number; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)
  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < Math.max(rect.width, rect.height) / 2 + padding) {
      setActive(true); setPos({ x: dx / strength, y: dy / strength })
    } else { setActive(false); setPos({ x: 0, y: 0 }) }
  }, [padding, strength])
  return (
    <div ref={ref} className={className} onMouseMove={handleMove}
      onMouseLeave={() => { setActive(false); setPos({ x: 0, y: 0 }) }}
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out', willChange: 'transform' }}>
      {children}
    </div>
  )
}
```

### Technique 4: Scroll-Driven Parallax Marquee

Horizontal image rows that scroll based on page scroll position. Used for showcasing work samples or portfolio pieces between hero and content sections.

```tsx
import { useEffect, useRef, useState } from 'react'

export function ParallaxMarquee({ images, direction = 'right' }: { images: string[]; direction?: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      setOffset((window.scrollY - ref.current.offsetTop + window.innerHeight) * 0.3)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const tripled = [...images, ...images, ...images]
  const tx = direction === 'right' ? `translateX(${offset - 200}px)` : `translateX(${-(offset - 200)}px)`
  return (
    <div ref={ref} className="overflow-hidden">
      <div className="flex gap-3" style={{ transform: tx, willChange: 'transform' }}>
        {tripled.map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0" />
        ))}
      </div>
    </div>
  )
}
```

### Technique 5: Sticky Card Stacking on Scroll

Cards that scale down and stack as you scroll through them, creating a cinematic project showcase effect.

```tsx
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export function StackingCard({ index, total, children }: { index: number; total: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])
  return (
    <div ref={ref} className="h-[85vh]">
      <motion.div style={{ scale, top: `${index * 28}px` }}
        className="sticky top-24 md:top-32 rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8">
        {children}
      </motion.div>
    </div>
  )
}
```

### Technique 6: CSS-Only Animated Backgrounds (No Video)

For projects where video is overkill but static backgrounds are too flat. These load instantly with zero external assets.

**Animated gradient mesh:**

```css
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.gradient-bg {
  background: linear-gradient(-45deg, #0a0a0a, #1a0a2e, #0a1628, #0a0a0a);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}
```

**Floating orb particles (CSS only):**

```css
@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: orbFloat 20s ease-in-out infinite;
  pointer-events: none;
}
.orb-1 { width: 600px; height: 600px; background: #6366f1; top: 10%; left: 20%; }
.orb-2 { width: 400px; height: 400px; background: #f59e0b; bottom: 20%; right: 15%; animation-delay: -7s; }
.orb-3 { width: 500px; height: 500px; background: #06b6d4; top: 50%; left: 60%; animation-delay: -13s; }
```

### Technique 7: Texture Overlays

Texture overlays add physical depth to video and gradient backgrounds without affecting readability.

**Noise grain (inline SVG, no external file):**

```tsx
<div className="fixed inset-0 pointer-events-none z-50 opacity-[0.035]"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    backgroundSize: '128px 128px',
  }}
/>
```

**Image texture overlay (for film grain or paper effects):**

```css
.texture-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  background-image: url('/textures/grain.png');
  background-size: cover;
  mix-blend-mode: lighten;
  opacity: 0.6;
}
```

### Cinematic Typography for Animated Hero Sections

When using animated backgrounds, standard body fonts are not enough. Pair a dramatic display font with cinematic sizing.

**Recommended cinematic font pairings:**

| Style | Display Font | Body Font |
|---|---|---|
| Elegant editorial | Instrument Serif (italic) | Inter or Barlow |
| Bold industrial | Anton | System monospace |
| Luxurious minimal | Playfair Display | DM Sans |
| Tech futuristic | Space Grotesk | JetBrains Mono |
| Artistic brush | Condiment (cursive accent only) | Inter |

**Cinematic headline sizing (use clamp for fluid scaling):**

```css
.cinematic-h1 {
  font-size: clamp(2.5rem, 8vw, 6rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  font-weight: 900;
  text-transform: uppercase;
}
```

**Gradient text effect (common on dark cinematic backgrounds):**

```css
.gradient-text {
  background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Video Background Overlay Strategies

Choose the right overlay strategy based on content readability needs:

| Strategy | When to Use | Implementation |
|---|---|---|
| No overlay | Video is dark enough, text is large and bold | Raw video, liquid glass on UI elements only |
| Subtle gradient from edge | Content is on one side of the viewport | `linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 60%)` |
| Bottom gradient | Content sits at the bottom of the hero | `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)` |
| Full dark overlay | Busy video, lots of small text | `background: rgba(0,0,0,0.4)` on overlay div |
| Video opacity reduction | Moderate dimming needed | `opacity: 0.6` on the video element |

Never use all of these at once. Pick one strategy per section and commit to it.

### Performance Rules for Animated Backgrounds

- Video files must be under 10MB for direct MP4 loading. Use HLS streaming for anything larger.
- Always include `preload="auto"` on hero videos and `preload="none"` on below-fold videos.
- Use `will-change: transform` on elements that animate via scroll, but remove it after animation completes.
- Parallax marquees and scroll listeners must use `{ passive: true }`.
- Lazy load all images and below-fold videos with `loading="lazy"`.
- Provide a solid background-color fallback matching the video's dominant color so the page is styled before the video loads.
- Test on mobile — disable autoplay videos on connections slower than 4G using `navigator.connection.effectiveType` when available.

---

## Step 3C: Golden Reference Compositions (MANDATORY QUALITY BAR)

These are complete specifications showing what a premium hero section looks like when every technique from this skill file is composed together. They are NOT templates to copy verbatim. They are the **minimum quality standard** that every project must meet. If your output does not match this level of specificity and polish, it is not ready to present. Study the patterns: the z-index layering, the entrance stagger timing, the component hierarchy, the exact CSS values. Every interface you build, whether a landing page, a dashboard, or a spec file, must demonstrate the same precision shown here.

### Reference 1: Cinematic Video Hero (Dark, Full-Viewport)

Suits: creative agencies, space/travel brands, Web3 launches, premium portfolios. Uses Palette 1 (Midnight Luxe) or Palette 3 (Ember Studio).

**Structure and z-index stacking:**

```
z-0:  Full-viewport <video> background (absolute inset-0, object-cover)
z-2:  Giant ghost text (decorative, pointer-events-none)
z-3:  Noise grain overlay (fixed, pointer-events-none, opacity 0.04)
z-10: Content layer (relative, all hero content)
z-50: Navbar (fixed top)
```

**Video background:**

```tsx
<div className="relative w-full h-screen overflow-hidden bg-[#0a0a0f]">
  {/* Video: no loop attr when using crossfade, use useFadingVideo hook */}
  <video
    ref={videoRef}
    autoPlay muted playsInline preload="auto"
    className="absolute inset-0 w-full h-full object-cover z-0"
    style={{ width: '120%', height: '120%', left: '50%', transform: 'translateX(-50%)' }}
  >
    <source src="VIDEO_URL_HERE" type="video/mp4" />
  </video>

  {/* Noise grain overlay */}
  <div className="absolute inset-0 pointer-events-none z-[3]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
      backgroundSize: '200px 200px', opacity: 0.4
    }}
  />

  {/* No dark overlay. Contrast comes from liquid-glass chrome. */}
</div>
```

**Navbar (liquid-glass pill, fixed top):**

```tsx
<nav className="fixed top-4 inset-x-0 z-50 px-8 lg:px-16">
  <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
    {/* Logo: 48x48 liquid-glass circle with italic serif letter */}
    <div className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center">
      <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
        className="text-white text-lg lowercase">a</span>
    </div>
    {/* Centre: liquid-glass pill with links + CTA */}
    <div className="hidden md:flex liquid-glass rounded-full px-1.5 py-1.5 items-center">
      {['Home', 'Voyages', 'Worlds', 'Innovation', 'Plan'].map(link => (
        <a key={link} className="px-3 py-2 text-sm font-medium text-white/90
          hover:text-white transition-colors rounded-full font-body">{link}</a>
      ))}
      <button className="bg-white text-black px-4 py-2 rounded-full text-sm
        font-medium whitespace-nowrap flex items-center gap-1 ml-1">
        Claim a Spot <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
    {/* Right: spacer to balance logo */}
    <div className="w-12 h-12" />
  </div>
</nav>
```

**Hero content (centred, staggered entrance):**

Entrance animation base: `initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}` with `ease: 'easeOut'`.

```
Stagger sequence:
  Badge chip:     delay 0.4s
  Headline:       delay 0.5s (BlurText word-by-word, 100ms stagger per word)
  Subheading:     delay 0.8s
  CTA buttons:    delay 1.1s
  Stat cards:     delay 1.3s
  Partner strip:  delay 1.4s
```

**Headline (BlurText word-by-word animation):**

```tsx
<BlurText
  text="Venture Past Our Sky Across the Universe"
  className="text-6xl md:text-7xl lg:text-[5.5rem] font-display italic
    text-white leading-[0.8] max-w-2xl tracking-[-4px]"
/>
```

Each word animates: `blur(10px) opacity:0 y:50` → `blur(5px) opacity:0.5 y:-5` → `blur(0) opacity:1 y:0`. Duration 0.7s per word. Stagger: `delay = (wordIndex * 100) / 1000` seconds.

**Key details that prevent AI slop:**
- Video is 120% width/height for cinematic crop, centred with translateX(-50%)
- No dark overlay on video. Glass elements provide their own contrast
- Headline uses tight leading (0.8) and negative letter-spacing (-4px)
- Stat cards have specific dimensions (220px wide, rounded-[1.25rem])
- Partner names are in display serif italic, not body sans-serif
- Grain overlay uses exact SVG pattern, not a blurred div

---

### Reference 2: Light Glassmorphism Product Hero

Suits: SaaS products, DeFi dashboards, fintech, modern product pages. Uses Palette 2 (Arctic Glass).

**Structure:**

```
Outer page:     bg-[#f0f0f0], full viewport, flex centre, p-5
Inner section:  max-w-[1536px], h-full, rounded-[3rem], overflow-hidden
  z-0:  <video> background (absolute inset-0, object-cover)
  z-10: Content layer
    - Navbar (relative, not fixed)
    - Hero text (centred, top)
    - Bottom-left stat card (absolute)
    - Bottom-right cutout (absolute, with SVG corner masks)
```

**Outer container:**

```tsx
<div className="w-full h-screen flex items-center justify-center p-3 md:p-5 bg-[#f0f0f0]">
  <section className="relative w-full max-w-[1536px] h-full rounded-[1.5rem]
    md:rounded-[3rem] overflow-hidden flex flex-col items-center bg-white/10">
    {/* Video */}
    <video autoPlay muted loop playsInline
      className="absolute inset-0 w-full h-full object-cover object-[65%]
        lg:object-center z-0">
      <source src="VIDEO_URL_HERE" type="video/mp4" />
    </video>
    {/* Content */}
    <div className="relative z-10 w-full h-full flex flex-col items-center">
      {/* Navbar, hero text, bottom components */}
    </div>
  </section>
</div>
```

**Colour system (muted, not pure black/white):**
- Text: `text-[#5E6470]` (headline), `text-[rgba(30,50,90,0.9)]` (accents)
- Buttons: `bg-[rgba(30,50,90,0.8)]` with `text-white`
- Cards: `bg-white/30 backdrop-blur-xl`
- Badges: `bg-white/60 backdrop-blur-md border-white/20`

**Bottom-right corner cutout (the defining detail):**

This is the component that separates premium from generic. The page background (#f0f0f0) appears to wrap around the corner element using two SVG inverse-radius masks.

```tsx
<div className="absolute bottom-0 right-0 p-6 pt-8 pl-14 bg-[#f0f0f0]
  rounded-tl-[3.5rem] flex items-center gap-6">
  {/* Top SVG mask: creates inverse radius at top-right junction */}
  <div className="absolute -top-[3.5rem] right-0 w-[3.5rem] h-[3.5rem] pointer-events-none">
    <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none">
      <path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="#f0f0f0"/>
    </svg>
  </div>
  {/* Left SVG mask: creates inverse radius at bottom-left junction */}
  <div className="absolute bottom-0 -left-[3.5rem] w-[3.5rem] h-[3.5rem] pointer-events-none">
    <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none">
      <path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="#f0f0f0"/>
    </svg>
  </div>
  {/* Content: icon circle + text */}
</div>
```

**Key details that prevent AI slop:**
- The entire hero lives inside a rounded-[3rem] container with padding around it
- Video uses `object-[65%]` for custom focal point, not plain `object-center`
- Muted text colours (#5E6470, rgba(30,50,90)) not pure black or white
- The corner cutout SVG masks are the premium touch that generic AI never produces
- Badge uses `bg-white/60` (translucent), not opaque white
- Button icons sit inside a `bg-white/20 p-1.5 rounded-full` circle, not bare

---

### Reference 3: Dark Editorial Two-Column

Suits: registration pages, sign-up flows, product on-boarding. Uses Palette 1 (Midnight Luxe) with adjustments.

**Structure:**

```
<main>: flex min-h-screen bg-black p-2, lg:p-4 lg:h-screen lg:overflow-hidden
  Left column:  w-[52%] hidden lg:flex, rounded-3xl, video bg, hero content at bottom
  Right column: flex-1, form area centred, max-w-xl
```

**Left column (video + hero overlay):**

```tsx
<div className="relative w-[52%] hidden lg:flex flex-col items-center
  justify-end pb-32 px-12 rounded-3xl overflow-hidden shadow-2xl h-full">
  {/* Video: NO overlay, no gradient, no tint */}
  <video autoPlay muted loop playsInline
    className="absolute inset-0 w-full h-full object-cover">
    <source src="VIDEO_URL_HERE" type="video/mp4" />
  </video>
  {/* Content over video */}
  <motion.div className="relative z-10 w-full max-w-xs space-y-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}>
    {/* Brand */}
    <motion.div className="flex items-center gap-2"
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Circle className="w-6 h-6 text-white fill-white" />
      <span className="text-xl font-semibold tracking-tight text-white">Aurora</span>
    </motion.div>
    {/* Heading */}
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-4xl font-medium tracking-tight text-white">Join Aurora</h2>
      <p className="text-white/60 text-sm leading-relaxed mt-2">
        Follow these 3 quick phases to activate your space.
      </p>
    </motion.div>
    {/* Step indicators */}
    {steps.map((step, i) => (
      <StepItem key={i} number={i + 1} text={step.text} active={i === 0} />
    ))}
  </motion.div>
</div>
```

**Step indicator component (active vs inactive states):**

```tsx
function StepItem({ number, text, active }: { number: number; text: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active
        ? 'bg-white text-black border border-white'
        : 'bg-[#1A1A1A] text-white border-none'
    }`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
        active ? 'bg-black text-white' : 'bg-white/10 text-white/40'
      }`}>{number}</div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  )
}
```

**Right column (form):**

```tsx
<div className="flex-1 flex flex-col items-center justify-center py-12
  lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24">
  <motion.div className="w-full max-w-xl space-y-8"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}>
    {/* Header */}
    <div>
      <h1 className="text-3xl font-medium tracking-tight text-white">Create New Profile</h1>
      <p className="text-white/40 text-sm mt-2">Input your basic details to begin the journey.</p>
    </div>
    {/* Social buttons: 2-column grid */}
    <div className="grid grid-cols-2 gap-4">
      <SocialButton icon={Chrome} label="Google" />
      <SocialButton icon={Github} label="Github" />
    </div>
    {/* Divider */}
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/10" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-black px-4 text-xs font-medium text-white/40
          uppercase tracking-widest">Or</span>
      </div>
    </div>
    {/* Form fields */}
    <div className="grid grid-cols-2 gap-4">
      <InputGroup label="First Name" placeholder="John" />
      <InputGroup label="Last Name" placeholder="Doe" />
    </div>
    <InputGroup label="Email" placeholder="john@example.com" type="email" />
    <InputGroup label="Password" placeholder="Min 8 characters" type="password" />
    {/* Submit */}
    <button className="w-full h-14 bg-white text-black font-semibold rounded-xl
      hover:bg-white/90 active:scale-[0.98] transition-all mt-4">
      Create Account
    </button>
  </motion.div>
</div>
```

**Input and social button components:**

```tsx
function InputGroup({ label, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="text-sm font-medium text-white block mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder}
        className="w-full bg-[#1A1A1A] border-none rounded-xl h-11 px-4
          text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20
          outline-none transition-all" />
    </div>
  )
}

function SocialButton({ icon: Icon, label }) {
  return (
    <button className="flex items-center justify-center gap-2 bg-black border
      border-white/10 rounded-xl py-3 text-white text-sm font-medium
      hover:bg-white/5 transition-colors">
      <Icon className="w-5 h-5" /> {label}
    </button>
  )
}
```

**Key details that prevent AI slop:**
- Left column has exact width (w-[52%]), not flex-1 or w-1/2
- Video has NO overlay at all. Content sits at the bottom where video is naturally darker
- Step indicators have precise active/inactive state styling with different backgrounds
- Form inputs use bg-[#1A1A1A] (custom dark, not pure black), border-none, and specific focus ring
- The divider uses the classic "text over line" pattern with the black bg punching through
- Social buttons use border-white/10 (barely visible), not border-white/20 or higher
- Submit button is h-14 (tall), not the default compact height

---

## Step 4: Layout

Container:
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
@media (min-width: 768px)  { .container { padding: 0 48px; } }
@media (min-width: 1280px) { .container { padding: 0 64px; } }
```

Dashboard layout: 240px fixed sidebar, fluid main content, 64px top bar. Sidebar collapses to bottom tab bar on mobile.

Spacing scale: 4 8 12 16 20 24 32 40 48 64 80 96 128px. Use gap- for grids and flex layouts.

---

## Step 5: Component Patterns

Primary button:
```tsx
<button className="bg-amber-500 hover:bg-amber-400 text-black font-semibold
  px-6 py-3 rounded-xl transition-all duration-150
  hover:shadow-[0_0_24px_rgba(245,158,11,0.45)] active:scale-95">
  Label
</button>
```

Card:
```tsx
<div className="bg-[#161616] border border-white/[0.05]
  hover:border-white/[0.10] hover:bg-[#1a1a1a]
  rounded-xl p-6 transition-all duration-200
  hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
  {children}
</div>
```

Input:
```tsx
<input className="w-full bg-[#111] border border-white/[0.08]
  hover:border-white/[0.15] focus:border-amber-500/50
  text-white placeholder:text-white/25
  rounded-lg px-4 py-3 outline-none transition-all duration-150
  focus:ring-2 focus:ring-amber-500/10" />
```

Status badge:
```tsx
const statusStyles = {
  pending:    'bg-white/5 text-white/50 border-white/10',
  processing: 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse-soft',
  complete:   'bg-green-500/10 text-green-400 border-green-500/20',
  failed:     'bg-red-500/10 text-red-400 border-red-500/20',
}
```

Skeleton:
```tsx
<div className="relative overflow-hidden h-40 bg-white/5 rounded-xl">
  <div className="absolute inset-0 bg-gradient-to-r
    from-transparent via-white/[0.05] to-transparent animate-shimmer"
    style={{ backgroundSize: '200% 100%' }} />
</div>
```

---

### Premium Component Library (USE THESE, DO NOT INVENT SIMPLER VERSIONS)

These components are the building blocks of MotionSites-quality interfaces. Each has exact CSS values. Use them with the liquid glass classes from Step 3B. Do not create simplified versions of these components. If a project needs a navbar, use the liquid-glass navbar pattern below. If it needs stat cards, use the stat card patterns below. If it needs a hero badge, use the badge pattern below. Inventing a basic alternative when the premium version exists here is not acceptable.

**Liquid-Glass Navbar (complete with mobile hamburger):**

```tsx
{/* Desktop */}
<nav className="fixed top-4 inset-x-0 z-50 px-8 lg:px-16">
  <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
    {/* Logo */}
    <div className="flex items-center gap-2">
      <div className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center">
        <span className="font-display italic text-white text-lg">a</span>
      </div>
    </div>
    {/* Centre links (desktop) */}
    <div className="hidden md:flex liquid-glass rounded-full px-1.5 py-1.5 items-center gap-0">
      {['Home', 'Features', 'About', 'Pricing'].map(link => (
        <a key={link} className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-300 rounded-full">{link}</a>
      ))}
      <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1">
        Get Started <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
    {/* Mobile hamburger */}
    <button className="md:hidden flex flex-col gap-[5px]" onClick={() => setMenuOpen(!menuOpen)}>
      <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
      <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
      <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
    </button>
  </div>
</nav>
{/* Mobile overlay */}
<div className={`fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
  {/* Large typographic links centred */}
</div>
```

**Hero Badge/Chip:**

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
  className="flex items-center gap-2 px-4 py-2 rounded-full liquid-glass mx-auto mb-3 w-fit"
>
  {/* Optional inner 'New' pill */}
  <span className="bg-white text-black px-3 py-1 text-xs font-semibold rounded-full">New</span>
  <span className="text-sm text-white/90 pr-3">Feature announcement text here</span>
</motion.div>
```

**Stat Cards (liquid-glass variant):**

```tsx
<div className="flex items-stretch gap-4">
  <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem]">
    {/* 28x28 white outline SVG icon */}
    <svg className="w-7 h-7 text-white mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
    <p className="font-display italic text-white text-4xl tracking-[-1px] leading-none">34.5 Min</p>
    <p className="text-xs text-white font-body font-light mt-2">Average Watch Time</p>
  </div>
</div>
```

**Partner/Logo Strip:**

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.4, duration: 0.6 }}
  className="flex flex-col items-center gap-4 pb-8"
>
  <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white">
    Collaborating with top pioneers globally
  </span>
  <div className="flex items-center gap-12 md:gap-16">
    {['Aeon', 'Vela', 'Apex', 'Orbit', 'Zeno'].map(name => (
      <span key={name} className="font-display italic text-white text-2xl md:text-3xl tracking-tight">{name}</span>
    ))}
  </div>
</motion.div>
```

**CTA Button Pair:**

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.1, duration: 0.6 }}
  className="flex items-center gap-6 mt-6"
>
  {/* Primary: liquid-glass-strong */}
  <a className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform">
    Start Your Voyage <ArrowUpRight className="w-5 h-5" />
  </a>
  {/* Secondary: bare text */}
  <a className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
    View Demo <Play className="w-4 h-4 fill-current" />
  </a>
</motion.div>
```

**Bottom-Corner Cutout Component:**

This creates a faux-cutout effect where the page background wraps around a corner element. Requires two SVG corner masks.

```tsx
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="absolute bottom-0 right-0 p-6 pt-8 pl-14 bg-[var(--bg-primary)] rounded-tl-[3.5rem] flex items-center gap-6"
>
  {/* Top corner mask */}
  <div className="absolute -top-[3.5rem] right-0 w-[3.5rem] h-[3.5rem] pointer-events-none">
    <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none">
      <path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="var(--bg-primary)" />
    </svg>
  </div>
  {/* Left corner mask */}
  <div className="absolute bottom-0 -left-[3.5rem] w-[3.5rem] h-[3.5rem] pointer-events-none">
    <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none">
      <path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="var(--bg-primary)" />
    </svg>
  </div>
  {/* Content */}
  <div className="w-14 h-14 rounded-full flex items-center justify-center border border-[var(--border-default)] bg-[var(--accent-glow)]">
    <ArrowUpRight className="w-6 h-6 text-[var(--text-primary)]" />
  </div>
  <div>
    <p className="text-xl font-normal text-[var(--text-primary)]">Documentation</p>
    <div className="flex items-center gap-1 text-[var(--text-muted)] cursor-pointer hover:text-[var(--text-secondary)] transition-colors">
      <span className="text-sm font-normal">Library</span>
      <ChevronRight className="w-4 h-4" />
    </div>
  </div>
</motion.div>
```

**Typewriter Text Hook:**

```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-blink { animation: blink 1s step-end infinite; }
```

```tsx
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) { clearInterval(interval); setDone(true) }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])
  return { displayed, done }
}

// Usage:
const { displayed, done } = useTypewriter("we'd love to hear from you!", 38, 600)
// Render:
<h1 className="text-6xl font-normal tracking-tight leading-[1.08] whitespace-pre-wrap">
  {displayed}
  {!done && <span className="inline-block w-[2px] h-[1.1em] bg-current align-middle ml-[2px] animate-blink" />}
</h1>
```

**Interactive Service Pill Selector:**

```tsx
const [services, setServices] = useState<string[]>([])
const options = ['Brand', 'Digital', 'Campaign', 'Other']

<div className="flex flex-wrap gap-3">
  {options.map(option => {
    const active = services.includes(option)
    return (
      <motion.button
        key={option}
        whileTap={{ scale: 0.95 }}
        onClick={() => setServices(prev =>
          prev.includes(option) ? prev.filter(s => s !== option) : [...prev, option]
        )}
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
          active
            ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5'
            : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'
        }`}
      >
        <span className="flex items-center gap-2">
          {active && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Check className="w-4 h-4" />
            </motion.span>
          )}
          {option}
        </span>
      </motion.button>
    )
  })}
</div>

{/* Feedback banner */}
<AnimatePresence mode="wait">
  {services.length > 0 && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-[#FAFBF9] border border-[#F1F3F1] rounded-2xl px-4 py-3 mt-4"
    >
      <p className="text-sm text-[#1C2E1E]">Ready to inquire about: {services.join(', ')}</p>
    </motion.div>
  )}
</AnimatePresence>
```

## Step 6: Landing Page Section Order

**Standard layout:**

1. Announcement bar
2. Nav: logo left, links center, CTA right
3. Hero: full viewport height with ambient motion background
4. Social proof strip
5. Problem section with real numbers
6. Solution section, side by side comparison
7. Feature showcase, 3 core features
8. Pricing, 3 columns with recommended plan highlighted
9. Testimonials or results
10. Final CTA
11. Footer

**Cinematic animated layout** (use when Step 3B blueprint decision selects animated backgrounds):

1. Nav: liquid glass bar over video, logo left, links center, CTA right
2. Hero: full viewport video background with liquid glass UI, dramatic headline with BlurText or character animation, staggered FadeIn entrance sequence (nav → headline → subtext → CTAs → stats/partners)
3. Scroll-driven marquee or parallax image strip (if portfolio or agency)
4. About section with AnimatedText character reveal on scroll
5. Services or features section (can switch to white/light background with rounded top corners for contrast)
6. Projects or case studies with sticky card stacking effect
7. Testimonials or partner logos
8. Final CTA with video background or gradient
9. Footer

---

## Step 7: Responsiveness

- Mobile-first. Start smallest, scale up.
- Touch targets minimum 44x44px
- Hero headline uses clamp()
- All grids collapse to single column on mobile
- Never hide critical actions on mobile, reposition them

---

## Step 8: Production Quality

- Every interactive element has a visible focus state
- All color pairs meet WCAG AA contrast
- Loading states required for every async operation, use skeleton screens not spinners
- Empty states must have a message and a primary action
- Error states must explain what went wrong and what to do next
- All forms validate client-side before submitting with field-level error messages

---

## Step 9: What Not to Do

- Never use purple gradients on white backgrounds
- Never use Inter, Roboto or Arial as the display font
- Never animate everything. Motion must be deliberate.
- Never use more than 3 font weights on the same page
- Never let the primary CTA compete visually with secondary actions
- Never leave a screen without an empty state
- Never use pure black or pure white as background or text
- Never scatter micro-interactions randomly across a page
- Never converge on common font choices like Space Grotesk or Outfit across different projects
- Never use inline JS hover handlers (onMouseEnter/onMouseLeave setting style properties). Use CSS transitions and hover pseudo-classes instead
- Never create a background with just two blurred coloured divs and call it premium. If coded backgrounds are needed, use the patterns from Step 11. If video is appropriate, use the workflow from Step 12
- Never use basic opacity+translate entrance animations without blur. Every entrance must use filter: blur as part of the animation (blur-in pattern from Step 3)
- Never invent a simplified component when a premium pattern exists in the Premium Component Library (Step 5). Use the existing pattern
- Never use em dashes in any generated output, whether code comments, spec files, documentation or UI copy

---

## Step 10: Website Copy and Text Rules

All text written for websites, landing pages and web apps must follow these rules. This applies to headlines, subheadings, body copy, CTAs, navigation labels, error messages, empty states and any other visible text.

### Language and grammar

- Write in British English (colour not color, optimise not optimize, organisation not organization)
- Use periods only when necessary
- Use commas only when necessary and avoid overusing them
- Words must flow and connect naturally within sentences
- Paragraphs must flow, connect and complement each other so nothing reads like separate topics stitched together
- The core idea must carry through all copy on the page so everything connects cohesively
- Do not add or change words unless absolutely necessary for clarity
- Write using proper grammar as a professional English expert would

### Formatting

- No em dashes anywhere in any text on the page, in spec files, in code comments, or in any generated output. Use commas, semicolons, or full stops to separate clauses instead
- Know when to use uppercase and lowercase and apply them correctly
- Headlines and CTAs should be concise and punchy, not bloated with filler words
- Body copy should be scannable with short paragraphs that each make one clear point

### Code standards

- Use camelCase for all JavaScript variables, functions and identifiers
- Add JSDoc comments to every function

---

## Step 11: Coded Animated Backgrounds (Fallback When Video Is Not Feasible)

Use these patterns ONLY when a video background is not possible (technical constraints, no video generation tools available, user explicitly prefers coded animation, or the project is a dashboard/app where video is inappropriate). For marketing pages and landing pages, always try the video workflow in Step 12 first.

These patterns are lightweight, cursor-reactive, require no external assets and look acceptable on any device. But they do not match the cinematic quality of a well-produced video background.

### Pattern 1: Interactive Waves (Perlin Noise Canvas)

A cursor-reactive canvas animation using Perlin noise. Lines flow organically and distort toward the cursor on mouse move and touch. Best for Web3, financial and dark-editorial hero sections.

Use the Waves.tsx component from the project reference files. Key props:

```tsx
<Waves
  lineColor="rgba(212, 168, 83, 0.2)"   // accent colour at low opacity
  backgroundColor="transparent"
  waveSpeedX={0.008}
  waveSpeedY={0.004}
  waveAmpX={28}
  waveAmpY={12}
  xGap={12}
  yGap={36}
/>
```

Layer it over a GrainGradient for maximum depth:

```tsx
<div className="relative w-full h-screen">
  <GrainGradient
    style={{ position: 'absolute', inset: 0 }}
    colorBack="hsl(220, 30%, 5%)"
    colors={['hsl(42, 70%, 50%)', 'hsl(220, 80%, 30%)', 'hsl(158, 70%, 25%)']}
    speed={0.4}
    softness={0.8}
    intensity={0.3}
  />
  <Waves
    lineColor="rgba(212, 168, 83, 0.18)"
    backgroundColor="transparent"
    waveSpeedX={0.008}
    waveSpeedY={0.004}
  />
  <div className="relative z-10">{children}</div>
</div>
```

### Pattern 2: Shader Grain Gradient

GPU-accelerated animated gradient with film grain. Slow, ambient, premium. Install with `npm install @paper-design/shaders-react`.

```tsx
import { GrainGradient } from '@paper-design/shaders-react'

<GrainGradient
  style={{ height: '100%', width: '100%' }}
  colorBack="hsl(0, 0%, 0%)"
  softness={0.76}
  intensity={0.45}
  speed={0.5}
  colors={['hsl(42, 70%, 50%)', 'hsl(220, 80%, 30%)', 'hsl(158, 70%, 25%)']}
/>
```

Adjust `colors` to match the product's accent palette. Use `speed={0.3}` to `speed={0.6}` for ambient backgrounds.

### Pattern 3: Ambient Glow Blobs (CSS Only)

For interior pages that need atmosphere without full canvas animation:

```tsx
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-[700px] h-[500px] rounded-full opacity-20
    bg-[var(--accent)] blur-[160px] animate-pulse-soft" />
  <div className="absolute bottom-0 right-1/4
    w-[400px] h-[300px] rounded-full opacity-10
    bg-[var(--accent)] blur-[120px] animate-float" />
</div>
```

Use on dashboard and marketplace interior pages. Never on the same page as the Waves canvas.

### Pattern 4: Colour-Adaptive Gallery Background

Used in sliders where the ambient background adapts to the active item's colour:

```tsx
<motion.div
  key={currentIndex}
  initial={{ opacity: 0, scale: 1.1 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
  className="absolute inset-0"
  style={{
    background: `
      radial-gradient(ellipse at 30% 20%, ${activeColor1}66 0%, transparent 50%),
      radial-gradient(ellipse at 70% 80%, ${activeColor2}66 0%, transparent 50%),
      linear-gradient(180deg, #0a0a0a 0%, #111111 100%)
    `,
  }}
/>
```

Pass the dominant colour of the active card as `activeColor1` and `activeColor2`. Use the asset type accent colour or extract the dominant colour from artwork using canvas.

---

## Step 12: AI-Generated Video Backgrounds (Rigid Workflow)

When Gate 3 selects "Animated video background" this workflow activates. Follow every step in order. Do not skip steps. Do not combine steps. Each step that says STOP AND WAIT means the AI must ask the user, present the output, and wait for their response before continuing.

Video backgrounds are the PRIMARY recommended approach for all marketing pages, landing pages, portfolios, launch pages and creative sites. Coded animations (Waves, GrainGradient) are the FALLBACK for when video is not feasible. For premium output, always push for video first.

### STEP 1: Check for existing video

Ask the user: "Do you already have a video file or URL for the background?"

If YES with file or URL provided: skip to STEP 5.
If NO: proceed to STEP 2.

### STEP 2: Check for source image

Ask: "Do you have a still image you want animated as the background? If yes share it. If not I will create one based on the project theme."

If user provides an image: analyse it, proceed to STEP 3.
If user says no: proceed to STEP 2B.

### STEP 2B: Generate source image

Using the project's aesthetic direction and colour palette (from Gates 1 and 5), generate a high-quality still image using the generate_image tool. The image must:

- Match the colour palette chosen in Gate 5
- Suit the project's subject matter and industry
- Have depth, atmosphere and visual interest (not flat or generic)
- Work as a background with appropriate contrast for text overlay
- Be dark enough for white text (dark themes) or light enough for dark text (light themes)
- Avoid cliche AI imagery: no generic floating shapes, no bland abstract gradients, no stock-photo-style scenes

Present the generated image to the user for approval.

If approved: proceed to STEP 3.
If rejected: ask what to change, regenerate, repeat until approved.

### STEP 2C: Character-based video approach (alternative to 2B)

For hero sections featuring a focal character, avatar or 3D object (rather than ambient atmosphere), use this specialised workflow:

1. **Find a reference character.** Search Pinterest for "holographic avatar", "3D character bust", "futuristic head sculpture" or similar terms matching the project aesthetic. Show the user 3-5 options and let them pick one.
2. **Generate multi-angle views.** Using ChatGPT (or similar image generation tool), create the same character from multiple angles: front, left profile, right profile, three-quarter view. Prompt with "make it look left", "make it look right" etc. while providing the reference image. Aim for 3-5 consistent angles.
3. **Animate with multi-shot.** In Kling (Video 3.0) or similar tool, upload all angle images. Use "Bind elements to enhance consistency" to keep the character coherent across frames. Prompt: "animate". This produces a short video of the character rotating or shifting naturally between the angles.
4. **Export.** Duration 5-6 seconds, 1080p, MP4. The video does NOT need to loop seamlessly because it will be used with the cursor-scrubbing hook (useVideoScrub), not autoplay.

After generating, proceed to STEP 5 and use the **cursor-controlled scrubbing** integration (useVideoScrub from Step 3B) instead of the standard autoplay integration. The character responds to mouse movement, creating an interactive premium experience.

### STEP 3: Propose animation directions

Based on the source image and project aesthetic, propose exactly 3 specific animation directions. Each must describe:

1. Camera movement (drift, pan, zoom, orbit, static)
2. Element motion (particles, light shifts, fog, liquid flow, atmospheric effects)
3. Speed (slow ambient, moderate cinematic, dynamic)
4. Loop behaviour (seamless loop, crossfade loop)
5. Interaction mode: **autoplay** (ambient background, uses useFadingVideo) or **cursor-scrubbing** (interactive, uses useVideoScrub from Step 3B. Best for focal characters and objects)

Format each as a single descriptive sentence. Example proposals:

**Option A**: "Slow horizontal camera drift with subtle gold light caustics rippling across the surface. Atmospheric particle motes rising gently. Seamless 8-second loop."

**Option B**: "Static camera with volumetric fog drifting left to right. Depth-of-field blur pulsing subtly. Light flares shifting warm to cool. 6-second crossfade loop."

**Option C**: "Gentle push-in zoom with parallax depth layers. Foreground elements slightly defocused creating bokeh. Background glow shifting between brand accent colours. 10-second seamless loop."

Present all 3 to the user. STOP AND WAIT for their choice.

### STEP 4: Generate video prompt

Based on the chosen direction, write a detailed, ready-to-paste prompt. Present it in this exact format:

---

**VIDEO GENERATION PROMPT**

Paste this into Higgsfield (Seedance 2.0), Kling AI, Runway, Pika, or Nano Banana:

"[Complete prompt with: camera angle, subject description from the source image, motion type and direction, speed, colour palette from Gate 5, lighting quality, mood, atmospheric effects, loop behaviour. Be hyper-specific. Never use vague words like 'beautiful' or 'nice'. Every visual detail must be described.]"

**Recommended settings:**
- Duration: 6-10 seconds
- Resolution: 1080p minimum (4K preferred)
- Aspect ratio: 16:9 (landscape)
- Export format: MP4 (H.264)
- Loop mode: seamless (if available in the tool)
- File size target: under 10MB

After generating the video, share the file or URL back here and I will integrate it into the hero section.

---

STOP AND WAIT for the user to generate and share the video.

### STEP 5: Integrate the video

Once the video is available:

1. **Check file size.** If over 10MB recommend compression or HLS streaming (use the useHlsVideo hook from Step 3B)
2. **Choose interaction mode based on STEP 3 decision:**
   - **Autoplay mode** (ambient atmosphere backgrounds):
     - `<video autoplay muted playsinline preload="auto">` with the source URL
     - If the video loops cleanly: add `loop` attribute
     - If the video has a visible jump at the loop point: omit `loop` and use the `useFadingVideo` crossfade handler from Step 3B
   - **Cursor-scrubbing mode** (focal characters, objects, product reveals):
     - `<video muted playsinline preload="auto">` — NO `autoplay`, NO `loop`
     - Use the `useVideoScrub` hook from Step 3B
     - The video responds to horizontal mouse movement, scrubbing forward and backward
     - Best for character-based videos from STEP 2C
3. **Position:** `absolute inset-0 w-full h-full object-cover z-0` with `background-color` fallback matching the video's dominant dark tone
4. **Layer content above** using liquid-glass components from the component library
5. **Add noise grain overlay** for texture depth (SVG fractalNoise pattern from Technique 7)
6. **Mobile handling:** check `navigator.connection.effectiveType` when available, disable autoplay on connections slower than 4G, show the source image as a static fallback instead. For scrubbing mode, fall back to autoplay on touch devices since mousemove is not available

Present the integrated result to the user. STOP AND WAIT for approval before finalising.


---

## Step 13: Image Strategy for Platforms With No User Content Yet

When a marketplace or platform launches with no real user-generated imagery, use this phased strategy:

**Phase 1 (no users yet)**: use coded SVG components as the visual content. For an NFT marketplace, SVG card templates rendered as React components fill the grid. No stock photos. No placeholder images. The code is the art.

**Phase 2 (early users)**: mix real user content with SVG fallbacks. If a collection has no custom artwork, show the SVG standard template. If it has custom artwork, show that.

**Phase 3 (established content)**: the grid is fully populated by real user content. SVG templates are fallbacks only for collections without custom artwork.

Never use generic stock photography as placeholder imagery in a financial or Web3 product. Coded visuals are always preferable to inappropriate stock images. The SVG card templates are also what gets rendered in the featured collections carousel and any promotional sections until real issuer artwork replaces them.

---

## Step 14: When to Use v0

When the coded patterns and Framer Motion cannot produce the quality needed for a specific component, generate it in v0.dev and integrate it. Use v0 for: complex hero animation layers, physics-based drag behaviour, advanced data visualisations, or when a client reference site has a specific effect that cannot be cleanly replicated from scratch.

### v0 prompt template

> Build a [component name] in Next.js with TypeScript and Tailwind CSS. Use Framer Motion for animations. Aesthetic: [describe the specific project tone, colours and font choices]. [Describe the component and its exact behaviour in detail]. No [list anything to avoid]. Export as a named React component with TypeScript props and JSDoc on every function.

### Integrating v0 output

After pasting v0 output into the project:
1. Replace all hardcoded hex values with CSS custom property references (var(--accent), var(--bg-primary), etc.)
2. Add JSDoc to every function
3. Ensure all variables and identifiers use camelCase
4. Replace any placeholder copy with real product copy
5. Check the animation is disabled or reduced on mobile if it would affect performance

---

## Step 15: Quality Audit (Run Before Presenting Any Output)

Before presenting any frontend output to the user, mentally run through every check below. If any check fails, fix it before presenting. This is the final gate between "AI slop" and premium output.

### Visual Hierarchy

- Does the hero use the full viewport height (min-h-screen or h-screen)?
- Is there one dominant visual element that draws the eye first?
- Is the headline the largest text on the page with dramatic sizing using clamp() for fluid scaling?
- Is there clear visual separation between sections (spacing, colour shifts, borders)?

### Animation Quality

- Are all animations using custom easings (cubic-bezier(0.16, 1, 0.3, 1) or similar), not plain 'linear' or 'ease'?
- Is the hero entrance sequence staggered with specific delays (0.4s, 0.8s, 1.1s etc.), not all simultaneous?
- Do entrance animations include filter effects (blur-in) in addition to opacity and translate?
- Are hover animations present on all interactive elements (buttons, links, cards)?
- Are animation durations between 150-800ms (not too fast to notice, not too slow to feel sluggish)?

### Design System Consistency

- Is the colour palette applied consistently via CSS variables? No hardcoded hex values in component JSX.
- Are font sizes using a consistent scale? clamp() for hero headlines, rem for body text.
- Is spacing consistent using the defined scale (4, 8, 12, 16, 24, 32, 48, 64, 80px)?
- Are border-radius values consistent across similar components?

### Glassmorphism Quality (if applicable)

- Do glass elements have the ::before gradient border pseudo-element (the liquid-glass pattern)?
- Is backdrop-filter: blur() applied with the -webkit prefix for Safari support?
- Are glass elements using rgba backgrounds, not hex values with opacity?
- Is the glass effect visible and readable but not overwhelming?

### Background Quality

- Is there a noise/grain texture overlay for depth (SVG fractalNoise pattern)?
- If video: is there a solid background-color fallback matching the dominant video tone?
- If video: is preload="auto" set on the hero video?
- If coded animation: are particles/effects clearly visible against the background (not faint dots that read as static noise)?

### Typography Quality

- Is the display font non-generic (not Inter, Roboto, Arial, or Space Grotesk as the primary heading font)?
- Is font loading handled (Google Fonts import URL or @font-face declaration)?
- Are line-heights tight for headings (0.8-1.1) and comfortable for body text (1.5-1.7)?
- Is letter-spacing negative for large headings (-0.01em to -0.04em)?

### Navigation Quality

- Does the nav use a non-default pattern (not the banned logo-left, 3-links-centre, button-right layout)?
- Is the nav properly layered above content (z-50 for fixed nav, z-10 for relative content)?
- Does mobile nav have a proper hamburger animation (3 spans transitioning to X)?

### Responsive Quality

- Does the layout collapse gracefully on mobile (single column, stacked elements)?
- Are touch targets at least 44x44px on mobile?
- Is the hero headline readable on mobile (not overflowing, uses clamp())?

### Cross-Reference Check (Did You Actually Use What This Skill File Provides?)

- Did you use a component from the Premium Component Library (Step 5) for navbars, stat cards, badges, CTA buttons, and partner strips? If you invented a simpler version instead of using the premium pattern, go back and replace it.
- Does your output match the level of detail shown in the Golden Reference Compositions (Step 3C)? Compare your z-index layering, entrance animation delays, typography sizing, and component specificity against any of the three references. If yours is less detailed, it is not ready.
- Did you use the liquid glass classes from Step 3B for any glass-effect components? If you used plain rgba backgrounds without the ::before gradient border, go back and apply the full liquid-glass pattern.
- Did entrance animations use blur-in (filter: blur + opacity + translate), not just opacity + translate? Basic fadeUp without blur is below the quality bar.
- For landing pages and marketing pages: did you follow the video background workflow (Step 12) or at least ask the user about background treatment (Gate 3)? If the background is just two blurred coloured divs, that is not premium.

### AI Slop Detection (The Final Check)

Look at the output objectively and ask:

- Would a designer see this and immediately think "AI made this"? If yes, what specifically gives it away?
- Is the colour palette generic (plain blue, plain purple, plain green with no sophistication)?
- Are components using default border-radius (rounded-lg everywhere) and default shadows?
- Is the layout predictable and grid-like with no visual tension or unexpected elements?
- Does every section look structurally identical (same padding, same card layout, same spacing)?
- Are there any elements that feel "added for the sake of it" rather than serving the design?

If ANY of these checks reveals a problem, fix it before presenting. The goal is output that a professional designer would not be embarrassed to show a client.

