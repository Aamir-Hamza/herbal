"use client"

import {
  useCallback,
  useRef,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react"
import { cn } from "@/lib/utils"

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  href?: string
  variant?: "primary" | "ghost" | "gold"
  onClick?: () => void
  type?: "button" | "submit"
  strength?: number
}

export function MagneticButton({
  children,
  className,
  href,
  variant = "primary",
  onClick,
  type = "button",
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const rippleRef = useRef<HTMLSpanElement>(null)

  const reset = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = "translate3d(0,0,0)"
  }, [])

  const onMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const el = ref.current
      if (!el) return
      if (window.matchMedia("(pointer: coarse)").matches) return
      const rect = el.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`

      const ripple = rippleRef.current
      if (ripple) {
        const px = ((event.clientX - rect.left) / rect.width) * 100
        const py = ((event.clientY - rect.top) / rect.height) * 100
        ripple.style.background = `radial-gradient(circle at ${px}% ${py}%, rgb(229 195 120 / 0.55), transparent 62%)`
      }
    },
    [strength],
  )

  const styles = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-[box-shadow,background-color,color] duration-300 will-change-transform",
    variant === "primary" &&
      "fluid-fill text-stone glow-border hover:glow-border-strong",
    variant === "gold" &&
      "bg-gold text-forest glow-border hover:glow-border-strong",
    variant === "ghost" &&
      "border border-forest/15 bg-white/40 text-forest backdrop-blur-md hover:border-gold/50 hover:bg-white/70",
    className,
  )

  const inner = (
    <>
      <span
        ref={rippleRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )

  if (href) {
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        className={styles}
        onMouseMove={onMove}
        onMouseLeave={reset}
        onClick={onClick}
      >
        {inner}
      </a>
    )
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      className={styles}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={onClick}
    >
      {inner}
    </button>
  )
}
