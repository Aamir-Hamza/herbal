"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { Leaf, AtSign, ArrowUpRight, Check } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"

const columns = [
  {
    heading: "Shop",
    links: ["Collection", "Teas & Infusions", "Kitchen Essentials", "Gifting"],
  },
  {
    heading: "House",
    links: ["The Farm", "Whole-Herb Promise", "Journal", "Certifications"],
  },
  {
    heading: "Atelier",
    links: ["Contact", "Shipping", "Wholesale", "Press"],
  },
]

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    setDone(true)
    setEmail("")
  }

  return (
    <footer className="relative z-10 mt-8 bg-olive text-stone">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 border-b border-stone/15 pb-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-champagne">
              The circle
            </p>
            <h2 className="mt-3 max-w-lg font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              A letter from the harvest, once a moon.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone/70">
              Seasonal rituals, limited lots, and 10% off your first order —
              written like a field note, never a blast.
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col justify-end gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="newsletter-glow flex rounded-full border border-stone/20 bg-forest/40 p-1.5 transition-shadow">
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@atelier.vana"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-stone placeholder:text-stone/40 focus:outline-none"
              />
              <MagneticButton variant="gold" type="submit" strength={0.15}>
                {done ? (
                  <>
                    <Check className="h-4 w-4" /> Joined
                  </>
                ) : (
                  "Subscribe"
                )}
              </MagneticButton>
            </div>
          </form>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#top" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-forest">
                <Leaf className="h-5 w-5" />
              </span>
              <span className="font-serif text-2xl font-semibold">Vana</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone/70">
              Botanical luxury, grown organically and finished like an
              apothecary — for the table, the cup, and the long evening.
            </p>
            <div className="mt-5 flex gap-2">
              {["Instagram", "Are.na", "Notes"].map((label) => (
                <a
                  key={label}
                  href="#top"
                  className="inline-flex items-center gap-1.5 rounded-full border border-stone/20 px-3 py-1.5 text-xs text-stone/80 transition-colors hover:border-gold/50 hover:text-champagne"
                >
                  {label === "Instagram" ? (
                    <AtSign className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  )}
                  {label}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-champagne">
                {col.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#collection"
                      className="text-sm text-stone/75 transition-colors hover:text-stone"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-stone/15 pt-6 text-xs text-stone/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Vana Atelier. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#top" className="hover:text-stone">
              Privacy
            </a>
            <a href="#top" className="hover:text-stone">
              Terms
            </a>
            <a href="#top" className="hover:text-stone">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
