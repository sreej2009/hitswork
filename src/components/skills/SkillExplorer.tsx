import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useDeviceCapability } from '../../hooks/useDeviceCapability'
import { skillCategories } from '../../data/skills'
import { constellationCategoryStrip } from '../../data/skillConstellation'
import './skill-explorer.css'

const SkillConstellation = lazy(() =>
  import('../3d/SkillConstellation').then((module) => ({ default: module.SkillConstellation })),
)

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={back ? { transform: 'rotate(180deg)' } : undefined}>
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SkillExplorer() {
  const reducedMotionPref = useReducedMotion()
  const { reducedMotion, lowPower } = useDeviceCapability()
  const sectionRef = useRef<HTMLElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [category, setCategory] = useState<string>('all')
  const [canvasReady, setCanvasReady] = useState(false)
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number } | null>(null)

  const activeId = hoveredId ?? (category !== 'all' ? category : null)
  const activeCategory = activeId ? skillCategories.find((c) => c.id === activeId) : null

  const reveal = (delay = 0) => ({
    initial: reducedMotionPref ? (false as const) : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotionPref ? 0 : 0.65, delay: reducedMotionPref ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  // Mount the 3D scene only once its container has committed final layout,
  // and near the viewport — see SkillConstellation for why this matters
  // (a second <Canvas> on the page has been observed to size incorrectly
  // if mounted mid-transition).
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
    <section className="skill-discovery" aria-labelledby="discovery-title" id="skill-explorer">
      <div className="discovery-grid" aria-hidden="true" />
      <div className="discovery-shell discovery-heading">
        <motion.p {...reveal(0)} className="discovery-eyebrow">
          <span />
          Skill Explorer
        </motion.p>
        <h2 id="discovery-title">
          <motion.span {...reveal(0.06)}>EXPLORE WHAT</motion.span>
          <motion.span {...reveal(0.12)}>
            YOU CAN <em>BECOME.</em>
          </motion.span>
        </h2>
        <motion.p {...reveal(0.18)} className="discovery-description">
          From development and AI to design, data and business —<br className="discovery-desktop-break" /> choose a
          direction and start building the skills that move you forward.
        </motion.p>
        <div className="discovery-micro discovery-micro-top" aria-hidden="true">
          Skills
          <br />
          Create
          <br />
          Opportunities
        </div>
        <div className="discovery-note" aria-hidden="true">
          Different Skills.
          <br />A Brighter You.
          <svg viewBox="0 0 70 85" fill="none">
            <path d="M28 4c44 23 27 51 5 70m2-15-4 18 17-7" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>
        <div className="discovery-micro discovery-micro-side" aria-hidden="true">
          Learn
          <br />
          Build
          <br />
          Prove
          <br />
          Grow
        </div>
      </div>

      <motion.div {...reveal(0.22)} className="discovery-shell discovery-navigation">
        <nav className="discovery-categories" aria-label="Skill domains">
          {constellationCategoryStrip.map((item) => (
            <button key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: reducedMotionPref ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="discovery-shell discovery-universe-shell"
      >
        <div ref={canvasWrapRef} className="discovery-universe">
          {canvasReady && (
            <Suspense fallback={null}>
              <SkillConstellation
                scrollRef={scrollRef}
                reducedMotion={reducedMotion}
                lowPower={lowPower}
                activeId={activeId}
                onHoverNode={setHoveredId}
                size={canvasSize}
              />
            </Suspense>
          )}

          <div className="discovery-universe-hint" aria-hidden={!!activeCategory}>
            {activeCategory ? (
              <>
                <strong>{activeCategory.name}</strong>
                <span>{activeCategory.tagline}</span>
              </>
            ) : (
              <span>Hover a node to explore a domain</span>
            )}
          </div>
        </div>
      </motion.div>

      <div className="discovery-shell">
        <motion.div {...reveal(0.12)} className="discovery-footer">
     
          <Link to="/explore" className="discovery-cta">
            Explore All Skills <Arrow />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
