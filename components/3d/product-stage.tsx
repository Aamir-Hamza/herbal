"use client"

import { Suspense, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Float } from "@react-three/drei"
import { useInView } from "framer-motion"
import * as THREE from "three"
import { ElixirBottle } from "@/components/3d/elixir-bottle"
import { StudioLights } from "@/components/3d/studio-lights"

function StageScene({
  glassColor,
  liquidColor,
  productKey,
}: {
  glassColor: string
  liquidColor: string
  productKey: string
}) {
  const group = useRef<THREE.Group>(null)
  const extra = useRef(0)

  useEffect(() => {
    extra.current = 0.85
  }, [productKey])

  useFrame((state) => {
    if (!group.current) return
    extra.current *= 0.9
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.4 + extra.current,
      0.06,
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.12,
      0.06,
    )
  })

  return (
    <>
      <StudioLights mood="night" />
      <group ref={group} position={[0, -0.15, 0]} scale={1.15}>
        <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.32}>
          <ElixirBottle
            transmission={false}
            glassColor={glassColor}
            liquidColor={liquidColor}
          />
        </Float>
      </group>
      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.45}
        scale={10}
        blur={2.8}
        far={4}
        color="#000000"
      />
    </>
  )
}

export function ProductStageCanvas({
  glassColor,
  liquidColor,
  productKey,
  dpr,
}: {
  glassColor: string
  liquidColor: string
  productKey: string
  dpr: [number, number]
}) {
  const root = useRef<HTMLDivElement>(null)
  const inView = useInView(root, { margin: "160px 0px" })

  return (
    <div ref={root} className="absolute inset-0">
      <Canvas
        className="h-full w-full touch-pan-y"
        dpr={dpr}
        frameloop={inView ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.22,
        }}
        camera={{ position: [0, 0.15, 5.4], fov: 32 }}
      >
        <Suspense fallback={null}>
          <StageScene
            glassColor={glassColor}
            liquidColor={liquidColor}
            productKey={productKey}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
