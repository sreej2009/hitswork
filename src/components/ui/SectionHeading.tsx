import clsx from 'clsx'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={clsx(align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-electric-2">
          <span className="h-px w-6 bg-electric-2/60" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-balance text-base text-ink-dim sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
