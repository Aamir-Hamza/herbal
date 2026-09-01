"use client"

import { useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { ContactShadows, Float, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { ElixirBottle } from "@/components/3d/elixir-bottle"
import { StudioLights } from "@/components/3d/studio-lights"

function Leaf({
  position,
  rotation,
  scale = 1,
  color = "#8FAE7E",
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  color?: string
}) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, -0.55)
    shape.bezierCurveTo(0.28, -0.35, 0.38, 0.05, 0.18, 0.48)
    shape.bezierCurveTo(0.08, 0.72, 0.02, 0.9, 0, 1.05)
    shape.bezierCurveTo(-0.02, 0.9, -0.08, 0.72, -0.18, 0.48)
    shape.bezierCurveTo(-0.38, 0.05, -0.28, -0.35, 0, -0.55)
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.035,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 2,
    })
    geo.center()
    return geo
  }, [])

  return (
    <mesh
      geometry={geometry}
      position={position}
      rotation={rotation ?? [0.55, 0.35, -0.4]}
      scale={scale}
    >
      <meshPhysicalMaterial
        color={color}
        roughness={0.38}
        metalness={0.04}
        sheen={0.6}
        sheenColor="#C5D5B5"
        clearcoat={0.25}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Botanicals() {
  const orbit = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!orbit.current) return
    orbit.current.rotation.y = state.clock.elapsedTime * 0.12
    orbit.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.04
  })

  return (
    <group ref={orbit}>
      <Float speed={2.1} rotationIntensity={0.45} floatIntensity={0.7}>
        <Leaf position={[1.35, 0.7, 0.45]} scale={0.62} />
      </Float>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.9}>
        <Leaf
          position={[-1.15, 0.15, 0.55]}
          rotation={[0.3, -0.6, 0.9]}
          scale={0.48}
          color="#6F8F62"
        />
      </Float>
      <Float speed={1.9} rotationIntensity={0.35} floatIntensity={0.55}>
        <Leaf
          position={[0.85, -0.55, 0.7]}
          rotation={[-0.4, 0.5, 1.1]}
          scale={0.4}
          color="#B5C9A1"
        />
      </Float>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
        <Leaf
          position={[-0.7, 1.05, -0.2]}
          rotation={[0.8, 0.2, -0.3]}
          scale={0.34}
        />
      </Float>
    </group>
  )
}

export function HeroScene({ quality = "high" }: { quality?: "high" | "low" }) {
  const group = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const wide = viewport.aspect > 1.05

  useFrame((state) => {
    if (!group.current) return
    const targetX = wide ? 1.55 + state.pointer.x * 0.22 : state.pointer.x * 0.12
    const targetY = wide ? -0.12 + state.pointer.y * 0.08 : 0.42
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetX,
      0.05,
    )
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetY,
      0.05,
    )
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.28,
      0.045,
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.12,
      0.045,
    )
  })

  return (
    <>
      <StudioLights mood="day" />
      <group ref={group} scale={wide ? 1.08 : 0.92}>
        <Float speed={1.15} rotationIntensity={0.12} floatIntensity={0.38}>
          <ElixirBottle transmission={quality === "high"} />
        </Float>
        <Botanicals />
      </group>
      <Sparkles
        count={quality === "high" ? 48 : 22}
        scale={[10, 5, 4]}
        size={2.4}
        speed={0.28}
        opacity={0.55}
        color="#E5C378"
      />
      <ContactShadows
        position={[wide ? 1.55 : 0, -1.55, 0]}
        opacity={0.28}
        scale={12}
        blur={3.2}
        far={4}
        color="#0F291E"
      />
    </>
  )
}
