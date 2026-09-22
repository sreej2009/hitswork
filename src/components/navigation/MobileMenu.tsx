import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { navLinks } from './NavLinks'

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[60] flex flex-col bg-[#050609] lg:hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(61,123,255,0.16),transparent_65%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.35) 0.5px, transparent 0.5px)',
              backgroundSize: '26px 26px',
              maskImage: 'radial-gradient(70% 60% at 50% 30%, black, transparent)',
            }}
          />

          <div className="relative z-10 flex items-center justify-end px-6 pt-6">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-dim transition-colors hover:border-white/20 hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 flex flex-1 flex-col justify-center gap-2 px-8"
          >
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={itemVariants} className="overflow-hidden">
                <Link
                  to={link.href}
                  onClick={onClose}
                  className="block py-2 font-display text-[2.6rem] font-semibold leading-none tracking-tight text-ink transition-colors hover:text-electric-2"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 flex flex-col gap-4 px-8 pb-12"
          >
            <motion.div variants={itemVariants}>
              <Link
                to="/dashboard"
                onClick={onClose}
                className="block text-sm font-medium text-ink-dim transition-colors hover:text-ink"
              >
                Log in
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                to="/explore"
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-[#5D93FF] to-[#2E68F0] py-3.5 text-[15px] font-semibold text-white shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_14px_30px_-10px_rgba(46,104,240,0.7)]"
              >
                Start Learning
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
