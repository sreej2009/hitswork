import { lazy, Suspense, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { FooterDialog } from '../navigation/FooterDialog'
import emblem from '../../assets/Images/hitswork-icon.png'
import './about.css'

const AboutArtifact = lazy(() => import('./AboutArtifact').then(module => ({ default: module.AboutArtifact })))
const cards = [
  { title: 'Learn', lines: ['New Skills', 'New Possibilities'], to: '/explore' },
  { title: 'Build', lines: ['Turn Knowledge', 'Into Work'], to: '/learning-paths' },
  { title: 'Create', lines: ['Real Projects', 'Real Impact'], to: '/projects' },
  { title: 'Grow', lines: ['A Brighter', 'You'], to: '/certificates' },
]
function AboutIcon({ index }: { index: number }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
    {index === 0 && <path d="M16 7C11 3 6 4 3 6v22c4-3 9-3 13 0 4-3 9-3 13 0V6c-3-2-8-3-13 1Zm0 0v21" />}
    {index === 1 && <path d="M4 28V18h5v10Zm10 0V10h5v18Zm10 0V3h5v25Z" />}
    {index === 2 && <path d="m16 3 13 7v15l-13 7-13-7V10Zm0 14v15M3 10l13 7 13-7M16 3v14" />}
    {index === 3 && <><circle cx="12" cy="10" r="5" /><path d="M2 29v-3a10 10 0 0 1 20 0v3Zm20-24a5 5 0 0 1 0 10m3 5c4 1 5 4 5 8" /></>}
    {index === 4 && <><circle cx="15" cy="17" r="11" /><circle cx="15" cy="17" r="6" /><path d="m15 17 12-13m-6 1 6-1-1 6" /></>}
    {index === 5 && <path d="M6 3h20v27H6Zm5 6h11m-11 5h11m-11 5h11m-11 5h8" />}
    {index === 6 && <><rect x="3" y="10" width="26" height="19" rx="2" /><path d="M11 10V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3M3 18h26m-13-3v6" /></>}
  </svg>
}
export function AboutSection() {
  const section = useRef<HTMLElement>(null)
  const visual = useRef<HTMLDivElement>(null)
  const near = useInView(section, { margin: '200px', once: true })
  const visible = useInView(section, { margin: '50px' })
  const reduced = useReducedMotion() ?? false
  const [story, setStory] = useState(false)
  const reveal = (delay = 0) => ({ initial: reduced ? false as const : { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: reduced ? 0 : .8, delay: reduced ? 0 : delay, ease: [.16,1,.3,1] as const } })
  return <section ref={section} id="about-hitswork" className="about-hitswork" aria-labelledby="about-title">
    <div className="about-architecture" aria-hidden="true" />
    <div className="about-main">
      <div className="about-copy">
        <motion.p {...reveal()} className="about-eyebrow"><span />About Hitswork</motion.p>
        <h2 id="about-title"><motion.span {...reveal(.06)}>LEARN WITH</motion.span><motion.span {...reveal(.12)}>PURPOSE.</motion.span><motion.span {...reveal(.18)}>BUILD WITH <em>PROOF.</em></motion.span></h2>
        <motion.p {...reveal(.24)} className="about-description">Hitswork is a learning platform built for people who don’t just want to consume knowledge — they want to build real skills, create real work, and move forward with confidence.</motion.p>
        <motion.div {...reveal(.3)} className="about-actions"><Link to="/explore" className="about-discover">Discover Hitswork <span aria-hidden="true">→</span></Link><button className="about-story" onClick={() => setStory(true)}><span aria-hidden="true">▶</span><span>Watch our story</span></button></motion.div>
      </div>
      <div className="about-visual" onPointerMove={event => {
        if (reduced || event.pointerType !== 'mouse' || window.innerWidth < 1024) return
        const bounds = event.currentTarget.getBoundingClientRect()
        visual.current?.style.setProperty('--about-x', `${((event.clientX-bounds.left)/bounds.width-.5)*6}px`)
        visual.current?.style.setProperty('--about-y', `${((event.clientY-bounds.top)/bounds.height-.5)*6}px`)
      }} onPointerLeave={() => { visual.current?.style.setProperty('--about-x','0px'); visual.current?.style.setProperty('--about-y','0px') }}>
        <div className="about-visual-inner" ref={visual}>
          <div className="about-atmosphere" aria-hidden="true" />
          <div className="about-canvas" role="img" aria-label="The Hitswork emblem surrounded by illuminated elliptical rings above a dark metallic pedestal">
            <Suspense fallback={<img src={emblem} alt="" className="about-artifact-fallback" />}>{near && <AboutArtifact reduced={reduced} visible={visible} />}</Suspense>
          </div>
          <div className="about-floating-cards">{cards.map((card,index) => <motion.div {...reveal(.4 + index*.1)} key={card.title} className={`about-card-position about-card-${card.title.toLowerCase()}`}><Link to={card.to} className="about-floating-card"><AboutIcon index={index} /><div><h3>{card.title}</h3><p>{card.lines[0]}<br />{card.lines[1]}</p></div></Link></motion.div>)}</div>
          <div className="about-pedestal-label" aria-hidden="true"><strong>Hitswork</strong><span>Learn • Build • Grow</span></div>
        </div>
      </div>
    </div>
    <p className="about-editorial about-editorial-right" aria-hidden="true">Skills<br />People<br />Projects<br />Opportunities<span /></p>
    <p className="about-editorial about-editorial-left" aria-hidden="true">Same<br />Learners<br />Bigger<br />Tomorrows<span /></p>
    <div className="about-values" id="about-values">{[
      ['Practical', 'Learn skills you can', 'actually use.'],
      ['Project-driven', 'Turn knowledge into', 'real work.'],
      ['Career-focused', 'Build toward opportunities', 'that matter.'],
    ].map(([title,line1,line2],index) => <motion.div {...reveal(.1 + index*.08)} className="about-value" key={title}><span className="about-value-number">0{index+1}</span><span className="about-value-icon"><AboutIcon index={index+4} /></span><div><h3>{title}</h3><p>{line1}<br />{line2}</p></div></motion.div>)}</div>
    {story && <FooterDialog topic="Our story" onClose={() => setStory(false)} />}
  </section>
}
