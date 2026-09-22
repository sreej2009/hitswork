export type Course = {
  slug: string
  title: string
  instructor: string
  skill: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  rating: number
  students: number
  price: number
  summary: string
  accent: string
}

export const featuredCourses: Course[] = [
  {
    slug: 'react-systems-design',
    title: 'React Systems Design',
    instructor: 'Maya Ellison',
    skill: 'Development',
    level: 'Advanced',
    duration: '18h 40m',
    rating: 4.9,
    students: 12400,
    price: 89,
    summary: 'Architect large-scale React applications the way senior engineering teams do.',
    accent: 'from-[#3D7BFF]/30 to-transparent',
  },
  {
    slug: 'applied-machine-learning',
    title: 'Applied Machine Learning',
    instructor: 'Daniel Cho',
    skill: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '22h 10m',
    rating: 4.8,
    students: 9800,
    price: 99,
    summary: 'Build and ship real ML models, from data pipeline to production endpoint.',
    accent: 'from-[#6EA8FF]/30 to-transparent',
  },
  {
    slug: 'product-design-foundations',
    title: 'Product Design Foundations',
    instructor: 'Sara Lindqvist',
    skill: 'UI / UX Design',
    level: 'Beginner',
    duration: '14h 05m',
    rating: 4.9,
    students: 15600,
    price: 69,
    summary: 'A complete grounding in interface design, systems thinking and craft.',
    accent: 'from-[#3D7BFF]/25 to-transparent',
  },
  {
    slug: 'cloud-infrastructure-at-scale',
    title: 'Cloud Infrastructure at Scale',
    instructor: 'Ibrahim Musa',
    skill: 'Cloud',
    level: 'Advanced',
    duration: '20h 30m',
    rating: 4.7,
    students: 6100,
    price: 109,
    summary: 'Design resilient, cost-efficient infrastructure used by real production teams.',
    accent: 'from-[#6EA8FF]/25 to-transparent',
  },
  {
    slug: 'data-storytelling',
    title: 'Data Storytelling',
    instructor: 'Priya Nair',
    skill: 'Data',
    level: 'Intermediate',
    duration: '11h 15m',
    rating: 4.8,
    students: 8300,
    price: 59,
    summary: 'Turn dense datasets into visual narratives stakeholders actually act on.',
    accent: 'from-[#3D7BFF]/20 to-transparent',
  },
  {
    slug: 'growth-marketing-systems',
    title: 'Growth Marketing Systems',
    instructor: 'Owen Baptiste',
    skill: 'Marketing',
    level: 'Intermediate',
    duration: '13h 50m',
    rating: 4.6,
    students: 7200,
    price: 65,
    summary: 'Build repeatable acquisition engines instead of one-off campaigns.',
    accent: 'from-[#6EA8FF]/20 to-transparent',
  },
]
