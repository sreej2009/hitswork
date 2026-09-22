import logoLockup from '../../assets/Images/Hitswork.png'

const LOGO_ASPECT = 5461 / 1641

/**
 * Official Hitswork logo (icon + wordmark), rendered unmodified — no crop,
 * no recolor, no distortion.
 *
 * The source PNG has a dark-navy wordmark meant for light backgrounds, which
 * reads at very low contrast directly on Hitswork's near-black surfaces
 * (~2.3:1). Rather than a boxed/card backdrop, a soft edgeless glow sits
 * behind it — oversized, heavily blurred, no defined border — just enough
 * lift to read clearly while still feeling like ambient light in the scene.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 -inset-y-5 rounded-[999px] bg-[radial-gradient(closest-side,rgba(244,246,251,0.14),rgba(110,168,255,0.05)_60%,transparent_80%)] blur-lg"
      />
      <img
        src={logoLockup}
        alt="Hitswork"
        className="relative h-8 w-auto sm:h-9"
        style={{ aspectRatio: LOGO_ASPECT }}
      />
    </span>
  )
}
