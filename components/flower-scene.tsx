'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// --- Realistic Rose Petal ---
function RosePetal({ angle, layer, index }: { angle: number; layer: number; index: number }) {
  const petalRef = useRef<THREE.Mesh>(null)
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  // Each layer opens more, inner petals curl inward
  const openAngle = layer * 0.35 + 0.15
  const dist = layer * 0.55 + 0.3
  const scaleY = 0.9 + layer * 0.18
  const scaleX = 0.55 + layer * 0.12

  useFrame(({ clock }) => {
    if (petalRef.current) {
      // Gentle breathing per petal
      const t = clock.getElapsedTime()
      petalRef.current.rotation.x = openAngle + Math.sin(t * 0.7 + offset) * 0.04
      petalRef.current.scale.setScalar(1 + Math.sin(t * 0.5 + offset) * 0.02)
    }
  })

  // Color gradient: inner petals deeper, outer lighter
  const hue = 340 + layer * 3
  const sat = 75 - layer * 5
  const light = 45 + layer * 7
  const color = `hsl(${hue}, ${sat}%, ${light}%)`
  const emissive = `hsl(${hue}, ${sat - 10}%, ${light - 15}%)`

  return (
    <group rotation={[0, angle, 0]}>
      <group position={[0, 0, dist]}>
        <mesh ref={petalRef} rotation={[openAngle, 0, 0]} scale={[scaleX, scaleY, 0.18]}>
          <sphereGeometry args={[1, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.25}
            metalness={0.15}
            roughness={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  )
}

// --- Sparkle Particles floating around ---
function Sparkles({ count = 40 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      ),
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      scale: 0.02 + Math.random() * 0.04,
    }))
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    particles.forEach((p, i) => {
      dummy.position.set(
        p.pos.x + Math.sin(t * p.speed + p.offset) * 0.5,
        p.pos.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.5,
        p.pos.z + Math.sin(t * p.speed * 0.5 + p.offset) * 0.3
      )
      const s = p.scale * (0.6 + Math.sin(t * 2 + p.offset) * 0.4)
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#FFD700"
        emissive="#FFD700"
        emissiveIntensity={1.2}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  )
}

// --- Full Rose Flower ---
function Rose() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime()
      groupRef.current.rotation.y = t * 0.15
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.08
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.15
    }
  })

  // Build petal layers: inner (more closed) → outer (more open)
  const layers = [
    { count: 5, layer: 0 },
    { count: 7, layer: 1 },
    { count: 9, layer: 2 },
    { count: 11, layer: 3 },
  ]

  return (
    <group ref={groupRef}>
      {layers.map(({ count, layer }) =>
        Array.from({ length: count }, (_, i) => (
          <RosePetal
            key={`${layer}-${i}`}
            angle={(i / count) * Math.PI * 2 + layer * 0.3}
            layer={layer}
            index={i}
          />
        ))
      )}

      {/* Center bud */}
      <mesh scale={[0.35, 0.4, 0.35]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="hsl(340, 80%, 40%)"
          emissive="hsl(340, 70%, 25%)"
          emissiveIntensity={0.4}
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>

      {/* Stem */}
      <mesh position={[0, -2.8, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 3.5, 12]} />
        <meshStandardMaterial color="#2D6B22" roughness={0.7} />
      </mesh>

      {/* Leaves */}
      {[0, 1].map((i) => (
        <group key={`leaf-${i}`} position={[0, -1.2 - i * 1.0, 0]}>
          <mesh
            rotation={[0.2 * (i === 0 ? 1 : -1), 0, (-0.5 + i * 1.0)]}
            scale={[0.4, 0.9, 0.12]}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#3D8B37" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// --- Camera with zoom-in / zoom-out breathing ---
function ZoomCamera() {
  const { camera } = useThree()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // Smooth zoom: oscillate camera z between 3.5 and 6.5
    camera.position.z = 5 + Math.sin(t * 0.35) * 1.5
    // Slight vertical drift
    camera.position.y = Math.sin(t * 0.25) * 0.3
    camera.lookAt(0, 0, 0)
  })

  return null
}

// --- Main Scene ---
export default function FlowerScene() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#C2185B] via-[#E91E63] to-[#F8BBD0]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ZoomCamera />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 8, 5]} intensity={1.2} color="#FFE0E6" />
        <pointLight position={[-5, -3, 8]} intensity={0.6} color="#E91E63" />
        <pointLight position={[0, 5, -5]} intensity={0.4} color="#FFD700" />

        <Rose />
        <Sparkles count={50} />
      </Canvas>
    </div>
  )
}
