import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, PlayIcon } from './icons'

export function HeroPrimaryCTA({ to = '/explore' }: { to?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * 0.08}px, ${y * 0.16}px)`
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
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#5D93FF] to-[#2E68F0] px-7 py-3.5 text-[15px] font-semibold tracking-[-0.01em] text-white shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_18px_40px_-16px_rgba(46,104,240,0.75)] transition-[transform,box-shadow,filter] duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_24px_50px_-14px_rgba(61,123,255,0.9)] hover:brightness-[1.06] active:translate-y-0"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
      />
      Start Learning
      <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">
        <ArrowRightIcon className="h-4 w-4" />
      </span>
    </Link>
  )
}

export function HeroSecondaryCTA({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.14] bg-white/[0.03] px-6 py-3.5 text-[15px] font-medium text-ink transition-colors duration-300 hover:border-white/[0.24] hover:bg-white/[0.06]"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.1] text-ink transition-colors group-hover:bg-white/[0.16]">
        <PlayIcon className="h-3 w-3 translate-x-[1px]" />
      </span>
      Watch Video
    </button>
  )
}
