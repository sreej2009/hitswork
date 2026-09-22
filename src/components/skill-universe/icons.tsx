import type { ConstellationIcon } from '../../data/skillConstellation'

type IconProps = { className?: string }

export function ConstellationSkillIcon({ icon, className = 'h-4 w-4' }: { icon: ConstellationIcon; className?: string }) {
  const icons: Record<ConstellationIcon, React.ComponentType<IconProps>> = {
    development: CodeIcon,
    'ai-ml': BrainIcon,
    'ui-ux': PencilIcon,
    data: DatabaseIcon,
    marketing: BarChartIcon,
    business: BriefcaseIcon,
    cloud: CloudIcon,
    photography: CameraIcon,
    video: VideoIcon,
    cybersecurity: ShieldIcon,
  }
  const Cmp = icons[icon]
  return <Cmp className={className} />
}

function stroke(props: IconProps) {
  return {
    className: props.className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
}

function CodeIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="m9 8-4 4 4 4" />
      <path d="m15 8 4 4-4 4" />
    </svg>
  )
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

function PencilIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
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

function BarChartIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="M4 20V10" />
      <path d="M12 20V4" />
      <path d="M20 20v-6" />
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

function CameraIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-9Z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  )
}

function VideoIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m21 8-5 3 5 3V8Z" />
    </svg>
  )
}

function ShieldIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="m12 3 8 4v5c0 5-8 9-8 9s-8-4-8-9V7Z" />
      <path d="m8.5 12 2.5 2.5 5-5" />
    </svg>
  )
}
