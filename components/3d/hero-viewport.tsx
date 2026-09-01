"use client"

import dynamic from "next/dynamic"
import { useGpuTier } from "@/components/3d/use-gpu-tier"
import { CanvasFallback } from "@/components/3d/canvas-fallback"
import { CanvasLoader } from "@/components/3d/canvas-loader"

const HeroCanvas = dynamic(
  () => import("@/components/3d/hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false, loading: () => <CanvasLoader /> },
)

export function HeroViewport() {
  const tier = useGpuTier()

  if (tier === null) return <CanvasLoader />
  if (tier === "none") return <CanvasFallback />

  return (
    <HeroCanvas
      dpr={tier === "high" ? [1, 1.75] : [1, 1]}
      quality={tier === "high" ? "high" : "low"}
    />
  )
}
