import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Billboard, Html, Line } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import gsap from 'gsap'
import * as THREE from 'three'
import { heroSkillPanels, heroSkillPanelsCompact, type HeroSkillPanel } from '../../data/skills'
import { SkillIcon } from '../hero/icons'
import logoIconUrl from '../../assets/Images/hitswork-icon.png'

type UniverseProps = {
  /** 0 → 1 mutable scroll progress for the hero section, read per-frame (no React re-renders). */
  scrollRef: React.MutableRefObject<number>
  reducedMotion: boolean
  lowPower: boolean
}

const GLOBE_RADIUS = 1.0

function panelPosition(p: HeroSkillPanel): [number, number, number] {
  const rad = (p.angleDeg * Math.PI) / 180
  return [p.radius * Math.sin(rad), p.radius * Math.cos(rad), p.z]
}

/** Radial glow sprite behind the central logo, generated at runtime (no extra asset). */
function useGlowTexture() {
  return useMemo(() => {
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(110,168,255,0.9)')
    gradient.addColorStop(0.4, 'rgba(61,123,255,0.35)')
    gradient.addColorStop(1, 'rgba(61,123,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])
}

function GlobeWireframe({ lowPower }: { lowPower: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  const latitudeRings = useMemo(() => {
    const count = lowPower ? 4 : 6
    const rings: [number, number, number][][] = []
    for (let i = 1; i < count; i++) {
      const lat = (i / count) * Math.PI - Math.PI / 2
      const y = GLOBE_RADIUS * Math.sin(lat)
      const r = GLOBE_RADIUS * Math.cos(lat)
      const pts: [number, number, number][] = []
      const segs = 48
      for (let s = 0; s <= segs; s++) {
        const a = (s / segs) * Math.PI * 2
        pts.push([r * Math.cos(a), y, r * Math.sin(a)])
      }
      rings.push(pts)
    }
    return rings
  }, [lowPower])

  const longitudeArcs = useMemo(() => {
    const count = lowPower ? 5 : 9
    const arcs: [number, number, number][][] = []
    const segs = 48
    for (let i = 0; i < count; i++) {
      const rot = (i / count) * Math.PI
      const pts: [number, number, number][] = []
      for (let s = 0; s <= segs; s++) {
        const a = (s / segs) * Math.PI * 2
        const x = GLOBE_RADIUS * Math.cos(a) * Math.cos(rot)
        const z = GLOBE_RADIUS * Math.cos(a) * Math.sin(rot)
        const y = GLOBE_RADIUS * Math.sin(a)
        pts.push([x, y, z])
      }
      arcs.push(pts)
    }
    return arcs
  }, [lowPower])

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.035
  })

  return (
    <group ref={groupRef}>
      {latitudeRings.map((pts, i) => (
        <Line key={`lat-${i}`} points={pts} color="#3D7BFF" transparent opacity={0.22} lineWidth={1} />
      ))}
      {longitudeArcs.map((pts, i) => (
        <Line key={`lon-${i}`} points={pts} color="#3D7BFF" transparent opacity={0.16} lineWidth={1} />
      ))}
    </group>
  )
}

/** Small glowing points scattered across the globe surface (fibonacci distribution). */
function GlobeSurfaceNodes({ lowPower }: { lowPower: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const geometry = useMemo(() => {
    const count = lowPower ? 26 : 46
    const positions = new Float32Array(count * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      positions[i * 3] = Math.cos(theta) * r * GLOBE_RADIUS
      positions[i * 3 + 1] = y * GLOBE_RADIUS
      positions[i * 3 + 2] = Math.sin(theta) * r * GLOBE_RADIUS
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [lowPower])

  useFrame((state) => {
    if (!pointsRef.current) return
    const mat = pointsRef.current.material as THREE.PointsMaterial
    mat.size = 0.028 + Math.sin(state.clock.getElapsedTime() * 1.2) * 0.006
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial color="#6EA8FF" size={0.03} sizeAttenuation transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function SurfaceArc({ points, index }: { points: [number, number, number][]; index: number }) {
  const ref = useRef<THREE.Object3D & { material?: THREE.Material & { opacity: number } }>(null)
  useFrame((state) => {
    if (!ref.current?.material) return
    const t = state.clock.getElapsedTime()
    ref.current.material.opacity = 0.22 + Math.sin(t * 0.45 + index * 0.9) * 0.12
  })
  return <Line ref={ref as any} points={points} color="#6EA8FF" transparent opacity={0.3} lineWidth={1} />
}

/** A handful of curved "network" arcs crossing the globe surface, like flight paths. */
function GlobeSurfaceArcs({ lowPower }: { lowPower: boolean }) {
  const arcs = useMemo(() => {
    if (lowPower) return []
    const seedPoints: [number, number][] = [
      [0.3, 1.1], [2.1, 0.4], [3.4, -0.3], [4.6, 0.8], [5.5, -0.6], [1.2, -1.0],
    ]
    const toVec = ([theta, y]: [number, number]) => {
      const r = Math.sqrt(Math.max(0, 1 - (y / GLOBE_RADIUS) ** 2))
      return new THREE.Vector3(Math.cos(theta) * r * GLOBE_RADIUS, y, Math.sin(theta) * r * GLOBE_RADIUS)
    }
    const result: [number, number, number][][] = []
    for (let i = 0; i < seedPoints.length - 1; i++) {
      const a = toVec(seedPoints[i])
      const b = toVec(seedPoints[i + 1])
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(GLOBE_RADIUS * 1.22)
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
      result.push(curve.getPoints(28).map((v) => [v.x, v.y, v.z] as [number, number, number]))
    }
    return result
  }, [lowPower])

  return (
    <>
      {arcs.map((pts, i) => (
        <SurfaceArc key={i} points={pts} index={i} />
      ))}
    </>
  )
}

function CentralLogo() {
  const glowTexture = useGlowTexture()
  const logoTexture = useMemo(() => new THREE.TextureLoader().load(logoIconUrl), [])
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (!groupRef.current) return
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1.1, delay: 0.2, ease: 'power3.out' },
    )
  }, [])

  useFrame((state) => {
    if (glowRef.current) {
      const s = 1 + Math.sin(state.clock.getElapsedTime() * 0.9) * 0.06
      glowRef.current.scale.setScalar(s)
    }
  })

  const aspect = 1086 / 1160

  return (
    <group ref={groupRef}>
      <Billboard>
        <mesh ref={glowRef} position={[0, 0, -0.02]}>
          <planeGeometry args={[1.3, 1.3]} />
          <meshBasicMaterial map={glowTexture} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh>
          <planeGeometry args={[0.68 * aspect, 0.68]} />
          <meshBasicMaterial map={logoTexture} transparent depthWrite={false} />
        </mesh>
      </Billboard>
    </group>
  )
}

function SkillPanelNode({
  panel,
  index,
  compact,
  reducedMotion,
}: {
  panel: HeroSkillPanel
  index: number
  compact: boolean
  reducedMotion: boolean
}) {
  const dotRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const lineRef = useRef<THREE.Object3D & { material?: THREE.Material & { opacity: number } }>(null)
  const position = useMemo(() => panelPosition(panel), [panel])

  // A tiny independent orbit around the node's resting position — subtle
  // enough that the (statically-anchored) spoke line never visibly detaches.
  const orbitSeed = useMemo(() => index * 1.37, [index])

  const basePoints = useMemo(() => {
    const dot = new THREE.Vector3(...position)
    const surface = dot.clone().normalize().multiplyScalar(GLOBE_RADIUS * 1.03)
    const perp = new THREE.Vector3(-dot.y, dot.x, dot.z * 0.6).normalize()
    const bend = index % 2 === 0 ? 1 : -1
    const mid = dot
      .clone()
      .add(surface)
      .multiplyScalar(0.5)
      .add(perp.multiplyScalar(0.35 * bend))
    const curve = new THREE.QuadraticBezierCurve3(dot, mid, surface)
    return curve.getPoints(24)
  }, [position, index])

  const linePoints = useMemo(() => basePoints.map((v) => [v.x, v.y, v.z] as [number, number, number]), [basePoints])

  useEffect(() => {
    if (!groupRef.current) return
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 0.8, delay: 0.6 + index * 0.1, ease: 'back.out(1.6)' },
    )
  }, [index])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (dotRef.current) dotRef.current.scale.setScalar(0.85 + Math.sin(t * 1.3 + index) * 0.15)

    // animated connection line — a slow opacity "breathe" per spoke, phase-offset per node
    if (lineRef.current?.material) lineRef.current.material.opacity = 0.34 + Math.sin(t * 0.6 + orbitSeed) * 0.12

    if (reducedMotion || !groupRef.current) return
    const wobble = compact ? 0.015 : 0.025
    groupRef.current.position.set(
      position[0] + Math.sin(t * 0.35 + orbitSeed) * wobble,
      position[1] + Math.cos(t * 0.3 + orbitSeed) * wobble,
      position[2],
    )
  })

  return (
    <>
      <Line ref={lineRef as any} points={linePoints} color="#3D7BFF" transparent opacity={0.4} lineWidth={1.2} />
      <group ref={groupRef} position={position}>
        <mesh ref={dotRef}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#6EA8FF" />
        </mesh>
        <Html center transform={false} style={{ pointerEvents: 'none' }} position={[0, 0.02, 0]} zIndexRange={[10, 0]}>
          <div className={compact ? '-translate-y-[calc(100%+9px)]' : '-translate-y-[calc(100%+14px)]'}>
            <div
              className={
                compact
                  ? 'flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-electric-2/25 bg-[#0a0d16]/80 px-2 py-1.5 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.6),0_0_14px_-8px_rgba(61,123,255,0.5)] backdrop-blur-md'
                  : 'flex items-center gap-2 whitespace-nowrap rounded-xl border border-electric-2/25 bg-[#0a0d16]/80 px-3 py-2 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6),0_0_20px_-8px_rgba(61,123,255,0.5)] backdrop-blur-md'
              }
              style={{ animation: `hero-panel-float 5.5s ease-in-out ${index * 0.4}s infinite` }}
            >
              <span
                className={
                  compact
                    ? 'flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md bg-electric/15 text-electric-2'
                    : 'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-electric/15 text-electric-2'
                }
              >
                <SkillIcon icon={panel.icon} className={compact ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'} />
              </span>
              <span className={compact ? 'text-[10.5px] font-medium text-ink' : 'text-[13px] font-medium text-ink'}>
                {panel.label}
              </span>
            </div>
          </div>
        </Html>
      </group>
    </>
  )
}

const CAMERA_FOV = 40
// Panel-cluster geometry the framing must keep on-screen. Card sizes are
// fixed CSS pixels (unlike the 3D scene, they don't shrink with distance),
// so — unlike a flat world-unit margin — the required camera distance is
// solved per-frame from the canvas's actual pixel dimensions below. The
// compact (lowPower) cards are visually smaller, so their pixel budget is
// smaller too — otherwise a tiny mobile canvas forces an absurd zoom-out.
const TOP_DOT_RADIUS = 1.05 // AI & ML, the topmost panel
const SIDE_DOT_RADIUS = 1.55 // widest side panels (Development/Marketing/Data)
const BOTTOM_DOT_RADIUS = 1.5 // Business/Cloud — cards fold inward, no extra margin needed

function Rig({
  scrollRef,
  reducedMotion,
  baseZ,
  compact,
}: {
  scrollRef: React.MutableRefObject<number>
  reducedMotion: boolean
  baseZ: number
  compact: boolean
}) {
  const { camera, size } = useThree()
  const pointer = useRef({ x: 0, y: 0 })
  const target = useRef(new THREE.Vector3())

  useEffect(() => {
    if (reducedMotion) return
    function onMove(e: PointerEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion])

  useFrame(() => {
    // Solve the camera distance from the canvas's actual pixel size so the
    // panel cards — fixed CSS pixels, not world-scaled — stay fully framed
    // on any container shape, from a tall 1920px hero to a narrow tablet
    // column. Each constraint (top/side/bottom) is solved independently;
    // the largest required distance wins.
    const { width, height } = size
    const aspect = width / Math.max(height, 1)
    const tanHalfFov = Math.tan((CAMERA_FOV * Math.PI) / 360)
    const topCardOffsetPx = compact ? 34 : 54
    const sideCardHalfWidthPx = compact ? 75 : 145

    const topDenom = Math.max(1 - (2 * topCardOffsetPx) / height, 0.12)
    const dTop = TOP_DOT_RADIUS / (tanHalfFov * topDenom)

    const sideDenom = Math.max(aspect - (2 * sideCardHalfWidthPx) / height, 0.12)
    const dSide = SIDE_DOT_RADIUS / (tanHalfFov * sideDenom)

    const dBottom = BOTTOM_DOT_RADIUS / tanHalfFov

    const dynamicZ = Math.max(baseZ, dTop, dSide, dBottom)

    const scroll = scrollRef.current
    const tx = reducedMotion ? 0 : pointer.current.x * 0.22
    const ty = reducedMotion ? 0 : -pointer.current.y * 0.14
    target.current.set(tx, ty, dynamicZ - scroll * 0.9)
    camera.position.lerp(target.current, 0.045)
    camera.lookAt(0, 0, 0)
  })

  return null
}

export function LearningUniverse({ scrollRef, reducedMotion, lowPower }: UniverseProps) {
  const panels = lowPower ? heroSkillPanelsCompact : heroSkillPanels
  const baseZ = lowPower ? 5.4 : 5.0

  return (
    <Canvas
      dpr={lowPower ? 1 : [1, 1.6]}
      camera={{ position: [0, 0, baseZ], fov: CAMERA_FOV }}
      gl={{ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.5} />

      <Rig scrollRef={scrollRef} reducedMotion={reducedMotion} baseZ={baseZ} compact={lowPower} />
      <GlobeWireframe lowPower={lowPower} />
      <GlobeSurfaceNodes lowPower={lowPower} />
      <GlobeSurfaceArcs lowPower={lowPower} />
      <CentralLogo />
      {panels.map((panel, i) => (
        <SkillPanelNode key={panel.id} panel={panel} index={i} compact={lowPower} reducedMotion={reducedMotion} />
      ))}

      {!lowPower && !reducedMotion && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom intensity={0.5} luminanceThreshold={0.25} luminanceSmoothing={0.3} radius={0.5} height={240} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
