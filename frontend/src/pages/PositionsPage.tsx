import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { AmbientBackground } from '../components/AmbientBackground'
import { PositionRow } from '../components/PositionRow'
import { StatCard } from '../components/StatCard'
import { getPositions, getStats } from '../lib/api'

/**
 * Active positions page.
 */
export function PositionsPage() {
  const { data: positions = [] } = useQuery({
    queryKey: ['positions'],
    queryFn: getPositions,
    refetchInterval: 15_000,
  })
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
    refetchInterval: 60_000,
  })

  return (
    <>
      <AmbientBackground />
      <main className="relative min-h-screen" style={{ paddingTop: '9.75rem', paddingBottom: '5rem', zIndex: 1 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard label="Win Rate" value={stats ? `${stats.winRate.toFixed(1)}%` : '--'} delay={0.3} highlight />
            <StatCard label="Total PnL" value={stats ? `${stats.totalPnlPct.toFixed(2)}%` : '--'} delay={0.38} />
            <StatCard label="Open" value={String(positions.length)} delay={0.46} />
            <StatCard label="Sharpe" value={stats ? stats.sharpeRatio.toFixed(2) : '--'} delay={0.54} />
          </div>

          {positions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                No open positions
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                Mantis is scanning for confirmed entries
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="liquid-glass overflow-x-auto"
              style={{ borderRadius: 'var(--radius-lg)' }}
            >
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                    {['Token', 'Direction', 'Entry', 'Current', 'PnL', 'Leverage', 'Opened'].map((column) => (
                      <th
                        key={column}
                        className="px-3 py-3 text-left"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.68rem',
                          color: 'var(--text-secondary)',
                          letterSpacing: '0.07em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                        }}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {positions.map((position, index) => (
                    <motion.tr
                      key={`${position.symbol}-${position.openedAt ?? index}`}
                      initial={{ opacity: 0, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.65 + index * 0.04 }}
                      style={{ borderBottom: '1px solid var(--border-subtle)' }}
                    >
                      <PositionRow position={position} />
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
