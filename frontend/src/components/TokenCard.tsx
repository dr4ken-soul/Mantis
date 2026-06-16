import { motion } from 'framer-motion'
import type { Token } from '../types'
import { formatRelativeTime } from '../lib/utils'
import { StageBadge } from './StageBadge'

interface TokenCardProps {
  token: Token
  index: number
  onClick: () => void
}

/**
 * Token board card.
 * @param token - Token data from the API
 * @param index - Grid index used for stagger
 * @param onClick - Card click handler
 */
export function TokenCard({ token, index, onClick }: TokenCardProps) {
  const confidence = Math.max(0, Math.min(1, Number(token.stageConfidence ?? 0)))

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.3 + index * 0.05 }}
      onClick={onClick}
      className="liquid-glass card-hover cursor-pointer p-4 flex flex-col gap-3 text-left min-h-[150px] w-full"
      style={{
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="number-font"
          style={{
            fontSize: '0.95rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}
        >
          {token.symbol}
        </span>
        <StageBadge stage={token.currentStage} />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-3">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Confidence
          </span>
          <span className="number-font" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {(confidence * 100).toFixed(0)}%
          </span>
        </div>
        <div className="w-full rounded-full overflow-hidden" style={{ height: '3px', background: 'var(--border-subtle)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${confidence * 100}%`,
              background: 'var(--accent)',
            }}
          />
        </div>
      </div>

      <div className="mt-auto pt-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          {formatRelativeTime(token.lastScannedAt)}
        </span>
      </div>
    </motion.button>
  )
}
