"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useInView } from "framer-motion"
import * as THREE from "three"
import { HeroScene } from "@/components/3d/hero-scene"
import { CanvasLoader } from "@/components/3d/canvas-loader"

export function HeroCanvas({
  dpr,
  quality,
}: {
  dpr: [number, number]
  quality: "high" | "low"
}) {
  const root = useRef<HTMLDivElement>(null)
  const inView = useInView(root, { margin: "200px 0px" })

  return (
    <div ref={root} className="absolute inset-0 h-full w-full">
      <Canvas
        className="h-full w-full touch-pan-y"
        dpr={dpr}
        frameloop={inView ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.18,
        }}
        camera={{ position: [0, 0.2, 6.2], fov: 38, near: 0.1, far: 40 }}
        shadows={false}
      >
        <Suspense fallback={null}>
          <HeroScene quality={quality} />
          <IdleNudge />
        </Suspense>
      </Canvas>
    </div>
  )
}

function IdleNudge() {
  const { viewport } = useThree()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const wide = viewport.aspect > 1.05
    state.camera.position.x = Math.sin(t * 0.12) * 0.18
    state.camera.position.y = 0.18 + Math.sin(t * 0.09) * 0.06
    state.camera.lookAt(wide ? 0.9 : 0, wide ? 0.12 : 0.38, 0)
  })
  return null
}
