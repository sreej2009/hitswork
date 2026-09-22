import { type ReactNode, useRef } from 'react'
import clsx from 'clsx'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  onClick?: () => void
  href?: string
  className?: string
}

/** Button with a subtle magnetic pull toward the cursor on hover. */
export function Button({ children, variant = 'primary', onClick, href, className }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`
  }

  function handleLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }

  const classes = clsx(
    'relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-[transform,background-color,box-shadow] duration-300 ease-out',
    variant === 'primary' &&
      'bg-electric text-void shadow-[0_0_0_1px_rgba(61,123,255,0.4),0_18px_40px_-16px_rgba(61,123,255,0.6)] hover:shadow-[0_0_0_1px_rgba(110,168,255,0.6),0_22px_50px_-14px_rgba(61,123,255,0.75)]',
    variant === 'ghost' &&
      'border border-line-strong text-ink hover:border-electric-2/60 hover:text-electric-2',
    className,
  )

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={classes}
        style={{ transitionProperty: 'transform, background-color, box-shadow' }}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={classes}
    >
      {children}
    </button>
  )
}
