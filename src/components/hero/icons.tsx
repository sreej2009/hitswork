import type { HeroSkillIcon } from '../../data/skills'

type IconProps = { className?: string }

export function SkillIcon({ icon, className = 'h-4 w-4' }: { icon: HeroSkillIcon; className?: string }) {
  const icons: Record<HeroSkillIcon, React.ComponentType<IconProps>> = {
    ai: BrainIcon,
    development: CodeIcon,
    design: PencilIcon,
    marketing: BarChartIcon,
    data: DatabaseIcon,
    business: BriefcaseIcon,
    cloud: CloudIcon,
  }
  const Cmp = icons[icon]
  return <Cmp className={className} />
}

function stroke(props: IconProps) {
  return { className: props.className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
}

function BrainIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="M9.5 3a3 3 0 0 0-3 3v.3A3 3 0 0 0 4 9v1a3 3 0 0 0 1 2.24V14a3 3 0 0 0 3 3h.5" />
      <path d="M14.5 3a3 3 0 0 1 3 3v.3A3 3 0 0 1 20 9v1a3 3 0 0 1-1 2.24V14a3 3 0 0 1-3 3h-.5" />
      <path d="M9.5 3v15a2.5 2.5 0 0 0 5 0V3" />
    </svg>
  )
}

function CodeIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="m9 8-4 4 4 4" />
      <path d="m15 8 4 4-4 4" />
    </svg>
  )
}

function PencilIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  )
}

function BarChartIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="M4 20V10" />
      <path d="M12 20V4" />
      <path d="M20 20v-6" />
    </svg>
  )
}

function DatabaseIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <ellipse cx="12" cy="5" rx="7" ry="2.5" />
      <path d="M5 5v6c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5" />
      <path d="M5 11v6c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-6" />
    </svg>
  )
}

function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
      <path d="M3 12.5h18" />
    </svg>
  )
}

function CloudIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="M7 18a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 17.24 8.5 4 4 0 0 1 17 18H7Z" />
    </svg>
  )
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M9 6.5v11l9-5.5-9-5.5Z" />
    </svg>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
    </svg>
  )
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  )
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 4.8a3.2 3.2 0 0 1 0 6.2" />
      <path d="M15.5 13.2c2.6.3 4.6 2.3 5 5.8" />
    </svg>
  )
}
