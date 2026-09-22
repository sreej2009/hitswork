import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useDeviceCapability } from '../../hooks/useDeviceCapability'
import { HeroAtmosphere } from './HeroAtmosphere'
import { HeroStats } from './HeroStats'
import { HeroPrimaryCTA, HeroSecondaryCTA } from './HeroCTAs'

const LearningUniverse = lazy(() =>
  import('../3d/LearningUniverse').then((m) => ({ default: m.LearningUniverse })),
)

const revealTransition = { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }

export function Hero() {
  const { reducedMotion, lowPower } = useDeviceCapability()
  const scrollRef = useRef(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [bgVisible, setBgVisible] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setBgVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    function onScroll() {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const progress = Math.min(Math.max(-rect.top / (rect.height * 0.9), 0), 1)
      scrollRef.current = progress
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-void">
      <div className="absolute inset-0 transition-opacity duration-[1400ms]" style={{ opacity: bgVisible ? 1 : 0 }}>
        <HeroAtmosphere />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1680px] flex-col gap-10 px-6 pb-10 pt-28 sm:px-10 lg:flex-row lg:items-center lg:gap-6 lg:px-14 lg:pb-0 lg:pt-24 xl:px-20">
        {/* LEFT — marketing content */}
        <div className="flex w-full flex-col justify-center lg:w-[47%] lg:shrink-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...revealTransition, delay: 0.9 }}
            className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink-dim"
          >
            <span className="h-px w-6 bg-electric-2/60" />
            <span>
              <span className="text-ink">The Hitswork</span> Learning Universe
            </span>
          </motion.p>

          <h1 className="text-balance font-display text-[clamp(2.75rem,1.8vw+2.35rem,4.4rem)] font-bold leading-[1.03] tracking-tight text-ink">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 1.1 }}
            >
              MASTER SKILLS.
            </motion.span>
            <motion.span
              className="glow-text block text-electric-2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 1.25 }}
            >
              MAKE IT WORK.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...revealTransition, delay: 1.5 }}
            className="mt-6 max-w-md text-balance text-base leading-relaxed text-ink-dim"
          >
            Learn practical skills, build real projects, and turn knowledge into something that works.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...revealTransition, delay: 1.7 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <HeroPrimaryCTA />
            <HeroSecondaryCTA />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...revealTransition, delay: 1.9 }}
            className="mt-10 border-t border-white/[0.06] pt-6"
          >
            <HeroStats />
          </motion.div>
        </div>

        {/* RIGHT — 3D learning universe */}
        <div className="relative h-[320px] w-full overflow-hidden sm:h-[420px] lg:h-full lg:flex-1">
          <div className="absolute inset-0" style={{ opacity: bgVisible ? 1 : 0, transition: 'opacity 1.2s ease 0.3s' }}>
            <Suspense fallback={null}>
              <LearningUniverse scrollRef={scrollRef} reducedMotion={reducedMotion} lowPower={lowPower} />
            </Suspense>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.8 }}
            className="pointer-events-none absolute right-1 top-[34%] hidden -rotate-3 text-right lg:block xl:right-4"
          >
            <p className="font-display text-lg leading-tight text-ink-dim/60">More Skills</p>
            <p className="font-display text-lg leading-tight text-ink-dim/60">Brighter Future</p>
            <svg width="46" height="34" viewBox="0 0 46 34" fill="none" className="ml-auto mt-1 text-ink-faint/50">
              <path
                d="M42 3C34 4 18 9 8 22"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M13 20 7 23.5 8.5 16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* bottom decorative row — desktop only */}
      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-10 hidden grid-cols-[1fr_auto_1fr] items-end gap-6 px-10 lg:grid xl:px-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="justify-self-start"
        >
          <svg width="26" height="18" viewBox="0 0 26 18" fill="none" className="mb-2 text-electric-2/50">
            <path d="M1 1v9h9" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
          <p className="text-[10px] font-semibold uppercase leading-[1.7] tracking-[0.2em] text-ink-faint">
            Skills
            <br />
            Create
            <br />
            Opportunities
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.8 }}
          className="pointer-events-auto flex flex-col items-center gap-2.5 justify-self-center"
        >
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 p-1">
            <span className="h-1.5 w-1 rounded-full bg-electric-2" style={{ animation: 'scroll-dot 1.8s ease-in-out infinite' }} />
          </span>
          <p className="text-[10px] uppercase tracking-[0.3em] text-ink-faint">Scroll to Explore</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="flex items-center gap-3 justify-self-end"
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-ink-faint/40">Learn / Build / Prove / Grow</p>
          <span className="h-px w-8 bg-white/10" />
        </motion.div>
      </div>
    </section>
  )
}
