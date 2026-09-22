/**
 * Non-interactive atmospheric background for the hero: vignette, a soft
 * "moon" glow, distant rock silhouettes for depth framing, and a sparse
 * particle field. Pure CSS/SVG — keeps the WebGL budget for the globe.
 */
export function HeroAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* concentrated glow behind the globe, right-of-center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(45% 60% at 72% 46%, rgba(61,123,255,0.22) 0%, rgba(61,123,255,0.08) 45%, transparent 75%)',
        }}
      />
      {/* soft distant moon, top-right */}
      <div
        className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl sm:h-[520px] sm:w-[520px]"
        style={{ background: 'radial-gradient(closest-side, rgba(160,190,255,0.35), transparent 75%)' }}
      />

      {/* sparse static particle field */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: 'radial-gradient(rgba(160,190,255,0.5) 0.6px, transparent 0.6px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(70% 70% at 65% 45%, black, transparent 80%)',
        }}
      />
      {[
        { top: '18%', left: '8%', size: 5, delay: '0s' },
        { top: '62%', left: '4%', size: 3, delay: '2.4s' },
        { top: '78%', left: '85%', size: 4, delay: '1.1s' },
        { top: '30%', left: '93%', size: 3, delay: '3.2s' },
        { top: '50%', left: '96%', size: 5, delay: '0.6s' },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute animate-pulse-glow rounded-full bg-electric-2"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            boxShadow: '0 0 8px 2px rgba(110,168,255,0.6)',
          }}
        />
      ))}

      {/* distant rock silhouettes framing the bottom corners — kept low on
          mobile so they read as a subtle bottom edge behind the 3D visual
          rather than a large shape occupying the lower composition */}
      <svg
        className="absolute bottom-0 left-0 h-[76px] w-[114px] text-[#070b14] opacity-70 sm:h-[280px] sm:w-[420px]"
        viewBox="0 0 420 280"
        fill="none"
      >
        <path d="M0 280V150l60-40 40 30 50-70 70 50 30-20 40 40 90-60 100 100v100H0Z" fill="currentColor" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 h-[68px] w-[105px] text-[#070b14] opacity-70 sm:h-[260px] sm:w-[400px]"
        viewBox="0 0 400 260"
        fill="none"
      >
        <path d="M400 260V140l-70-50-40 40-60-40-50 60-80-40-100 80v70h400Z" fill="currentColor" />
      </svg>

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(3,4,7,0.55) 100%)',
        }}
      />
    </div>
  )
}
