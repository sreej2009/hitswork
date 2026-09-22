import { useEffect, useState } from 'react'

function useIsMac() {
  const [isMac, setIsMac] = useState(true)
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform ?? navigator.userAgent))
  }, [])
  return isMac
}

/** Full search trigger with label — shown alongside the rest of the desktop nav at lg+. */
export function SearchButton({ onOpen }: { onOpen: () => void }) {
  const isMac = useIsMac()

  return (
    <button
      onClick={onOpen}
      className="group hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] py-[7px] pl-3 pr-2 text-ink-faint transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.04] hover:text-ink-dim focus-visible:border-electric-2/50 lg:flex"
    >
      <SearchIcon />
      <span className="text-[13px]">Search</span>
      <kbd className="ml-1 rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 font-sans text-[10px] text-ink-faint/80">
        {isMac ? '⌘K' : 'Ctrl K'}
      </kbd>
    </button>
  )
}

/** Icon-only search trigger for mobile and the tablet-width range where the full nav is collapsed. */
export function SearchIconButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-dim transition-colors hover:text-ink lg:hidden"
      aria-label="Search"
    >
      <SearchIcon />
    </button>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
