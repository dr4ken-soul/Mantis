import { LayoutGrid, WalletCards } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Board', icon: LayoutGrid },
  { to: '/positions', label: 'Positions', icon: WalletCards },
]

/**
 * Fixed top navigation bar.
 */
export function Nav() {
  const { pathname } = useLocation()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 lg:px-12"
    >
      <div className="liquid-glass-dark rounded-full px-5 py-3 flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/" className="flex items-center gap-4 no-underline min-w-0">
          <span className="grid h-14 w-14 shrink-0 place-items-center overflow-visible">
            <img src="/mantis_mark_cropped.png" alt="Mantis" className="h-14 w-14 object-contain" />
          </span>
          <span className="hidden sm:flex h-8 w-[138px] items-center overflow-hidden">
            <img src="/mantis_wordmark_mantis_only.png" alt="Mantis wordmark" className="h-8 w-auto object-contain" />
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className="link-hover min-h-11 px-3 sm:px-4 py-2 rounded-full text-sm font-medium no-underline flex items-center gap-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: active ? 600 : 500,
                }}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
