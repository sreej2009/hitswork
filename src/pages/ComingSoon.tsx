import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden bg-void px-6 py-32">
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="relative z-10 max-w-lg text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-electric-2">Coming to Hitswork</p>
        <h1 className="text-balance font-display text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
        <p className="mt-4 text-balance text-ink-dim">{description}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Back to Home</Button>
          <Link
            to="/explore"
            className="inline-flex items-center rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-electric-2/60 hover:text-electric-2"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    </section>
  )
}
