import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../../components/hero/Hero'
import { AboutSection } from '../../components/about/AboutSection'
import { SkillExplorer } from '../../components/skills/SkillExplorer'
import { LearningPathsSection } from '../../components/learning-paths/LearningPathsSection'
import { CoursesSection } from '../../components/courses/CoursesSection'

export function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (!el) return
    const id = requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    return () => cancelAnimationFrame(id)
  }, [hash])

  return (
    <>
      <Hero />
      <AboutSection />
      <SkillExplorer />
      <LearningPathsSection />
      <CoursesSection />
    </>
  )
}
