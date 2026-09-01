export type GpuTier = "high" | "low" | "none"

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas")
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    )
  } catch {
    return false
  }
}

export function detectGpuTier(): GpuTier {
  if (typeof window === "undefined") return "none"

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduce) return "none"
  if (!hasWebGL()) return "none"

  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean; effectiveType?: string }
  }

  if (nav.connection?.saveData) return "none"
  if (nav.connection?.effectiveType === "2g") return "none"
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return "low"
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
    return "low"
  }

  const isCoarse = window.matchMedia("(pointer: coarse)").matches
  const isNarrow = window.matchMedia("(max-width: 768px)").matches
  if (isCoarse && isNarrow) return "low"

  return "high"
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
