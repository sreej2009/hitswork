import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Logo } from '../ui/Logo'
import { FooterDialog } from './FooterDialog'
import './footer.css'

const platform = [['Explore', '/explore'], ['Learning Paths', '/learning-paths'], ['Projects', '/projects'], ['Courses', '/explore'], ['Certificates', '/certificates']]
const learn = ['Development', 'AI & Machine Learning', 'Design', 'Data', 'Marketing', 'Cloud']
function Arrow() { return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> }
function SocialIcon({ name }: { name: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    {name === 'LinkedIn' && <><path d="M5 9v11m5 0V9h4v2c4-5 7-1 7 2v7m-7 0v-7" /><circle cx="5" cy="5" r="1.5" fill="currentColor" /></>}
    {name === 'Instagram' && <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>}
    {name === 'YouTube' && <><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" /><path d="m10 9 5 3-5 3Z" fill="#030914" stroke="none" /></>}
    {name === 'GitHub' && <path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.2 19.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.2 1 2.9.8.1-.6.4-1 .6-1.2-2.2-.3-4.5-1.1-4.5-5A4 4 0 0 1 6 9.1c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.5 9.5 0 0 1 5.2 0c2-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a4 4 0 0 1 1.1 2.8c0 3.9-2.3 4.7-4.5 5 .4.3.7 1 .7 1.9v2.7A10 10 0 0 0 12 2Z" />}
  </svg>
}

export function Footer() {
  const reduced = useReducedMotion()
  const [topic, setTopic] = useState<string | null>(null)
  const [newsletterStatus, setNewsletterStatus] = useState('')
  const scene = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ctaRef, offset: ['start end', 'end start'] })
  const artY = useTransform(scrollYProgress, [0, 1], [26, -26])
  const portalGlow = useTransform(scrollYProgress, [0, 0.55], [0.35, 1])
  const reveal = (delay = 0) => ({ initial: reduced ? false as const : { opacity: 0, y: 15 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: reduced ? 0 : .8, delay: reduced ? 0 : delay, ease: [.16,1,.3,1] as const } })
  return <footer className="chapter-footer" id="next-chapter">
    <section className="chapter-cta" ref={ctaRef} aria-labelledby="chapter-title" onPointerMove={event => {
      if (reduced || event.pointerType !== 'mouse') return
      const rect = event.currentTarget.getBoundingClientRect()
      scene.current?.style.setProperty('--scene-x', `${(event.clientX - rect.left) / rect.width * 4 - 2}px`)
      scene.current?.style.setProperty('--scene-y', `${(event.clientY - rect.top) / rect.height * 4 - 2}px`)
    }} onPointerLeave={() => { scene.current?.style.setProperty('--scene-x', '0px'); scene.current?.style.setProperty('--scene-y', '0px') }}>
      <motion.div {...reveal(.2)} className="chapter-art">
        <motion.div className="chapter-art-parallax" style={reduced ? undefined : { y: artY }}>
          <div ref={scene} className="chapter-scene">
            <img src={`${import.meta.env.BASE_URL}images/footer/next-chapter.webp`} width="1440" height="960" loading="lazy" alt="A back-facing learner approaches illuminated mountain stairs and a glowing rectangular portal overlooking a future city" />
            <motion.span className="chapter-portal-glow" aria-hidden="true" style={reduced ? { opacity: 0.75 } : { opacity: portalGlow }} />
            <div className="chapter-fog" aria-hidden="true" />
            <div className="chapter-stair-light" aria-hidden="true" />
            <p className="chapter-portal-message">A<br />Brighter<br />You<br />A<br />Bigger<br />Tomorrow</p>
          </div>
        </motion.div>
      </motion.div>
      <div className="chapter-shell chapter-content">
        <div className="chapter-copy">
          <motion.p {...reveal()} className="chapter-eyebrow"><span />Your Next Chapter</motion.p>
          <h2 id="chapter-title"><motion.span {...reveal(.06)}>Ready to make</motion.span><motion.span {...reveal(.12)}>your <em>skills</em> work?</motion.span></h2>
          <motion.p {...reveal(.18)} className="chapter-description">Start learning with purpose.<br />Build real skills. Create real work. Move forward.</motion.p>
          <motion.div {...reveal(.24)} className="chapter-actions"><Link to="/explore" className="chapter-start">Start Learning <Arrow /></Link><button className="chapter-story" onClick={() => setTopic('Our story')}><span className="chapter-play">▶</span><span>Watch our story</span></button></motion.div>
        </div>
        <div className="chapter-note" aria-hidden="true">Same<br />Curiosity<br />Bigger<br />Possibilities<svg viewBox="0 0 70 55" fill="none"><path d="M7 3c6 25 28 31 49 32m-10-9 12 10-15 5" stroke="currentColor" strokeWidth="1.1" /></svg></div>
        <p className="chapter-edge" aria-hidden="true">Learn<br />Build<br />Belong<span /></p>
        <p className="chapter-opportunities" aria-hidden="true">Skills<br />Create<br />Opportunities<span /></p>
        {/* <motion.dl {...reveal(.3)} className="chapter-stats">{[['1,200+', 'Courses'], ['500+', 'Expert Instructors'], ['120+', 'Countries'], ['4.8', 'Average Rating']].map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</motion.dl> */}
      </div>
    </section>
    <div className="chapter-divider" aria-hidden="true"><span /></div>
    <div className="chapter-shell">
      <motion.div {...reveal(.08)} className="chapter-footer-grid">
        <div className="chapter-brand"><Link to="/" aria-label="Hitswork home"><Logo /></Link><p>A premium learning universe<br />for people who build real things.</p><div className="chapter-socials">{['LinkedIn', 'Instagram', 'YouTube', 'GitHub'].map(name => <button key={name} aria-label={name} onClick={() => setTopic(name)}><SocialIcon name={name} /></button>)}</div></div>
        <nav aria-label="Footer platform" className="chapter-links"><h3>Platform</h3><ul>{platform.map(([label,to]) => <li key={label}><Link to={to}>{label}</Link></li>)}</ul></nav>
        <nav aria-label="Footer learning domains" className="chapter-links"><h3>Learn</h3><ul>{learn.map(label => <li key={label}><Link to="/explore">{label}</Link></li>)}</ul></nav>
        <nav aria-label="Footer company" className="chapter-links"><h3>Company</h3><ul>{['About', 'Careers', 'Contact'].map(label => <li key={label}><button onClick={() => setTopic(label)}>{label}</button></li>)}<li><Link to="/instructor">Become an Instructor</Link></li></ul></nav>
        <div className="chapter-newsletter"><h3>Stay in the loop.</h3><p>New paths, practical insights and opportunities —<br />straight to your inbox.</p><form onSubmit={event => { event.preventDefault(); setNewsletterStatus('Newsletter sign-ups are not available yet. Your email has not been sent or saved.') }}>
          <div className="chapter-email"><label className="sr-only" htmlFor="chapter-email">Email address</label><input id="chapter-email" name="email" type="email" placeholder="Enter your email" autoComplete="email" required /><button type="submit" aria-label="Subscribe to newsletter"><Arrow /></button></div>
          <label className="chapter-consent"><input name="consent" type="checkbox" required /><span>I agree to receive updates from Hitswork.</span></label>
          <p role="status" className="chapter-newsletter-status">{newsletterStatus}</p>
        </form></div>
      </motion.div>
      <div className="chapter-bottom"><p>© {new Date().getFullYear()} Hitswork. All rights reserved.</p><p className="chapter-mantra">Learn / Build / Prove / Grow</p><nav aria-label="Legal">{['Privacy', 'Terms', 'Cookies'].map(label => <button key={label} onClick={() => setTopic(label)}>{label}</button>)}</nav></div>
    </div>
    {topic && <FooterDialog topic={topic} onClose={() => setTopic(null)} />}
  </footer>
}
