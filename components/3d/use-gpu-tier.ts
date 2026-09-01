"use client"

import { useEffect, useState } from "react"
import { detectGpuTier, type GpuTier } from "@/lib/gpu"

export function useGpuTier(): GpuTier | null {
  const [tier, setTier] = useState<GpuTier | null>(null)

  useEffect(() => {
    setTier(detectGpuTier())
  }, [])

  return tier
}
