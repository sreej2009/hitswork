import clsx from 'clsx'
import { constellationCategoryStrip } from '../../data/skillConstellation'

export function CategoryStrip({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 sm:justify-start">
      {constellationCategoryStrip.map((cat) => {
        const active = selected === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={clsx(
              'relative pb-2 text-[12.5px] font-medium uppercase tracking-[0.12em] transition-colors duration-300',
              active ? 'text-ink' : 'text-ink-faint hover:text-ink-dim',
            )}
          >
            {cat.label}
            <span
              className={clsx(
                'absolute inset-x-0 -bottom-px h-px bg-electric-2 shadow-[0_0_8px_1px_rgba(110,168,255,0.7)] transition-transform duration-300 ease-out',
                active ? 'scale-x-100' : 'scale-x-0',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
