import { BookIcon, LayersIcon, UsersIcon } from './icons'

const stats = [
  { value: '50K+', label: 'Learners Worldwide', kind: 'avatars' as const },
  { value: '1,200+', label: 'Courses', icon: BookIcon },
  { value: '80+', label: 'Learning Paths', icon: LayersIcon },
  { value: '500+', label: 'Industry Experts', icon: UsersIcon },
]

const avatarGradients = [
  'from-[#6EA8FF] to-[#2E68F0]',
  'from-[#8DBBFF] to-[#3D7BFF]',
  'from-[#5D93FF] to-[#1C3F8F]',
]

export function HeroStats() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-4 sm:gap-x-0">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center">
          {i > 0 && <div className="mx-4 hidden h-9 w-px bg-white/[0.08] sm:block" />}
          <div className="flex items-center gap-2.5">
            {stat.kind === 'avatars' ? (
              <div className="flex -space-x-2.5">
                {avatarGradients.map((g, j) => (
                  <div
                    key={j}
                    className={`h-7 w-7 rounded-full border-2 border-void bg-gradient-to-br ${g}`}
                  />
                ))}
              </div>
            ) : (
              stat.icon && <stat.icon className="h-5 w-5 text-electric-2/80" />
            )}
            <div>
              <p className="font-display text-base font-semibold leading-none text-ink">{stat.value}</p>
              <p className="mt-1 text-[11.5px] leading-none text-ink-faint">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
