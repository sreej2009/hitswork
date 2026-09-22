import { useEffect, useState } from 'react'

/** Detects reduced-motion preference and low-power devices so 3D/animation scope can be trimmed. */
export function useDeviceCapability() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [lowPower, setLowPower] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(motionQuery.matches)
    update()
    motionQuery.addEventListener('change', update)

    const isNarrow = window.innerWidth < 768
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const cores = navigator.hardwareConcurrency ?? 8
    setLowPower(isNarrow || (isCoarsePointer && cores <= 6))

    return () => motionQuery.removeEventListener('change', update)
  }, [])

  return { reducedMotion, lowPower }
}
