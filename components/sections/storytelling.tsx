"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { farmSteps } from "@/lib/data"
import { RevealText } from "@/components/ui/reveal-text"
import { SectionEyebrow } from "@/components/ui/organic-badge"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Storytelling() {
  const pin = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = pin.current
    const slides = track.current
    const bar = progress.current
    if (!section || !slides || !bar) return

    const panels = gsap.utils.toArray<HTMLElement>("[data-story-panel]")
    if (panels.length < 2) return

    const ctx = gsap.context(() => {
      gsap.set(panels, { autoAlpha: 0, y: 36 })
      gsap.set(panels[0], { autoAlpha: 1, y: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${panels.length * 110}%`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
        },
      })

      tl.to(bar, { scaleY: 1, ease: "none", duration: panels.length }, 0)

      panels.forEach((panel, i) => {
        if (i === 0) return
        const at = i
        tl.to(panels[i - 1], { autoAlpha: 0, y: -40, duration: 0.85 }, at)
        tl.to(panel, { autoAlpha: 1, y: 0, duration: 0.85 }, at)
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={pin}
      id="story"
      className="relative z-10 flex min-h-screen items-center overflow-hidden bg-forest text-stone"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sage/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionEyebrow light>From farm to table</SectionEyebrow>
          <RevealText
            as="h2"
            text="A harvest, told in five breaths."
            className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl"
          />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-stone/70">
            Scroll to walk the path with us — seed, soil, harvest, craft, and
            the table where it becomes ritual.
          </p>

          <div className="relative mt-10 ml-1 h-48 w-px bg-stone/15">
            <div
              ref={progress}
              className="absolute inset-x-0 top-0 h-full origin-top bg-gold"
              style={{ transform: "scaleY(0.12)" }}
            />
          </div>
        </div>

        <div ref={track} className="relative min-h-[340px] lg:min-h-[420px]">
          {farmSteps.map((step, i) => (
            <article
              key={step.id}
              data-story-panel
              className={`absolute inset-0 flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md gold-hairline ${i === 0 ? "opacity-100" : "opacity-0"}`}
            >
              <p className="font-serif text-6xl text-gold/80">{step.numeral}</p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-champagne">
                {step.kicker}
              </p>
              <h3 className="mt-2 font-serif text-4xl font-semibold">{step.title}</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-stone/75">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
