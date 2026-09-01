"use client"

import {
  useCallback,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react"
import { cn } from "@/lib/utils"

export function TiltCard({
  children,
  className,
  maxTilt = 10,
}: {
  children: ReactNode
  className?: string
  maxTilt?: number
}) {
  const card = useRef<HTMLDivElement>(null)
  const shine = useRef<HTMLDivElement>(null)

  const onMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const el = card.current
      if (!el) return
      if (window.matchMedia("(pointer: coarse)").matches) return
      const rect = el.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      const rx = (0.5 - y) * maxTilt
      const ry = (x - 0.5) * maxTilt
      el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`
      if (shine.current) {
        shine.current.style.opacity = "1"
        shine.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(229,195,120,0.42), transparent 52%)`
      }
    },
    [maxTilt],
  )

  const onLeave = useCallback(() => {
    const el = card.current
    if (!el) return
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)"
    if (shine.current) shine.current.style.opacity = "0"
  }, [])

  return (
    <div
      ref={card}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "relative transform-gpu transition-transform duration-300 ease-out will-change-transform",
        className,
      )}
    >
      {children}
      <div
        ref={shine}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 mix-blend-screen transition-opacity duration-300"
      />
    </div>
  )
}
