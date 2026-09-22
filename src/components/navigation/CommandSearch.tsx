import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { featuredCourses } from '../../data/courses'
import { skillCategories } from '../../data/skills'
import { learningPaths } from '../../data/learningPaths'

function useIsMac() {
  const [isMac, setIsMac] = useState(true)
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform ?? navigator.userAgent))
  }, [])
  return isMac
}

type ResultGroup = {
  label: string
  items: { title: string; subtitle: string; href: string }[]
}

export function CommandSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const isMac = useIsMac()

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onClose()
      }
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const groups: ResultGroup[] = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matches = (s: string) => !q || s.toLowerCase().includes(q)

    return [
      {
        label: 'Courses',
        items: featuredCourses
          .filter((c) => matches(c.title) || matches(c.skill))
          .map((c) => ({ title: c.title, subtitle: `${c.skill} · ${c.instructor}`, href: `/courses/${c.slug}` })),
      },
      {
        label: 'Skills',
        items: skillCategories
          .filter((s) => matches(s.name))
          .map((s) => ({ title: s.name, subtitle: `${s.courseCount} courses`, href: `/explore` })),
      },
      {
        label: 'Learning Paths',
        items: learningPaths
          .filter((p) => matches(p.title))
          .map((p) => ({ title: p.title, subtitle: p.description, href: `/learning-paths/${p.slug}` })),
      },
    ].filter((g) => g.items.length > 0)
  }, [query])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[#020204]/80 backdrop-blur-sm px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-label="Search Hitswork"
            className="relative w-full max-w-xl overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0a0c12]/90 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9),0_0_70px_-30px_rgba(61,123,255,0.4)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(61,123,255,0.14),transparent_70%)]"
            />
            <div className="relative flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-electric-2/80">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, skills, learning paths…"
                className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint outline-none"
              />
              <kbd className="rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-ink-faint">
                esc
              </kbd>
            </div>

            <div className="relative max-h-[50vh] overflow-y-auto p-2">
              {groups.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-ink-faint">No results yet.</p>
              )}
              {groups.map((group) => (
                <div key={group.label} className="mb-1">
                  <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => {
                        navigate(item.href)
                        onClose()
                      }}
                      className="group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-electric-2/0 shadow-[0_0_6px_1px_rgba(110,168,255,0)] transition-all duration-200 group-hover:bg-electric-2 group-hover:shadow-[0_0_6px_1px_rgba(110,168,255,0.8)]" />
                      <span className="flex flex-col items-start">
                        <span className="text-sm font-medium text-ink">{item.title}</span>
                        <span className="text-xs text-ink-faint">{item.subtitle}</span>
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <div className="relative flex items-center justify-end gap-2 border-t border-white/[0.06] px-5 py-2.5 text-[11px] text-ink-faint/70">
              Navigate with ↑↓ · Open with ⏎ · Close with
              <kbd className="rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[10px]">
                {isMac ? '⌘K' : 'Ctrl K'}
              </kbd>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
