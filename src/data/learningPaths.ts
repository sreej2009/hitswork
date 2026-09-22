export type PathStage = {
  label: string
  detail: string
}

export type LearningPath = {
  slug: string
  title: string
  description: string
  duration: string
  stages: PathStage[]
}

export const learningPaths: LearningPath[] = [
  {
    slug: 'frontend-engineer',
    title: 'Frontend Engineer',
    description: 'From markup fundamentals to production React applications.',
    duration: '5-7 months',
    stages: [
      { label: 'HTML', detail: 'Structure & semantics' },
      { label: 'CSS', detail: 'Layout & design systems' },
      { label: 'JavaScript', detail: 'Language & runtime' },
      { label: 'React', detail: 'Component architecture' },
      { label: 'Advanced React', detail: 'Performance & state' },
      { label: 'Real Project', detail: 'Ship something real' },
      { label: 'Portfolio', detail: 'Present your work' },
    ],
  },
  {
    slug: 'ai-engineer',
    title: 'AI Engineer',
    description: 'Practical machine learning, from Python to deployed models.',
    duration: '6-8 months',
    stages: [
      { label: 'Python', detail: 'Core language' },
      { label: 'Data Foundations', detail: 'Cleaning & analysis' },
      { label: 'ML Fundamentals', detail: 'Models & math' },
      { label: 'Deep Learning', detail: 'Networks & training' },
      { label: 'LLM Systems', detail: 'Applied AI products' },
      { label: 'Capstone', detail: 'End-to-end system' },
    ],
  },
  {
    slug: 'product-designer',
    title: 'Product Designer',
    description: 'Design craft paired with systems and product thinking.',
    duration: '4-6 months',
    stages: [
      { label: 'Design Basics', detail: 'Visual fundamentals' },
      { label: 'UX Research', detail: 'Understanding users' },
      { label: 'UI Systems', detail: 'Components & tokens' },
      { label: 'Prototyping', detail: 'Interaction design' },
      { label: 'Case Study', detail: 'Portfolio project' },
    ],
  },
]
