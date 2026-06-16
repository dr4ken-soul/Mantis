/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'orb-float': 'orbFloat 22s ease-in-out infinite',
        'trap-pulse': 'trapPulse 2.2s ease-in-out infinite',
        blink: 'blinkCursor 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
