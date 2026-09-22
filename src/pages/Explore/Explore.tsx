import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { skillCategories } from '../../data/skills'
import { featuredCourses } from '../../data/courses'
import { CourseCard } from '../../components/courses/CourseCard'
import { SectionHeading } from '../../components/ui/SectionHeading'

export function Explore() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!activeSkill) return featuredCourses
    return featuredCourses.filter((c) => c.skill === activeSkill)
  }, [activeSkill])

  return (
    <div className="bg-void pt-36 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Explore"
          title="Everything Hitswork teaches, in one place."
          description="Filter by domain, or browse everything we have to offer."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSkill(null)}
            className={clsx(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              activeSkill === null
                ? 'border-electric-2/60 bg-electric-dim/40 text-ink'
                : 'border-line text-ink-dim hover:border-line-strong hover:text-ink',
            )}
          >
            All
          </button>
          {skillCategories.map((skill) => (
            <button
              key={skill.id}
              onClick={() => setActiveSkill(skill.name)}
              className={clsx(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                activeSkill === skill.name
                  ? 'border-electric-2/60 bg-electric-dim/40 text-ink'
                  : 'border-line text-ink-dim hover:border-line-strong hover:text-ink',
              )}
            >
              {skill.name}
              <span className="ml-1.5 text-xs text-ink-faint">{skill.courseCount}</span>
            </button>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-16 text-center text-ink-faint">
              No courses in this domain yet — more are on the way.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
