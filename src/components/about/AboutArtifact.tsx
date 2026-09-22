import { Suspense, useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Edges, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import emblem from '../../assets/Images/hitswork-icon.png'

function Artifact({ reduced }: { reduced: boolean }) {
  const texture = useTexture(emblem)
  const rings = useRef<THREE.Group>(null)
  const logo = useRef<THREE.Group>(null)
  const ringA = useRef<THREE.Group>(null)
  const ringB = useRef<THREE.Group>(null)
  const ringC = useRef<THREE.Mesh>(null)
  const pedestalRimA = useRef<THREE.Mesh & { material: THREE.MeshBasicMaterial }>(null)
  const pedestalRimB = useRef<THREE.Mesh & { material: THREE.MeshBasicMaterial }>(null)
  const { camera, size, invalidate } = useThree()
  useLayoutEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      camera.zoom = Math.min(size.width / 7.7, size.height / 5.75)
      camera.lookAt(0, -.35, 0)
      camera.updateProjectionMatrix()
      invalidate()
    }
  }, [camera, size, invalidate])
  useFrame(({ clock }, delta) => {
    if (reduced) return
    const time = clock.getElapsedTime()
    if (rings.current) rings.current.rotation.y = Math.sin(time * .08) * .12
    if (logo.current) {
      logo.current.position.y = .1 + Math.sin(time * .5) * .035
      logo.current.rotation.y = -.12 + Math.sin(time * .13) * .16
    }
    if (ringA.current) ringA.current.rotation.z += delta * .05
    if (ringB.current) ringB.current.rotation.z -= delta * .035
    if (ringC.current) ringC.current.rotation.z += delta * .07
    const pulse = .6 + (Math.sin(time * .9) + 1) * .2
    if (pedestalRimA.current) pedestalRimA.current.material.opacity = pulse
    if (pedestalRimB.current) pedestalRimB.current.material.opacity = pulse * .75
  })
  return <>
    <ambientLight intensity={.65} color="#8ebdff" />
    <directionalLight position={[-3, 5, 5]} color="#83caff" intensity={3} />
    <pointLight position={[0, -1.6, 1.3]} color="#0088ff" intensity={18} distance={7} />
    <pointLight position={[3, 2, -1]} color="#076bff" intensity={15} distance={8} />
    <group position={[0, .1, 0]} ref={logo} rotation={[0, -.12, -.03]}>
      {/* Reuse the exact brand texture; stacked alpha silhouettes provide physical depth. */}
      {[0,1,2,3,4,5].map(layer => <mesh key={layer} position={[layer * .009, -layer * .008, -.09 + layer * .014]}>
        <planeGeometry args={[2.15, 2.34]} /><meshStandardMaterial map={texture} transparent alphaTest={.1} color={layer === 5 ? '#ffffff' : '#092e69'} emissive={layer === 5 ? '#1767d6' : '#020e28'} emissiveMap={texture} emissiveIntensity={layer === 5 ? .8 : .2} metalness={.35} roughness={.3} side={THREE.DoubleSide} />
      </mesh>)}
    </group>
    <group ref={rings} position={[0, .15, -.08]}>
      <group ref={ringA} rotation={[.15, .5, -.27]} scale={[.8, 1.2, 1]}>
        <mesh><torusGeometry args={[1.65, .042, 12, 128]} /><meshStandardMaterial color="#1683ff" metalness={.85} roughness={.2} emissive="#0072ff" emissiveIntensity={.55} /></mesh>
        <mesh><torusGeometry args={[1.71, .009, 6, 128]} /><meshBasicMaterial color="#82d6ff" /></mesh>
        <mesh><torusGeometry args={[1.59, .016, 8, 128]} /><meshStandardMaterial color="#5fbaff" transparent opacity={.45} metalness={.8} roughness={.1} /></mesh>
      </group>
      <group ref={ringB} rotation={[1.13, .2, -.16]} scale={[1.27, 1, 1]}>
        <mesh><torusGeometry args={[1.94, .021, 8, 128]} /><meshStandardMaterial color="#1683ff" metalness={.75} roughness={.15} emissive="#006cff" emissiveIntensity={.55} /></mesh>
        <mesh><torusGeometry args={[1.97, .006, 6, 128]} /><meshBasicMaterial color="#4ebfff" transparent opacity={.55} /></mesh>
      </group>
      <mesh ref={ringC} rotation={[.92, -.38, .65]} scale={[1.21, 1, 1]}><torusGeometry args={[1.94, .011, 8, 128]} /><meshBasicMaterial color="#1769c6" transparent opacity={.75} /></mesh>
      {[[-1.18,1.48,.55],[1.48,.65,.8],[1.73,-1.1,.25],[-2.3,-.45,0]].map((position,i) => <group key={i} position={position as [number,number,number]}><mesh><sphereGeometry args={[.026,8,8]} /><meshBasicMaterial color="#c0f2ff" /></mesh><mesh><sphereGeometry args={[.075,8,8]} /><meshBasicMaterial color="#008cff" transparent opacity={.22} depthWrite={false} /></mesh></group>)}
    </group>
    <group position={[0, -2.0, 0]}>
      <mesh><cylinderGeometry args={[2.55, 2.7, .44, 64]} /><meshStandardMaterial color="#040b15" metalness={.8} roughness={.4} /></mesh>
      <mesh position={[0,.28,0]}><cylinderGeometry args={[2.3,2.32,.15,64]} /><meshStandardMaterial color="#071421" metalness={.85} roughness={.25} /></mesh>
      <mesh ref={pedestalRimA as any} position={[0,.37,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[2.3,.012,8,128]} /><meshBasicMaterial color="#009cff" transparent opacity={.8} /></mesh>
      <mesh ref={pedestalRimB as any} position={[0,.045,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[2.64,.014,8,128]} /><meshBasicMaterial color="#0850a3" transparent opacity={.6} /></mesh>
    </group>
    <mesh position={[0,-2.34,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[13,9]} /><meshStandardMaterial color="#020710" roughness={.86} metalness={.25} /></mesh>
    {Array.from({length: 32}, (_,i) => {
      const x = (i / 31 - .5) * 9
      const z = Math.sin(i * 2.4) * 1.7
      const scale = .15 + (Math.sin(i * 5.7) + 1) * .13
      return <mesh key={i} position={[x,-2.25,z]} rotation={[i*.7,i*.9,i*.3]} scale={[scale*1.7,scale,scale]}><dodecahedronGeometry args={[1,0]} /><meshStandardMaterial color={i%3 ? '#07101d' : '#081b30'} roughness={.88} metalness={.25} /></mesh>
    })}
    {[-3.2,-2.6,2.9,3.5].map((x,i) => <mesh key={x} position={[x, .1, -2.3-i*.15]}><boxGeometry args={[.5,5,.13]} /><meshStandardMaterial color="#041226" transparent opacity={.65} /><Edges color="#0d3a72" transparent opacity={.4} /></mesh>)}
  </>
}

export function AboutArtifact({ reduced, visible }: { reduced: boolean; visible: boolean }) {
  return <Canvas orthographic camera={{ position: [0,1.1,9], zoom: 85, near: .1, far: 50 }} dpr={[1,1.35]} frameloop={visible && !reduced ? 'always' : 'demand'} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }} fallback={<img src={emblem} alt="Hitswork emblem" className="about-artifact-fallback" />}>
    <Suspense fallback={null}><Artifact reduced={reduced} /></Suspense>
  </Canvas>
}
