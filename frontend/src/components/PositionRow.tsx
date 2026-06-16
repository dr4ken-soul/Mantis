import type { Position } from '../types'
import { formatPrice, formatRelativeTime, normaliseDirection } from '../lib/utils'

interface PositionRowProps {
  position: Position
}

/**
 * Position table cells.
 * @param position - Position row from the API
 */
export function PositionRow({ position }: PositionRowProps) {
  const direction = normaliseDirection(position.direction)
  const positive = Number(position.unrealisedPnl ?? 0) >= 0

  return (
    <>
      <td className="px-3 py-4 number-font" style={{ color: 'var(--text-primary)' }}>{position.symbol}</td>
      <td className="px-3 py-4">
        <span
          className="inline-flex px-2.5 py-1 text-xs"
          style={{
            borderRadius: 'var(--radius-sm)',
            background: direction === 'LONG' ? 'rgba(92, 158, 120, 0.14)' : 'rgba(196, 97, 90, 0.14)',
            color: direction === 'LONG' ? 'var(--success)' : 'var(--error)',
            border: `1px solid ${direction === 'LONG' ? 'rgba(92, 158, 120, 0.35)' : 'rgba(196, 97, 90, 0.35)'}`,
          }}
        >
          {direction}
        </span>
      </td>
      <td className="px-3 py-4 number-font" style={{ color: 'var(--text-secondary)' }}>{formatPrice(position.entryPrice)}</td>
      <td className="px-3 py-4 number-font" style={{ color: 'var(--text-secondary)' }}>{formatPrice(position.currentPrice)}</td>
      <td className="px-3 py-4 number-font" style={{ color: positive ? 'var(--success)' : 'var(--error)' }}>
        {Number(position.unrealisedPnl ?? 0).toFixed(2)}%
      </td>
      <td className="px-3 py-4 number-font" style={{ color: 'var(--text-secondary)' }}>{position.leverage}x</td>
      <td className="px-3 py-4" style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
        {formatRelativeTime(position.openedAt)}
      </td>
    </>
  )
}
