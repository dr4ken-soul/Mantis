import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { AmbientBackground } from '../components/AmbientBackground'
import { StatCard } from '../components/StatCard'
import { TokenCard } from '../components/TokenCard'
import { getStats, getTokens } from '../lib/api'

/**
 * Token board page.
 */
export function BoardPage() {
  const navigate = useNavigate()
  const { data: tokens = [], isLoading } = useQuery({
    queryKey: ['tokens'],
    queryFn: getTokens,
    refetchInterval: 30_000,
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-14">
          <section className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              className="max-w-3xl"
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                Crime pump lifecycle
              </p>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(2.6rem, 7vw, 5.7rem)',
                  lineHeight: 0.92,
                  fontWeight: 500,
                  letterSpacing: '0',
                  color: 'var(--text-primary)',
                }}
              >
                Watch the trap before it closes
              </h1>
            </motion.div>
          </section>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard label="Win Rate" value={stats ? `${stats.winRate.toFixed(1)}%` : '--'} delay={0.3} highlight />
            <StatCard label="Total PnL" value={stats ? `${stats.totalPnlPct.toFixed(2)}%` : '--'} delay={0.38} />
            <StatCard label="Trades" value={stats ? `${stats.totalTrades}` : '--'} delay={0.46} />
            <StatCard label="Sharpe" value={stats ? stats.sharpeRatio.toFixed(2) : '--'} delay={0.54} />
          </section>

          <section>
            <motion.p
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              Monitored tokens
            </motion.p>

            {tokens.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {isLoading ? 'Loading monitored tokens' : 'No tokens being monitored'}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Run a scan from a token detail route or start the Mantis agent
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {tokens.map((token, index) => (
                  <TokenCard
                    key={token.symbol}
                    token={token}
                    index={index}
                    onClick={() => navigate(`/token/${token.symbol}`)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}
