export type SkillCategory = {
  id: string
  name: string
  tagline: string
  courseCount: number
  relatedSkills: string[]
  // Normalized 3D-ish position used by the hero universe and the explorer grid parallax.
  position: [number, number, number]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'development',
    name: 'Development',
    tagline: 'Ship real products, from first component to production.',
    courseCount: 142,
    relatedSkills: ['React', 'TypeScript', 'Node.js'],
    position: [-2.4, 0.6, 0.2],
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    tagline: 'Understand and build the systems reshaping every industry.',
    courseCount: 76,
    relatedSkills: ['Python', 'PyTorch', 'LLMs'],
    position: [1.8, 1.2, -0.6],
  },
  {
    id: 'ui-ux',
    name: 'UI / UX Design',
    tagline: 'Design interfaces people trust and enjoy using.',
    courseCount: 58,
    relatedSkills: ['Figma', 'Design Systems', 'Prototyping'],
    position: [-1.4, -1.1, 0.8],
  },
  {
    id: 'data',
    name: 'Data',
    tagline: 'Turn raw numbers into decisions worth making.',
    courseCount: 64,
    relatedSkills: ['SQL', 'Analytics', 'Visualization'],
    position: [2.6, -0.4, 0.4],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    tagline: 'Grow audiences and revenue with real strategy.',
    courseCount: 49,
    relatedSkills: ['SEO', 'Growth', 'Brand'],
    position: [0.2, 2.1, -0.3],
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'Build the operational muscle behind great products.',
    courseCount: 55,
    relatedSkills: ['Strategy', 'Finance', 'Leadership'],
    position: [-2.8, -1.6, -0.5],
  },
  {
    id: 'photography',
    name: 'Photography',
    tagline: 'Master light, composition and story in every frame.',
    courseCount: 31,
    relatedSkills: ['Lighting', 'Editing', 'Portraiture'],
    position: [2.1, 1.9, 0.7],
  },
  {
    id: 'video',
    name: 'Video',
    tagline: 'Edit, grade and direct footage that holds attention.',
    courseCount: 37,
    relatedSkills: ['Editing', 'Motion', 'Color'],
    position: [0.9, -2.0, -0.2],
  },
  {
    id: 'cloud',
    name: 'Cloud',
    tagline: 'Design and operate infrastructure that scales.',
    courseCount: 44,
    relatedSkills: ['AWS', 'Docker', 'Kubernetes'],
    position: [-0.6, 0.9, 1.6],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    tagline: 'Defend systems with the mindset of an attacker.',
    courseCount: 28,
    relatedSkills: ['Networks', 'Pentesting', 'Compliance'],
    position: [1.3, -1.4, 1.1],
  },
]

export type HeroSkillIcon = 'ai' | 'development' | 'design' | 'marketing' | 'data' | 'business' | 'cloud'

export type HeroSkillPanel = {
  id: string
  label: string
  icon: HeroSkillIcon
  /** Degrees clockwise from the top (12 o'clock) of the globe. */
  angleDeg: number
  radius: number
  z: number
}

/** Floating skill panels orbiting the hero's 3D globe, matching the reference composition. */
export const heroSkillPanels: HeroSkillPanel[] = [
  { id: 'ai-ml', label: 'AI & ML', icon: 'ai', angleDeg: 0, radius: 1.05, z: 0.15 },
  { id: 'design', label: 'Design', icon: 'design', angleDeg: 55, radius: 1.5, z: -0.1 },
  { id: 'data', label: 'Data', icon: 'data', angleDeg: 108, radius: 1.55, z: 0.2 },
  { id: 'cloud', label: 'Cloud', icon: 'cloud', angleDeg: 152, radius: 1.5, z: -0.15 },
  { id: 'business', label: 'Business', icon: 'business', angleDeg: 205, radius: 1.5, z: 0.1 },
  { id: 'marketing', label: 'Marketing', icon: 'marketing', angleDeg: 255, radius: 1.55, z: -0.2 },
  { id: 'development', label: 'Development', icon: 'development', angleDeg: 305, radius: 1.5, z: 0.15 },
]

/**
 * Dedicated mobile Hero composition — a fixed 5-card pentagon (AI & ML top,
 * Design/Development upper sides, Data/Marketing lower sides), evenly spaced
 * 72° apart. Deliberately its own layout rather than a scaled-down version
 * of the 7-node desktop set: uneven desktop gaps that read fine on a large
 * canvas cause card overlap on a small mobile canvas.
 */
export const heroSkillPanelsCompact: HeroSkillPanel[] = [
  { id: 'ai-ml', label: 'AI & ML', icon: 'ai', angleDeg: 0, radius: 1.05, z: 0.15 },
  { id: 'design', label: 'Design', icon: 'design', angleDeg: 72, radius: 1.05, z: -0.1 },
  { id: 'data', label: 'Data', icon: 'data', angleDeg: 144, radius: 1.05, z: 0.2 },
  { id: 'marketing', label: 'Marketing', icon: 'marketing', angleDeg: 216, radius: 1.05, z: -0.15 },
  { id: 'development', label: 'Development', icon: 'development', angleDeg: 288, radius: 1.05, z: 0.1 },
]
