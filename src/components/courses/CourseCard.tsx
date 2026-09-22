import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Course } from '../../data/courses'

export function CourseCard({ course }: { course: Course }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--tiltX', `${-py * 5}deg`)
    el.style.setProperty('--tiltY', `${px * 6}deg`)
  }

  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={ref}
        className="relative overflow-hidden rounded-xl border border-line bg-surface-2/50 transition-[transform,border-color,box-shadow] duration-300 ease-out"
        style={{
          transform: hovered
            ? 'perspective(900px) rotateX(var(--tiltX,0)) rotateY(var(--tiltY,0)) translateY(-6px)'
            : 'perspective(900px) rotateX(0) rotateY(0) translateY(0)',
          borderColor: hovered ? 'rgba(110,168,255,0.35)' : undefined,
          boxShadow: hovered ? '0 28px 60px -24px rgba(61,123,255,0.5)' : undefined,
        }}
      >
        <div className={`relative h-40 w-full bg-gradient-to-br ${course.accent} bg-surface-3`}>
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_20%,rgba(110,168,255,0.25),transparent)]" />
          <span className="absolute bottom-3 left-4 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
            {course.skill}
          </span>
        </div>

        <div className="p-5">
          <div className="mb-2 flex items-center gap-2 text-xs text-ink-faint">
            <span>{course.level}</span>
            <span>·</span>
            <span>{course.duration}</span>
          </div>
          <h3 className="text-balance font-display text-lg font-semibold text-ink">{course.title}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-ink-dim">{course.summary}</p>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <div>
              <p className="text-xs text-ink-faint">{course.instructor}</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-dim">
                <StarIcon /> {course.rating} · {course.students.toLocaleString()} students
              </p>
            </div>
            <span className="font-display text-base font-semibold text-ink">${course.price}</span>
          </div>

          <div
            className="mt-4 overflow-hidden transition-all duration-300"
            style={{ maxHeight: hovered ? '36px' : '0px', opacity: hovered ? 1 : 0 }}
          >
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric-2">
              View course
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#6EA8FF">
      <path d="M12 2l2.9 6 6.6.6-5 4.5 1.5 6.5L12 16l-5.9 3.6L7.6 13l-5-4.5 6.6-.6L12 2z" />
    </svg>
  )
}
