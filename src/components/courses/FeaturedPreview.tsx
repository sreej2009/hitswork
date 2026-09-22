import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const scenes = [
  { image: 'workspace', title: 'Real skills. A brighter tomorrow.', copy: 'Learn from people who build for a living.' },
  { image: 'react', title: 'Build with confidence.', copy: 'Architect production-ready React applications.' },
  { image: 'ai', title: 'Bring intelligence to life.', copy: 'From data pipelines to deployed machine learning.' },
  { image: 'design', title: 'Create with purpose.', copy: 'Design thoughtful interfaces and systems.' },
  { image: 'data', title: 'Make your next move.', copy: 'Find your course. Build something that matters.' },
]

export function FeaturedPreview({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(true)
  const scene = scenes[Math.min(4, Math.floor(time / 5))]
  useEffect(() => {
    const el = dialog.current
    const previousFocus = document.activeElement as HTMLElement | null
    el?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { el?.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus() }
  }, [])
  useEffect(() => {
    if (!playing || time >= 25) return
    const timer = window.setInterval(() => setTime(value => Math.min(25, value + .25)), 250)
    return () => window.clearInterval(timer)
  }, [playing, time >= 25])
  return <dialog ref={dialog} className="fc-preview" aria-labelledby="fc-preview-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
    <div className="fc-preview-inner">
      <button className="fc-preview-close" onClick={onClose} aria-label="Close course preview">×</button>
      <div className="fc-preview-scene"><img src={`${import.meta.env.BASE_URL}images/featured/${scene.image}.webp`} alt="" /><div><p>HITSWORK · COURSE PREVIEW</p><h2 id="fc-preview-title">{scene.title}</h2><p>{scene.copy}</p></div></div>
      <div className="fc-preview-controls"><button onClick={() => { if (time >= 25) { setTime(0); setPlaying(true) } else setPlaying(!playing) }}>{time >= 25 ? 'Replay' : playing ? 'Pause' : 'Play'}</button><input aria-label="Preview position" type="range" min="0" max="25" step=".25" value={time} onChange={e => setTime(Number(e.target.value))} /><span>0:{String(Math.floor(time)).padStart(2, '0')} / 0:25</span><Link to="/explore" onClick={onClose}>Explore courses →</Link></div>
    </div>
  </dialog>
}
