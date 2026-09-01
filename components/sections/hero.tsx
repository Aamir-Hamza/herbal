"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { HeroViewport } from "@/components/3d/hero-viewport"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { OrganicBadge } from "@/components/ui/organic-badge"
import { RevealText } from "@/components/ui/reveal-text"

const badges = ["USDA Organic", "Farm Direct", "Whole Herb"]

export function Hero() {
  return (
    <section
      id="top"
      className="relative z-10 min-h-[100svh] w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <HeroViewport />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(248,249,245,0.94)_0%,rgba(248,249,245,0.78)_38%,rgba(248,249,245,0.18)_62%,transparent_80%)] max-lg:bg-[linear-gradient(180deg,rgba(248,249,245,0.2)_0%,rgba(248,249,245,0.55)_42%,rgba(248,249,245,0.94)_72%)]"
      />

      <OrganicBadge className="absolute right-[8%] top-[28%] z-[2] hidden animate-float-soft lg:inline-flex">
        100% Organic
      </OrganicBadge>
      <OrganicBadge className="absolute bottom-[22%] right-[14%] z-[2] hidden animate-float-soft lg:inline-flex">
        Farm Direct
      </OrganicBadge>

      <div className="relative z-[3] mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-5 pb-10 pt-28 sm:px-8 lg:justify-center lg:pb-16 lg:pt-24">
        <div className="max-w-xl pointer-events-none lg:pointer-events-auto">
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-olive backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Modern botanical luxury
          </div>

          <RevealText
            as="h1"
            text="Whole herbs, held in light."
            className="mt-6 font-serif text-5xl font-semibold leading-[0.94] tracking-tight text-forest sm:text-6xl lg:text-[5.4rem]"
          />

          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            An immersive flagship for organic teas, tonics, and kitchen
            essentials — the complete plant, never fractionated, grown with the
            farmers who still know the soil by name.
          </p>

          <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton href="#collection" variant="primary">
              Enter the collection
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#story" variant="ghost">
              From farm to table
            </MagneticButton>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {badges.map((b) => (
              <OrganicBadge key={b}>{b}</OrganicBadge>
            ))}
          </div>
        </div>

        <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-forest/10 pt-6 lg:mt-16">
          {[
            { n: "25+", l: "Years of practice" },
            { n: "100%", l: "Whole herb" },
            { n: "1M+", l: "Households" },
          ].map((s) => (
            <div key={s.l}>
              <dt className="font-serif text-3xl font-semibold text-olive">
                {s.n}
              </dt>
              <dd className="mt-1 text-xs text-muted-foreground">{s.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
