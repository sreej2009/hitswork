import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ConstellationSkillIcon } from '../skill-universe/icons'
import { milestoneNames, pathJourneys } from './pathJourneys'
import { PathMountain, PathVisual } from './PathArtwork'
import './learning-paths.css'

gsap.registerPlugin(ScrollTrigger)

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function PathIcon({ icon }: { icon: (typeof pathJourneys)[number]['icon'] }) {
  if (icon === 'layers') return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="m16 3 14 8-14 8-14-8Zm-14 15 14 8 14-8M2 25l14 7 14-7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  if (icon === 'megaphone') return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="m5 13 19-8 3 21-20-4ZM9 23l3 8h5l-3-9M24 5l-1-3m5 10 3-2m-3 8h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
  return <ConstellationSkillIcon icon={icon} />
}

function StatIcon({ index }: { index: number }) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {index === 0 && <><circle cx="16" cy="16" r="13" /><path d="M16 7v10l6 4" /></>}
    {index === 1 && <path d="M16 7C11 3 6 4 3 6v22c4-3 9-3 13 0 4-3 9-3 13 0V6c-3-2-8-3-13 1Zm0 0v21" />}
    {index === 2 && <><path d="M7 3h14l6 6v21H7Zm14 0v7h6M11 16h12m-12 5h12" /></>}
    {index === 3 && <><circle cx="12" cy="10" r="5" /><path d="M2 29v-3a10 10 0 0 1 20 0v3Zm20-24a5 5 0 0 1 0 10m3 5c4 1 5 4 5 8" /></>}
  </svg>
}

export function LearningPathsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = pathJourneys[activeIndex]
  const reducedMotion = useReducedMotion()
  const journeyRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const milestonesRef = useRef<HTMLOListElement>(null)
  const progressFillRef = useRef<HTMLSpanElement>(null)
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false as const : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 },
    transition: { duration: reducedMotion ? 0 : .65, delay: reducedMotion ? 0 : delay, ease: [.16, 1, .3, 1] as const },
  })

  function selectPath(index: number) {
    setActiveIndex(index)
    journeyRef.current?.scrollTo({ left: 0, behavior: 'instant' })
  }

  // Strongest scroll interaction on the page: as the page scrolls through
  // this section, draw a progress line across the milestone row and light
  // up stages/connectors in sequence. Purely additive on top of the
  // existing click-to-select path system — never overrides `.is-current`.
  useEffect(() => {
    if (reducedMotion) return
    const stageWraps = milestonesRef.current?.querySelectorAll<HTMLElement>('.lp-stage-wrap')
    const connectors = milestonesRef.current?.querySelectorAll<HTMLElement>('.lp-connector')
    if (!stageWraps || !stageWraps.length) return

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 72%',
      end: 'bottom 60%',
      scrub: 0.8,
      onUpdate(self) {
        const progress = self.progress
        if (progressFillRef.current) progressFillRef.current.style.width = `${progress * 100}%`
        const litIndex = Math.min(stageWraps.length - 1, Math.floor(progress * stageWraps.length))
        stageWraps.forEach((el, i) => el.classList.toggle('is-scroll-lit', i <= litIndex))
        connectors?.forEach((el, i) => el.classList.toggle('is-scroll-lit', i < litIndex))
      },
    })

    return () => trigger.kill()
  }, [active.slug, reducedMotion])

  return <section id="learning-paths" className="learning-journey" aria-labelledby="lp-heading" ref={sectionRef}>
    <div className="lp-blueprint" aria-hidden="true" />
    <div className="lp-shell">
      <div className="lp-header">
        <motion.div {...reveal(.25)} className="lp-art"><PathMountain /></motion.div>
        <p className="lp-editorial" aria-hidden="true">Skills<br />Create<br />Opportunities</p>
        <motion.p {...reveal()} className="lp-eyebrow"><span />Learning Paths</motion.p>
        <h2 id="lp-heading"><motion.span {...reveal(.06)}>DON’T JUST LEARN.</motion.span><motion.span {...reveal(.12)}><em>BUILD</em> YOUR WAY FORWARD.</motion.span></h2>
        <motion.p {...reveal(.18)} className="lp-description">Structured paths that take you from fundamentals to real-world capability —<br />one milestone at a time.</motion.p>
      </div>

      <div className="lp-layout">
        <nav className="lp-selector" aria-label="Choose a career path">
          {pathJourneys.map((path, index) => <motion.button {...reveal(.2 + index * .05)} key={path.slug} type="button"
            className={`lp-path${activeIndex === index ? ' is-selected' : ''}`} aria-pressed={activeIndex === index} aria-controls="lp-journey-panel"
            onClick={() => selectPath(index)}>
            <span className="lp-path-icon"><PathIcon icon={path.icon} /></span>
            <span className="lp-path-copy"><strong>{path.title}</strong><span>{path.summary}</span></span>
            <span className="lp-path-arrow"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </motion.button>)}
        </nav>

        <div id="lp-journey-panel" className="lp-panel" role="region" aria-label={`${active.title} learning journey`}>
          <p className="sr-only" role="status">{active.title}: {active.time}, {active.courses} courses, {active.projects} real projects.</p>
          <motion.dl {...reveal(.3)} className="lp-stats">
            {[[active.time, 'Estimated time'], [active.courses, 'Courses'], [active.projects, 'Real Projects'], ['Job Ready', 'Career Outcome']].map(([value, label], index) => <div key={label}><StatIcon index={index} /><dt>{label}</dt><dd>{value}</dd></div>)}
          </motion.dl>

          <div ref={journeyRef} className="lp-milestone-scroll" tabIndex={0} aria-label="Learning milestones, scroll horizontally for more" data-lenis-prevent-wheel
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget) return
              if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault(); event.currentTarget.scrollBy({ left: event.key === 'ArrowRight' ? 220 : -220, behavior: reducedMotion ? 'instant' : 'smooth' })
              }
            }}>
            {!reducedMotion && (
              <div className="lp-scroll-progress" aria-hidden="true">
                <span ref={progressFillRef} className="lp-scroll-progress-fill" />
              </div>
            )}
            <ol className="lp-milestones" key={active.slug} ref={milestonesRef}>
              {active.milestones.map((items, index) => {
                const completed = index === 0 ? active.completed : 0
                return <motion.li key={`${active.slug}-${index}`} {...reveal(index * .06)} initial={reducedMotion ? false : { opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} className={`lp-stage-wrap${index === 0 ? ' is-current' : ''}`}>
                  <Link to={`/learning-paths/${active.slug}`} className="lp-stage" aria-label={`${milestoneNames[index]}: ${items.join(', ')}. ${completed} of ${items.length} completed`}>
                    <div className="lp-stage-top"><span>{String(index + 1).padStart(2, '0')}</span><span className={`lp-status${completed === items.length ? ' is-complete' : ''}`} aria-hidden="true">{completed === items.length && <svg viewBox="0 0 20 20" fill="none"><path d="m5 10 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}</span></div>
                    <PathVisual stage={index} />
                    <h3>{milestoneNames[index]}</h3>
                    <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
                    <div className="lp-stage-progress"><div className="lp-progress-track" role="progressbar" aria-label={`${milestoneNames[index]} completion`} aria-valuemin={0} aria-valuemax={items.length} aria-valuenow={completed}><span style={{ width: `${completed / items.length * 100}%` }} /></div><p>{completed} / {items.length} completed</p></div>
                  </Link>
                  {index < 5 && <span className="lp-connector" aria-hidden="true"><svg viewBox="0 0 20 32" fill="none"><path d="m5 5 10 11L5 27" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>}
                </motion.li>
              })}
            </ol>
          </div>

          <motion.div {...reveal(.4)} className="lp-bottom">
            <p className="lp-purpose">Learn with purpose.<br /><span>Build</span> with proof.</p>
            <div className="lp-actions"><Link className="lp-start" to={`/learning-paths/${active.slug}`}>Start This Path <Arrow /></Link><Link className="lp-browse" to="/learning-paths">Explore All Learning Paths <Arrow /></Link></div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
}
