import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { Logo } from '../ui/Logo'
import { NavLinks } from './NavLinks'
import { NavCTA } from './NavCTA'
import { SearchButton, SearchIconButton } from './SearchButton'
import { MobileMenu } from './MobileMenu'

export function Navbar({ onSearchOpen }: { onSearchOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 56)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Extremely subtle 1-2px parallax drift toward the cursor — an ambient
  // detail, not an interaction affordance.
  useEffect(() => {
    function onMove(e: PointerEvent) {
      const el = panelRef.current
      if (!el) return
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      el.style.transform = `translate(${x * 1.5}px, ${0}px)`
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-[5%] pt-5">
      <div
        ref={panelRef}
        className={clsx(
          'relative flex w-full max-w-[1220px] items-center justify-between rounded-[20px] px-4 py-2.5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[450ms] ease-out sm:px-5',
          scrolled || menuOpen
            ? 'border border-white/[0.07] bg-[#07080c]/75 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.75),0_0_60px_-30px_rgba(61,123,255,0.35)] backdrop-blur-2xl'
            : 'border border-white/[0.04] bg-white/[0.015] shadow-[0_12px_40px_-28px_rgba(61,123,255,0.25)] backdrop-blur-md',
        )}
        style={{ transitionProperty: 'transform, background-color, border-color, box-shadow' }}
      >
        {/* ambient blue glow tying the panel to the 3D scene behind it */}
        <div
          aria-hidden
          className={clsx(
            'pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-[28px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(61,123,255,0.16),transparent_70%)] transition-opacity duration-500',
            scrolled ? 'opacity-100' : 'opacity-60',
          )}
        />

        <Link to="/" className="shrink-0 pl-1 pr-4">
          <Logo />
        </Link>

        <NavLinks />

        <div className="flex items-center gap-2 sm:gap-3">
          <SearchButton onOpen={onSearchOpen} />
          <SearchIconButton onOpen={onSearchOpen} />
          <Link
            to="/dashboard"
            className="hidden text-[13.5px] font-medium text-ink-dim/90 transition-colors hover:text-ink hover:underline hover:underline-offset-4 lg:block"
          >
            Log in
          </Link>
          <div className="hidden lg:block">
            <NavCTA />
          </div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center justify-center p-1.5 text-ink-dim lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}

function MenuIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}
