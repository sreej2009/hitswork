import { skillCategories, type SkillCategory } from './skills'

export type ConstellationIcon =
  | 'development'
  | 'ai-ml'
  | 'ui-ux'
  | 'data'
  | 'marketing'
  | 'business'
  | 'cloud'
  | 'photography'
  | 'video'
  | 'cybersecurity'

export type ConstellationNode = {
  category: SkillCategory
  /** Organic 3D placement — intentionally not a ring; radius and depth vary per node. */
  position: [number, number, number]
  scale: number
  /** Compact label for the 3D card (full name shown in the hover detail readout instead). */
  shortLabel: string
}

// Positions are placed at ~30–45° angular spacing around the center (not a
// perfect ring — radius and depth both vary) so cards keep clear of each
// other regardless of camera framing, while still reading as organic.
const layout: Record<ConstellationIcon, { position: [number, number, number]; scale: number; shortLabel: string }> = {
  development: { position: [-0.28, 0.82, 0.4], scale: 1.15, shortLabel: 'Development' },
  'ai-ml': { position: [0.8, 0.95, -0.5], scale: 0.95, shortLabel: 'AI & ML' },
  'ui-ux': { position: [-1.69, 0.45, 0.6], scale: 1.05, shortLabel: 'UI/UX' },
  data: { position: [2.03, 0.54, 0.3], scale: 1.0, shortLabel: 'Data' },
  marketing: { position: [-1.05, 1.0, -0.6], scale: 0.85, shortLabel: 'Marketing' },
  business: { position: [-1.93, -0.52, -0.3], scale: 0.85, shortLabel: 'Business' },
  cloud: { position: [1.67, -0.3, 0.5], scale: 1.1, shortLabel: 'Cloud' },
  photography: { position: [-1.12, -1.6, 0.2], scale: 0.8, shortLabel: 'Photography' },
  video: { position: [0.31, -1.77, -0.4], scale: 0.85, shortLabel: 'Video' },
  cybersecurity: { position: [1.06, -1.06, 0.4], scale: 0.85, shortLabel: 'Security' },
}

export const constellationNodes: ConstellationNode[] = skillCategories
  .filter((c): c is SkillCategory & { id: ConstellationIcon } => c.id in layout)
  .map((c) => ({ category: c, ...layout[c.id as ConstellationIcon] }))

/** Thematic adjacency between domains — drives the "related skills" glow network. */
export const constellationConnections: [ConstellationIcon, ConstellationIcon][] = [
  ['development', 'ai-ml'],
  ['development', 'ui-ux'],
  ['development', 'cloud'],
  ['ai-ml', 'data'],
  ['data', 'marketing'],
  ['marketing', 'business'],
  ['ui-ux', 'photography'],
  ['photography', 'video'],
  ['video', 'marketing'],
  ['business', 'cloud'],
  ['cybersecurity', 'cloud'],
  ['cybersecurity', 'business'],
]

/** Reduced node set for low-power/mobile devices — evenly spaced, fewer connections. */
const compactLayout: Record<string, { position: [number, number, number]; scale: number; shortLabel: string }> = {
  development: { position: [-1.5, 0.9, 0.3], scale: 1.1, shortLabel: 'Development' },
  'ai-ml': { position: [1.4, 0.7, -0.4], scale: 0.95, shortLabel: 'AI & ML' },
  'ui-ux': { position: [-1.3, -1.0, 0.4], scale: 1.0, shortLabel: 'UI/UX' },
  data: { position: [1.5, -0.9, 0.2], scale: 0.95, shortLabel: 'Data' },
  cloud: { position: [0.1, 1.7, -0.3], scale: 0.85, shortLabel: 'Cloud' },
}

export const constellationNodesCompact: ConstellationNode[] = skillCategories
  .filter((c): c is SkillCategory & { id: ConstellationIcon } => c.id in compactLayout)
  .map((c) => ({ category: c, ...compactLayout[c.id] }))

export const constellationConnectionsCompact: [ConstellationIcon, ConstellationIcon][] = [
  ['development', 'ai-ml'],
  ['development', 'ui-ux'],
  ['ai-ml', 'data'],
  ['cloud', 'development'],
]

export const constellationCategoryStrip: { id: 'all' | ConstellationIcon; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'development', label: 'Development' },
  { id: 'ai-ml', label: 'AI' },
  { id: 'ui-ux', label: 'Design' },
  { id: 'data', label: 'Data' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'business', label: 'Business' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'photography', label: 'Photography' },
  { id: 'video', label: 'Video' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
]
