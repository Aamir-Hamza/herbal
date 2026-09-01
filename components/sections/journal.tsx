import { ArrowRight } from "lucide-react"
import { blogs } from "@/lib/data"
import { RevealText } from "@/components/ui/reveal-text"
import { SectionEyebrow } from "@/components/ui/organic-badge"

export function Journal() {
  return (
    <section id="journal" className="relative z-10 px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionEyebrow>The Journal</SectionEyebrow>
            <RevealText
              as="h2"
              text="Notes on living well"
              className="mt-2 font-serif text-4xl font-semibold text-forest sm:text-5xl"
            />
          </div>
          <a
            href="#journal"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-olive hover:text-gold"
          >
            Read the journal
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {blogs.map((b) => (
            <article
              key={b.id}
              className="group overflow-hidden rounded-[1.6rem] border border-white/50 bg-white/50 backdrop-blur-md transition-shadow hover:shadow-[0_24px_60px_rgba(15,41,30,0.1)]"
            >
              <div
                className="relative h-52 overflow-hidden"
                style={{
                  background:
                    b.id === "tulsi"
                      ? "linear-gradient(135deg, #1B3B2B, #A3B18A)"
                      : "linear-gradient(135deg, #0F291E, #E5C378)",
                }}
              >
                <div className="absolute inset-0 opacity-30 mix-blend-overlay transition-transform duration-700 group-hover:scale-110">
                  <svg viewBox="0 0 400 200" className="h-full w-full">
                    <path
                      d="M40 160 C80 40 160 40 200 120 C240 40 320 40 360 160"
                      fill="none"
                      stroke="#F8F9F5"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-muted-foreground">
                  {b.date} · {b.author}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug text-forest">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {b.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-olive">
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
