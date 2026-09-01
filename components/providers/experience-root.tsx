"use client"

import { ReactLenis, useLenis } from "lenis/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"
import { CartProvider } from "@/components/providers/cart-provider"
import { CartDrawer } from "@/components/sections/cart-drawer"

const BackgroundShader = dynamic(
  () =>
    import("@/components/3d/background-shader").then((m) => m.BackgroundShader),
  { ssr: false },
)

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function GsapLenisSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const onScroll = () => ScrollTrigger.update()
    lenis.on("scroll", onScroll)

    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off("scroll", onScroll)
      gsap.ticker.remove(onTick)
    }
  }, [lenis])

  return null
}

export function ExperienceRoot({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: reduced ? 1 : 0.075,
        duration: reduced ? 0 : 1.15,
        smoothWheel: !reduced,
      }}
    >
      <GsapLenisSync />
      <CartProvider>
        <BackgroundShader />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <CartDrawer />
      </CartProvider>
    </ReactLenis>
  )
}
