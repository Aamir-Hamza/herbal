"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type RevealTextProps = {
  as?: "h1" | "h2" | "h3" | "p"
  text: string
  className?: string
  delay?: number
}

export function RevealText({
  as: Tag = "h2",
  text,
  className,
  delay = 0,
}: RevealTextProps) {
  const root = useRef<HTMLHeadingElement | HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return

    const words = el.querySelectorAll("[data-word]")
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.045,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [delay, text])

  return (
    <Tag ref={root as never} className={cn("text-balance", className)}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
          <span data-word className="inline-block will-change-transform">
            {word}
            {i < text.split(" ").length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  )
}
