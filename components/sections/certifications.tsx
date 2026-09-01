import { BadgeCheck } from "lucide-react"
import { certifications } from "@/lib/data"

export function Certifications() {
  return (
    <section className="relative z-10 border-y border-forest/10 bg-white/40 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-olive/60">
          Certified & trusted, every batch
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {certifications.map((c) => (
            <li
              key={c}
              className="flex items-center gap-2 text-sm font-semibold text-forest/80"
            >
              <BadgeCheck className="h-5 w-5 text-gold" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
