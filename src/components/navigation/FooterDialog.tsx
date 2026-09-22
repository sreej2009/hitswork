import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const chapters = [
  ['Same curiosity.', 'Every new skill begins with a question.'],
  ['Build real skills.', 'Turn learning into work you can show.'],
  ['Bigger possibilities.', 'Your next chapter starts with what you build today.'],
]
export function FooterDialog({ topic, onClose }: { topic: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [chapter, setChapter] = useState(0)
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const story = topic === 'Our story'
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    const dialog = ref.current
    dialog?.showModal(); document.body.style.overflow = 'hidden'
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus() }
  }, [])
  useEffect(() => {
    if (!story || !playing || chapter === 2) return
    const timeout = window.setTimeout(() => setChapter(value => value + 1), 5000)
    return () => clearTimeout(timeout)
  }, [chapter, playing, story])
  const info: Record<string, string> = {
    About: 'Hitswork is a learning universe for people who build real things. Explore practical courses, follow structured learning paths, and develop work you can show.',
    Careers: 'Career opportunities will appear here when they are available.',
    Contact: 'Contact information has not been published on this site yet.',
    Privacy: 'The privacy policy has not been published on this site yet. This newsletter form does not currently send or save your email address.',
    Terms: 'The terms of service have not been published on this site yet.',
    Cookies: 'Cookie information and preference controls have not been published on this site yet.',
  }
  return <dialog ref={ref} className={`footer-dialog${story ? ' is-story' : ''}`} aria-labelledby="footer-dialog-heading" onCancel={onClose} onClick={e => { if (e.currentTarget === e.target) onClose() }}>
    <div className="footer-dialog-content"><button className="footer-dialog-close" aria-label="Close dialog" onClick={onClose}>×</button>
      {story ? <><img src={`${import.meta.env.BASE_URL}images/footer/next-chapter.webp`} alt="Blue-lit stairs rising through mountains toward a bright doorway" /><div className="footer-story-copy"><p>THE HITSWORK STORY · {chapter + 1} / 3</p><h2 id="footer-dialog-heading">{chapters[chapter][0]}</h2><p>{chapters[chapter][1]}</p><div className="footer-story-controls"><button onClick={() => { if (chapter === 2) { setChapter(0); setPlaying(true) } else setPlaying(!playing) }}>{chapter === 2 ? 'Replay' : playing ? 'Pause' : 'Play'}</button><button disabled={chapter === 0} onClick={() => { setPlaying(false); setChapter(value => value - 1) }}>Previous</button><button disabled={chapter === 2} onClick={() => { setPlaying(false); setChapter(value => value + 1) }}>Next</button><Link to="/explore" onClick={onClose}>Start learning →</Link></div></div></> : <><h2 id="footer-dialog-heading">{topic}</h2><p>{info[topic] ?? `The official Hitswork ${topic} profile link has not been added yet.`}</p><button className="footer-dialog-done" onClick={onClose}>Got it</button></>}
    </div>
  </dialog>
}
