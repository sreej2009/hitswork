import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { featuredCourses } from '../../data/courses'
import { ConstellationSkillIcon } from '../skill-universe/icons'
import { FeaturedPreview } from './FeaturedPreview'
import './featured-courses.css'

const categories = [
  { name: 'All', skill: 'All', icon: null },
  { name: 'Development', skill: 'Development', icon: 'development' },
  { name: 'AI & Machine Learning', skill: 'AI & Machine Learning', icon: 'ai-ml' },
  { name: 'Design', skill: 'UI / UX Design', icon: 'ui-ux' },
  { name: 'Data', skill: 'Data', icon: 'data' },
  { name: 'Marketing', skill: 'Marketing', icon: 'marketing' },
  { name: 'Cloud', skill: 'Cloud', icon: 'cloud' },
  { name: 'Business', skill: 'Business', icon: 'business' },
] as const
const artwork: Record<string, { image: string; badge: string }> = {
  'react-systems-design': { image: 'react', badge: 'Bestseller' },
  'applied-machine-learning': { image: 'ai', badge: 'Highest Rated' },
  'product-design-foundations': { image: 'design', badge: 'New' },
  'data-storytelling': { image: 'data', badge: 'Popular' },
  'cloud-infrastructure-at-scale': { image: 'cloud', badge: 'Advanced' },
  'growth-marketing-systems': { image: 'marketing', badge: 'Trending' },
}
const orderedCourses = ['react-systems-design', 'applied-machine-learning', 'product-design-foundations', 'data-storytelling', 'cloud-infrastructure-at-scale', 'growth-marketing-systems'].map(slug => featuredCourses.find(course => course.slug === slug)!)
function Arrow({ back = false }: { back?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={back ? { rotate: '180deg' } : undefined}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function StatIcon({ index }: { index: number }) {
  return <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
    {index === 0 && <path d="m18 3 17 8-17 8-17-8Zm-10 12v12l10 6 10-6V15M34 12v13" />}
    {index === 1 && <><circle cx="14" cy="10" r="6" /><path d="M2 33v-5a12 12 0 0 1 24 0v5Zm24-29a6 6 0 0 1 0 12m3 6c5 2 5 7 5 11" /></>}
    {index === 2 && <><circle cx="18" cy="18" r="15" /><ellipse cx="18" cy="18" rx="7" ry="15" /><path d="M4 12h28M4 24h28" /></>}
    {index === 3 && <path d="m18 2 5 10 11 2-8 8 2 12-10-6-10 6 2-12-8-8 11-2Z" />}
  </svg>
}

export function CoursesSection() {
  const [category, setCategory] = useState('All')
  const [active, setActive] = useState(orderedCourses[0].slug)
  const [preview, setPreview] = useState(false)
  const [edges, setEdges] = useState({ start: true, end: false })
  const rail = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, moved: false, x: 0, left: 0 })
  const reduced = useReducedMotion()
  const courses = category === 'All' ? orderedCourses : orderedCourses.filter(course => course.skill === category)
  const reveal = (delay = 0) => ({ initial: reduced ? false as const : { opacity: 0, y: 15 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: reduced ? 0 : .65, delay: reduced ? 0 : delay, ease: [.16,1,.3,1] as const } })
  useEffect(() => {
    const el = rail.current
    if (!el) return
    const update = () => setEdges({ start: el.scrollLeft < 2, end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2 })
    const observer = new ResizeObserver(update)
    observer.observe(el)
    el.addEventListener('scroll', update, { passive: true }); update()
    return () => { observer.disconnect(); el.removeEventListener('scroll', update) }
  }, [category])
  function filter(skill: string) {
    setCategory(skill); setActive((skill === 'All' ? orderedCourses : orderedCourses.filter(c => c.skill === skill))[0]?.slug ?? '')
    rail.current?.scrollTo({ left: 0, behavior: 'instant' })
  }
  function step(direction: number) {
    const el = rail.current
    if (!el) return
    const width = (el.querySelector('article')?.getBoundingClientRect().width ?? 360) + 24
    el.scrollBy({ left: direction * width, behavior: reduced ? 'instant' : 'smooth' })
  }
  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    drag.current.moved = false
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    drag.current = { down: true, moved: false, x: event.clientX, left: event.currentTarget.scrollLeft }
  }
  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current.down) return
    const dx = event.clientX - drag.current.x
    if (Math.abs(dx) > 6 && !drag.current.moved) { drag.current.moved = true; event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.classList.add('is-dragging') }
    if (drag.current.moved) event.currentTarget.scrollLeft = drag.current.left - dx
  }
  function pointerUp(event: PointerEvent<HTMLDivElement>) {
    drag.current.down = false; event.currentTarget.classList.remove('is-dragging')
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  return <section className="featured-editorial" id="featured-courses" aria-labelledby="fc-heading">
    <div className="fc-shell fc-intro">
      <motion.div {...reveal(.2)} className="fc-workspace"><img src={`${import.meta.env.BASE_URL}images/featured/workspace.webp`} alt="Creator working at dual monitors in a blue-lit studio" loading="lazy" width="1200" height="800" /></motion.div>
      <div className="fc-copy">
        <motion.p {...reveal()} className="fc-eyebrow"><span />Featured Courses</motion.p>
        <h2 id="fc-heading"><motion.span {...reveal(.05)}>Learn from <em>real experts,</em></motion.span><motion.span {...reveal(.1)}>not stock content.</motion.span></h2>
        <motion.p {...reveal(.15)} className="fc-description">Editorial-grade courses designed by industry professionals,<br />not just recycled content.</motion.p>
        <motion.div {...reveal(.2)} className="fc-intro-actions"><Link to="/explore" className="fc-browse">Browse all courses <Arrow /></Link><button onClick={() => setPreview(true)} className="fc-trailer"><span>▶</span>Watch Trailer</button></motion.div>
      </div>
      <div className="fc-handwritten fc-top-note" aria-hidden="true">Real<br />Skills for<br />a Brighter<br />Tomorrow<svg viewBox="0 0 60 65" fill="none"><path d="M10 3c0 27 13 34 36 41m-10-12 12 14-18 2" stroke="currentColor" strokeWidth="1.2" /></svg></div>
      <p className="fc-edge-copy" aria-hidden="true">Learn<br />Create<br />Build<br />Belong<span /></p>
      <blockquote className="fc-quote">“Better<br />Learning<br />Real Careers”<cite>— Hitswork</cite></blockquote>
    </div>
    <motion.div {...reveal(.25)} className="fc-shell fc-navigation">
      <nav className="fc-categories" aria-label="Featured course categories">
        {categories.map(item => <button key={item.name} aria-pressed={category === item.skill} onClick={() => filter(item.skill)}>{item.icon ? <ConstellationSkillIcon icon={item.icon} /> : <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z" /></svg>}{item.name}</button>)}
      </nav>
      <div className="fc-controls"><button aria-label="Previous courses" disabled={edges.start} onClick={() => step(-1)}><Arrow back /></button><button aria-label="Next courses" disabled={edges.end} onClick={() => step(1)}><Arrow /></button></div>
    </motion.div>
    <div className="fc-rail" ref={rail} role="region" aria-roledescription="carousel" aria-label="Featured courses" tabIndex={0}
      onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}
      onLostPointerCapture={() => { drag.current.down = false; rail.current?.classList.remove('is-dragging') }}
      onPointerLeave={() => { if (!drag.current.moved) drag.current.down = false }} onDragStart={event => event.preventDefault()}
      onClickCapture={event => { if (drag.current.moved && event.detail > 0) { event.preventDefault(); event.stopPropagation() } }}
      onKeyDown={event => { if (event.target === event.currentTarget && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) { event.preventDefault(); step(event.key === 'ArrowRight' ? 1 : -1) } }}>
      {courses.map((course, index) => <motion.article {...reveal(index * .055)} key={course.slug} className={`fc-course-wrap${active === course.slug ? ' is-active' : ''}`} onMouseMove={() => { if (!drag.current.down) setActive(course.slug) }} onFocus={() => setActive(course.slug)}>
        <Link className="fc-course" to={`/courses/${course.slug}`} draggable={false}>
          <div className="fc-course-image"><img src={`${import.meta.env.BASE_URL}images/featured/${artwork[course.slug].image}.webp`} alt="" width="760" height="507" loading="lazy" draggable={false} /><span className="fc-badge">{artwork[course.slug].badge}</span><span className="fc-duration"><span className="sr-only">{course.level}, </span>{course.duration}</span></div>
          <div className="fc-course-copy"><h3>{course.title}</h3><p>{course.summary}</p>
            <div className="fc-course-footer"><span className="fc-avatar" aria-hidden="true">{course.instructor.split(' ').map(name => name[0]).join('')}</span><div className="fc-instructor"><span>{course.instructor}</span><small><b>★</b> {course.rating} <span>({course.students.toLocaleString('en-US')} students)</span></small></div><strong className="fc-price">${course.price}</strong><span className="fc-course-arrow"><Arrow /></span></div>
          </div>
        </Link>
      </motion.article>)}
      {!courses.length && <div className="fc-empty"><h3>More business courses are on the way.</h3><p>Explore the courses available now, or choose another category.</p><button onClick={() => filter('All')}>View all featured courses <Arrow /></button></div>}
    </div>
    <motion.div {...reveal(.15)} className="fc-shell fc-footer">
      <dl className="fc-stats">{[['1,200+', 'Courses'], ['500+', 'Expert Instructors'], ['120+', 'Countries'], ['4.8', 'Average Rating']].map(([value,label],index) => <div key={label}><StatIcon index={index} /><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <div className="fc-handwritten fc-bottom-note" aria-hidden="true">Invest<br />In a Smarter You<svg viewBox="0 0 180 32" fill="none"><path d="M4 28c58-13 92-18 165-15m-10-7 12 7-13 5" stroke="currentColor" strokeWidth="1.1" /></svg></div><p className="fc-impact" aria-hidden="true">Skills<br />Opportunities<br />Real Impact</p>
    </motion.div>
    {preview && <FeaturedPreview onClose={() => setPreview(false)} />}
  </section>
}
