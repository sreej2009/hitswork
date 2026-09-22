/**
 * Atmospheric background for the Skill Discovery Universe section — echoes
 * the hero's lighting language (deep navy, blue radial glow, soft particles,
 * faint grid) so the two sections read as one continuous environment.
 */
export function SkillUniverseAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 65% at 62% 42%, rgba(61,123,255,0.16) 0%, rgba(61,123,255,0.06) 45%, transparent 75%)',
        }}
      />
      {/* faint spatial grid, fading toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(160,190,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(160,190,255,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(65% 65% at 60% 40%, black, transparent 80%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: 'radial-gradient(rgba(160,190,255,0.5) 0.6px, transparent 0.6px)',
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(60% 60% at 62% 40%, black, transparent 80%)',
        }}
      />
      {[
        { top: '10%', left: '6%', size: 4, delay: '0.4s' },
        { top: '70%', left: '10%', size: 3, delay: '2.1s' },
        { top: '85%', left: '80%', size: 5, delay: '1.3s' },
        { top: '15%', left: '90%', size: 3, delay: '3.0s' },
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
            boxShadow: '0 0 8px 2px rgba(110,168,255,0.55)',
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(5,6,10,0.9), transparent 12%, transparent 88%, rgba(5,6,10,0.95))' }}
      />
    </div>
  )
}
