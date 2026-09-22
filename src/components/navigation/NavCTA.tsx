import { useRef } from 'react'
import { Link } from 'react-router-dom'

export function NavCTA({ to = '/explore', className = '' }: { to?: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.22}px)`
  }

  function handleLeave() {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <Link
      ref={ref}
      to={to}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-b from-[#5D93FF] to-[#2E68F0] px-4 py-[9px] text-[13.5px] font-semibold tracking-[-0.01em] text-white shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_10px_24px_-10px_rgba(46,104,240,0.7)] transition-[transform,box-shadow,filter] duration-300 ease-out hover:-translate-y-[1.5px] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_16px_32px_-10px_rgba(61,123,255,0.85)] hover:brightness-[1.06] active:translate-y-0 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
      />
      Get Started
      <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
    </Link>
  )
}
