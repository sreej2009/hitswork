import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDeviceCapability } from '../../hooks/useDeviceCapability'
import { SkillUniverseAtmosphere } from './SkillUniverseAtmosphere'
import { CategoryStrip } from './CategoryStrip'
import { skillCategories } from '../../data/skills'

const SkillConstellation = lazy(() =>
  import('../3d/SkillConstellation').then((m) => ({ default: m.SkillConstellation })),
)

const reveal = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }

export function SkillUniverseSection() {
  const { reducedMotion, lowPower } = useDeviceCapability()
  const sectionRef = useRef<HTMLElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [canvasReady, setCanvasReady] = useState(false)
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number } | null>(null)

  const activeId = hoveredId ?? (selectedCategory !== 'all' ? selectedCategory : null)
  const activeCategory = activeId ? skillCategories.find((c) => c.id === activeId) : null

  // Defer the 3D canvas until its container is near the viewport and measured.
  useEffect(() => {
    const el = canvasWrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setCanvasReady(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Measure separately so the second canvas never inherits the hero's dimensions.
  useEffect(() => {
    const el = canvasWrapRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect
      if (box) setCanvasSize({ width: Math.round(box.width), height: Math.round(box.height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    function onScroll() {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.min(Math.max((vh - rect.top) / (rect.height + vh), 0), 1)
      scrollRef.current = progress
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-void py-24 sm:py-28 lg:py-36">
      <SkillUniverseAtmosphere />

      <div className="relative z-10 mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={reveal}
            className="flex w-full flex-col justify-center lg:w-[42%] lg:shrink-0"
          >
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink-dim">
              <span className="h-px w-6 bg-electric-2/60" />
              Explore Your Next Skill
            </p>
            <h2 className="text-balance font-display text-[clamp(2.25rem,2.2vw+1.6rem,3.6rem)] font-bold leading-[1.05] tracking-tight text-ink">
              FIND WHAT
              <br />
              YOU WANT TO <span className="text-electric-2">MASTER.</span>
            </h2>
            <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-ink-dim">
              Explore connected skills, discover learning paths, and find the right direction for your next move.
            </p>
            <div className="mt-8">
              <Link to="/explore" className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-electric-2 transition-colors hover:text-electric">
                Explore All Skills
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">→</span>
              </Link>
            </div>
          </motion.div>

          <div ref={canvasWrapRef} className="relative h-[360px] w-full overflow-hidden sm:h-[460px] lg:h-[620px] lg:flex-1">
            {canvasReady && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...reveal, duration: 1 }} className="absolute inset-0">
                <Suspense fallback={null}>
                  <SkillConstellation scrollRef={scrollRef} reducedMotion={reducedMotion} lowPower={lowPower} activeId={activeId} onHoverNode={setHoveredId} size={canvasSize} />
                </Suspense>
              </motion.div>
            )}
            <div className="pointer-events-none absolute left-4 top-4 max-w-[220px]">
              {activeCategory && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                  className="rounded-lg border border-electric-2/20 bg-[#0a0d16]/70 px-3 py-2 backdrop-blur-md"
                >
                  <p className="text-[11px] font-semibold text-ink">{activeCategory.name}</p>
                  <p className="text-[10.5px] text-ink-faint">{activeCategory.tagline}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
          transition={{ ...reveal, delay: 0.1 }} className="mt-14 border-t border-white/[0.06] pt-8 lg:mt-20"
        >
          <CategoryStrip selected={selectedCategory} onSelect={setSelectedCategory} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-40px' }}
          transition={{ ...reveal, delay: 0.2 }} className="mt-16 flex flex-col items-center gap-2 text-center lg:mt-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">One skill connects to another.</p>
          <Link to="/#skill-explorer" className="group inline-flex items-center gap-2 text-sm font-medium text-ink-dim transition-colors hover:text-ink">
            Explore the full skill map
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
