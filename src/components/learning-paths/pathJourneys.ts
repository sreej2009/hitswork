import { learningPaths } from '../../data/learningPaths'

export const milestoneNames = ['Foundation', 'Core Skills', 'Build', 'Advanced', 'Real Project', 'Portfolio']

export const pathJourneys = [
  {
    ...learningPaths[0], icon: 'development' as const,
    summary: 'Build modern interfaces and ship production-ready web applications.',
    time: '5–7 Months', courses: '42+', projects: '6',
    milestones: [['HTML', 'CSS', 'JavaScript'], ['TypeScript', 'Git', 'Web APIs'], ['React', 'State Management', 'Component Design'], ['Performance', 'Architecture', 'Testing'], ['Build a Production Dashboard'], ['Deploy & Present']],
    completed: 3,
  },
  {
    ...learningPaths[1], icon: 'ai-ml' as const,
    summary: 'Build intelligent systems for the real world.',
    time: '6–8 Months', courses: '48+', projects: '6',
    milestones: [['Python', 'Linear Algebra', 'Statistics'], ['Data Analysis', 'NumPy', 'Pandas'], ['Machine Learning', 'Model Training', 'Evaluation'], ['Deep Learning', 'LLM Systems', 'MLOps'], ['Build an AI Assistant'], ['Deploy & Present']],
    completed: 0,
  },
  {
    ...learningPaths[2], icon: 'ui-ux' as const,
    summary: 'Design experiences people love and trust.',
    time: '4–6 Months', courses: '32+', projects: '5',
    milestones: [['Visual Design', 'Typography', 'Color Theory'], ['UX Research', 'User Flows', 'Wireframes'], ['Figma', 'Prototyping', 'Design Systems'], ['Usability Testing', 'Accessibility', 'Product Strategy'], ['Design a Digital Product'], ['Present Your Case Study']],
    completed: 0,
  },
  {
    slug: 'full-stack-engineer', title: 'Full Stack Engineer', icon: 'layers' as const,
    summary: 'Work across the stack and build end-to-end solutions.',
    time: '7–9 Months', courses: '56+', projects: '8',
    milestones: [['HTML & CSS', 'JavaScript', 'Git'], ['TypeScript', 'Node.js', 'Databases'], ['React', 'REST APIs', 'Authentication'], ['System Design', 'Testing', 'Cloud Deployment'], ['Build a Full Stack App'], ['Deploy & Present']],
    completed: 0,
  },
  {
    slug: 'digital-marketer', title: 'Digital Marketer', icon: 'megaphone' as const,
    summary: 'Turn ideas into growth with digital strategies.',
    time: '3–5 Months', courses: '28+', projects: '5',
    milestones: [['Marketing Basics', 'Audience Research', 'Brand Strategy'], ['SEO', 'Copywriting', 'Social Media'], ['Content Campaigns', 'Email Marketing', 'Paid Ads'], ['Analytics', 'Conversion Strategy', 'Growth Experiments'], ['Launch a Growth Campaign'], ['Present Your Results']],
    completed: 0,
  },
]
