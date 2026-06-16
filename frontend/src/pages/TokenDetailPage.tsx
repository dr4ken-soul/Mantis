import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, RotateCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { AmbientBackground } from '../components/AmbientBackground'
import { DetectionChart } from '../components/DetectionChart'
import { StageBadge } from '../components/StageBadge'
import { getToken, scanToken } from '../lib/api'

const stageExplanations: Record<number, string> = {
  0: 'No manipulation stage detected. Standard technical logic applies while Mantis keeps watching.',
  1: 'Accumulation detected. Market makers may be building positions before visible momentum.',
  2: 'OI Matrix active. Open interest and price behaviour are being cross-checked before any entry.',
  3: 'Trap signal detected. Manufactured exhaustion may be luring short sellers into a reversal.',
  4: 'Distribution in progress. Mantis will not open fresh positions during this stage.',
}

/**
 * Token detail page.
 */
export function TokenDetailPage() {
  const { symbol = '' } = useParams<{ symbol: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['token', symbol],
    queryFn: () => getToken(symbol),
    refetchInterval: 30_000,
    enabled: Boolean(symbol),
    retry: false,
  })

  const scanMutation = useMutation({
    mutationFn: () => scanToken(symbol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['token', symbol] })
      queryClient.invalidateQueries({ queryKey: ['tokens'] })
    },
  })

  const layers = data?.layers ?? []
  const dominantStage = layers.reduce((max, layer) => (layer.triggered && layer.layerNumber > max ? layer.layerNumber : max), 0)

  return (
    <>
      <AmbientBackground />
      <main className="relative min-h-screen" style={{ paddingTop: '9.75rem', paddingBottom: '5rem', zIndex: 1 }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col gap-9">
          <motion.button
            type="button"
            initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            onClick={() => navigate('/')}
            className="link-hover self-start text-sm min-h-11 flex items-center gap-2"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={16} />
            Back to Board
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <p className="number-font" style={{ color: 'var(--accent)', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                Token detail
              </p>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                  lineHeight: 0.95,
                  fontWeight: 500,
                  letterSpacing: '0',
                  color: 'var(--text-primary)',
                }}
              >
                {symbol.toUpperCase()}
              </h1>
            </div>
            <button
              type="button"
              onClick={() => scanMutation.mutate()}
              disabled={scanMutation.isPending}
              className="liquid-glass rounded-full px-4 py-2 min-h-11 text-sm link-hover flex items-center justify-center gap-2"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
                cursor: scanMutation.isPending ? 'not-allowed' : 'pointer',
                opacity: scanMutation.isPending ? 0.5 : 1,
              }}
            >
              <RotateCw size={16} />
              {scanMutation.isPending ? 'Scanning' : 'Scan now'}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <StageBadge stage={dominantStage} />
            {scanMutation.data ? (
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Latest scan confidence {(scanMutation.data.stageConfidence * 100).toFixed(0)}%
              </span>
            ) : null}
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="liquid-glass p-6"
            style={{ borderRadius: 'var(--radius-lg)' }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Detection layers
            </p>
            {layers.length > 0 ? (
              <DetectionChart layers={layers} />
            ) : (
              <div className="py-20 text-center" style={{ color: 'var(--text-muted)' }}>
                {isLoading ? 'Loading layers' : error ? 'No layer data yet, run a scan' : 'No layer data yet'}
              </div>
            )}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="px-6 py-5"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderLeft: `3px solid var(--stage-${dominantStage > 0 ? dominantStage : 1}-border)`,
              borderRadius: 'var(--radius-md)',
            }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              {stageExplanations[dominantStage] ?? stageExplanations[0]}
            </p>
          </motion.section>
        </div>
      </main>
    </>
  )
}
