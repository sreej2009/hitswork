import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export const navLinks = [
  { label: 'Explore', href: '/explore' },
  { label: 'Learning Paths', href: '/learning-paths' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/explore' },
]

function isActive(pathname: string, href: string) {
  const path = href.split('#')[0] || '/'
  if (path === '/') return pathname === '/' && !href.includes('#')
  return pathname.startsWith(path)
}

export function NavLinks() {
  const { pathname } = useLocation()

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {navLinks.map((link) => {
        const active = isActive(pathname, link.href)
        return (
          <Link
            key={link.href}
            to={link.href}
            className="group relative px-3.5 py-2 text-[14.5px] font-medium tracking-[-0.01em] text-ink-dim/90 transition-colors duration-300 hover:text-ink"
          >
            {link.label}
            <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-electric-2/70 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            {active && (
              <motion.span
                layoutId="nav-active-indicator"
                className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px bg-electric-2 shadow-[0_0_8px_1px_rgba(110,168,255,0.7)]"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
