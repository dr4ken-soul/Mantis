import { motion } from 'framer-motion'

interface StatCardProps {
  label: string
  value: string
  delay?: number
  highlight?: boolean
}

/**
 * Liquid glass stat card.
 * @param label - Metric label
 * @param value - Formatted metric value
 * @param delay - Entrance delay
 * @param highlight - Whether to apply accent colour
 */
export function StatCard({ label, value, delay = 0.3, highlight = false }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className="liquid-glass-strong flex flex-col gap-1 px-5 py-4"
      style={{ borderRadius: 'var(--radius-md)' }}
    >
      <span
        className="number-font"
        style={{
          fontSize: '1.3rem',
          fontWeight: 500,
          lineHeight: 1,
          color: highlight ? 'var(--accent)' : 'var(--text-primary)',
          letterSpacing: '0',
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          color: 'var(--text-secondary)',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </motion.div>
  )
}
