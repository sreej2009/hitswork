import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Html, Line } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'
import {
  constellationConnections,
  constellationConnectionsCompact,
  constellationNodes,
  constellationNodesCompact,
  type ConstellationIcon,
  type ConstellationNode,
} from '../../data/skillConstellation'
import { ConstellationSkillIcon } from '../skill-universe/icons'

type SceneProps = {
  scrollRef: React.MutableRefObject<number>
  reducedMotion: boolean
  lowPower: boolean
  activeId: string | null
  onHoverNode: (id: string | null) => void
  /**
   * Explicit pixel size for the canvas, measured by the parent. With two
   * <Canvas> instances on this page, R3F's own auto-sizing has been
   * observed to hand this (second-mounted) canvas the first canvas's
   * dimensions instead of its own container's — passing `size` explicitly
   * bypasses that internal auto-measurement entirely.
   */
  size: { width: number; height: number } | null
}

const CAMERA_FOV = 38

function Core() {
  const dotRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!groupRef.current) return
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1, delay: 0.1, ease: 'power3.out' },
    )
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (glowRef.current) glowRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.1)
    if (dotRef.current) dotRef.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.08)
  })

  // A small bright node, not a dominant geometric shape — reads as "the
  // center of the network" rather than a second globe competing with it.
  // No post-process bloom here (see note above the Canvas export), so the
  // glow is layered manually: two soft shells plus a bright core.
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#3D7BFF" transparent opacity={0.08} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color="#3D7BFF" transparent opacity={0.3} />
      </mesh>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <Html center transform={false} position={[0, -0.24, 0]} style={{ pointerEvents: 'none' }}>
        <span className="whitespace-nowrap text-[10px] font-semibold tracking-[0.2em] text-ink-faint">SKILLS</span>
      </Html>
    </group>
  )
}

function ConstellationSpoke({ node, index, dimmed }: { node: ConstellationNode; index: number; dimmed: boolean }) {
  const ref = useRef<THREE.Object3D & { material?: THREE.Material & { opacity: number } }>(null)
  const base = dimmed ? 0.06 : 0.22
  useFrame((state) => {
    if (!ref.current?.material) return
    const t = state.clock.getElapsedTime()
    ref.current.material.opacity = base + Math.sin(t * 0.5 + index * 0.8) * (base * 0.35)
  })
  return (
    <Line
      ref={ref as any}
      points={[
        [0, 0, 0],
        node.position,
      ]}
      color="#3D7BFF"
      transparent
      opacity={base}
      lineWidth={1}
    />
  )
}

function ThematicLine({
  a,
  b,
  index,
  active,
  dimmed,
}: {
  a: [number, number, number]
  b: [number, number, number]
  index: number
  active: boolean
  dimmed: boolean
}) {
  const ref = useRef<THREE.Object3D & { material?: THREE.Material & { opacity: number } }>(null)
  const base = dimmed ? 0.04 : active ? 0.65 : 0.18

  const mid = useMemo(() => {
    const va = new THREE.Vector3(...a)
    const vb = new THREE.Vector3(...b)
    const m = va.clone().add(vb).multiplyScalar(0.5)
    m.z += 0.4
    return m
  }, [a, b])

  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(...a), mid, new THREE.Vector3(...b))
    return curve.getPoints(20)
  }, [a, b, mid])

  useFrame((state) => {
    if (!ref.current?.material) return
    const t = state.clock.getElapsedTime()
    const amp = active ? base * 0.18 : base * 0.3
    ref.current.material.opacity = base + Math.sin(t * (active ? 0.9 : 0.55) + index * 0.7) * amp
  })

  return (
    <Line
      ref={ref as any}
      points={points}
      color={active ? '#6EA8FF' : '#3D7BFF'}
      transparent
      opacity={base}
      lineWidth={active ? 1.4 : 1}
    />
  )
}

function ConstellationNodeItem({
  node,
  index,
  state,
  compact,
  onHover,
}: {
  node: ConstellationNode
  index: number
  state: 'active' | 'neighbor' | 'dimmed' | 'normal'
  compact: boolean
  onHover: (id: string | null) => void
}) {
  const dotRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!groupRef.current) return
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: node.scale, y: node.scale, z: node.scale, duration: 0.8, delay: 0.4 + index * 0.08, ease: 'back.out(1.6)' },
    )
  }, [index, node.scale])

  useFrame((frameState) => {
    if (!dotRef.current) return
    const t = frameState.clock.getElapsedTime()
    const base = state === 'dimmed' ? 0.6 : state === 'active' ? 1.3 : 1
    dotRef.current.scale.setScalar(base + Math.sin(t * 1.2 + index) * 0.08)
  })

  const dotOpacity = state === 'dimmed' ? 0.35 : 1
  const cardOpacity = state === 'dimmed' ? 0.45 : 1
  const showDetail = state === 'active'

  return (
    <group ref={groupRef} position={node.position}>
      <Float speed={1} floatIntensity={0.5} rotationIntensity={0.1}>
        <mesh ref={dotRef} onPointerOver={() => onHover(node.category.id)} onPointerOut={() => onHover(null)}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={state === 'active' ? '#ffffff' : '#6EA8FF'} transparent opacity={dotOpacity} />
        </mesh>
        {state === 'active' && (
          <mesh>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshBasicMaterial color="#6EA8FF" transparent opacity={0.25} />
          </mesh>
        )}
        <Html center transform={false} style={{ pointerEvents: 'none' }} position={[0, 0.02, 0]} zIndexRange={[10, 0]}>
          <div
            onMouseEnter={() => onHover(node.category.id)}
            onMouseLeave={() => onHover(null)}
            style={{ pointerEvents: 'auto', opacity: cardOpacity, transition: 'opacity 300ms ease' }}
            className={compact ? '-translate-y-[calc(100%+8px)]' : '-translate-y-[calc(100%+12px)]'}
          >
            <div
              className={
                (compact ? 'gap-1.5 rounded-lg px-2 py-1.5 ' : 'gap-2 rounded-xl px-3 py-2 ') +
                'flex min-w-max flex-col whitespace-nowrap border backdrop-blur-md transition-[border-color,box-shadow] duration-300 ' +
                (state === 'active'
                  ? 'border-electric-2/50 bg-[#0c0f18]/90 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.65),0_0_26px_-6px_rgba(61,123,255,0.7)]'
                  : 'border-electric-2/20 bg-[#0a0d16]/80 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.6)]')
              }
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    (compact ? 'h-4.5 w-4.5 rounded-md ' : 'h-6 w-6 rounded-lg ') +
                    'flex shrink-0 items-center justify-center bg-electric/15 text-electric-2'
                  }
                >
                  <ConstellationSkillIcon icon={node.category.id as ConstellationIcon} className={compact ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'} />
                </span>
                <span className={compact ? 'text-[10.5px] font-medium text-ink' : 'text-[13px] font-medium text-ink'}>
                  {node.shortLabel}
                </span>
              </div>
              {!compact && <p className="pl-8 text-[10.5px] text-ink-faint">{node.category.courseCount} courses</p>}
              {!compact && (
                <div
                  className={
                    'grid overflow-hidden pl-8 transition-[grid-template-rows,opacity] duration-300 ease-out ' +
                    (showDetail ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')
                  }
                >
                  <div className="flex min-h-0 max-w-[180px] flex-wrap gap-1 pt-0.5">
                    {node.category.relatedSkills.map((s) => (
                      <span key={s} className="rounded-full border border-electric-2/25 px-1.5 py-0.5 text-[9.5px] text-electric-2/90">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  )
}

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

  const topDotRadius = compact ? 1.7 : 1.4
  const sideDotRadius = compact ? 1.6 : 2.3

  useFrame(() => {
    const { width, height } = size
    const aspect = width / Math.max(height, 1)
    const tanHalfFov = Math.tan((CAMERA_FOV * Math.PI) / 360)
    const topCardOffsetPx = compact ? 40 : 72
    const sideCardHalfWidthPx = compact ? 70 : 110

    const topDenom = Math.max(1 - (2 * topCardOffsetPx) / height, 0.12)
    const dTop = topDotRadius / (tanHalfFov * topDenom)

    const sideDenom = Math.max(aspect - (2 * sideCardHalfWidthPx) / height, 0.12)
    const dSide = sideDotRadius / (tanHalfFov * sideDenom)

    const dynamicZ = Math.max(baseZ, dTop, dSide)

    const scroll = scrollRef.current
    const tx = reducedMotion ? 0 : pointer.current.x * 0.25
    const ty = reducedMotion ? 0 : -pointer.current.y * 0.16
    target.current.set(tx, ty, dynamicZ - scroll * 0.6)
    camera.position.lerp(target.current, 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

/** Wraps the constellation in a very slow, continuous Y rotation. */
function Rotator({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.025
  })
  return <group ref={ref}>{children}</group>
}

export function SkillConstellation({ scrollRef, reducedMotion, lowPower, activeId, onHoverNode, size }: SceneProps) {
  // The full 9-node layout needs a reasonably wide canvas to keep adjacent
  // cards from crowding — more zoom-out (needed on a narrow/tall canvas to
  // keep the outer nodes in frame) shrinks the *gaps* between fixed-size
  // cards faster than it shrinks the cards themselves. Below a ~1:1 aspect,
  // switch to the sparser compact layout regardless of viewport width.
  const narrowCanvas = size ? size.width / Math.max(size.height, 1) < 1.05 : false
  const compact = lowPower || narrowCanvas
  const nodes = compact ? constellationNodesCompact : constellationNodes
  const connections = compact ? constellationConnectionsCompact : constellationConnections
  const baseZ = compact ? 5.2 : 4.6

  const neighbors = useMemo(() => {
    const map = new Map<string, Set<string>>()
    for (const [a, b] of connections) {
      if (!map.has(a)) map.set(a, new Set())
      if (!map.has(b)) map.set(b, new Set())
      map.get(a)!.add(b)
      map.get(b)!.add(a)
    }
    return map
  }, [connections])

  const nodeState = (id: string): 'active' | 'neighbor' | 'dimmed' | 'normal' => {
    if (!activeId) return 'normal'
    if (id === activeId) return 'active'
    if (neighbors.get(activeId)?.has(id)) return 'neighbor'
    return 'dimmed'
  }

  const positionsById = useMemo(() => new Map(nodes.map((n) => [n.category.id, n.position])), [nodes])

  if (!size || size.width < 1 || size.height < 1) return null

  return (
    <Canvas
      dpr={lowPower ? 1 : [1, 1.6]}
      camera={{ position: [0, 0, baseZ], fov: CAMERA_FOV }}
      gl={{ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.5} />
      <Rig scrollRef={scrollRef} reducedMotion={reducedMotion} baseZ={baseZ} compact={compact} />

      <Rotator>
        <Core />
        {nodes.map((node, i) => (
          <ConstellationSpoke key={node.category.id} node={node} index={i} dimmed={nodeState(node.category.id) === 'dimmed'} />
        ))}
        {connections.map(([a, b], i) => {
          const pa = positionsById.get(a)
          const pb = positionsById.get(b)
          if (!pa || !pb) return null
          const active = activeId === a || activeId === b
          const dimmed = activeId !== null && !active
          return <ThematicLine key={i} a={pa} b={pb} index={i} active={active} dimmed={dimmed} />
        })}
        {nodes.map((node, i) => (
          <ConstellationNodeItem
            key={node.category.id}
            node={node}
            index={i}
            state={nodeState(node.category.id)}
            compact={compact}
            onHover={onHoverNode}
          />
        ))}
      </Rotator>
    </Canvas>
  )
}
