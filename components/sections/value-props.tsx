import {
  Leaf,
  Sun,
  Droplets,
  ShieldCheck,
  HandHeart,
  Recycle,
} from "lucide-react"
import { RevealText } from "@/components/ui/reveal-text"
import { SectionEyebrow } from "@/components/ui/organic-badge"

const props = [
  {
    icon: Leaf,
    title: "Whole plant",
    body: "Leaf, root, and flower — never a single isolated compound.",
  },
  {
    icon: Sun,
    title: "Peak harvest",
    body: "Cut at first light, when volatile oils sit at their highest.",
  },
  {
    icon: Droplets,
    title: "Living soil",
    body: "Regenerative plots, compost teas, and zero synthetics.",
  },
  {
    icon: ShieldCheck,
    title: "Certified organic",
    body: "USDA Organic, Non-GMO, and Fair Trade — batch by batch.",
  },
  {
    icon: HandHeart,
    title: "Grown with farmers",
    body: "Long partnerships. Fair contracts. Shared genetics.",
  },
  {
    icon: Recycle,
    title: "Honest packaging",
    body: "Glass, paper, and as little as the ritual requires.",
  },
]

export function ValueProps() {
  return (
    <section id="ritual" className="relative z-10 px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>The Vana standard</SectionEyebrow>
          <RevealText
            as="h2"
            text="Quiet luxury, grown in dirt."
            className="mt-3 font-serif text-4xl font-semibold text-forest sm:text-5xl"
          />
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {props.map((item) => (
            <li
              key={item.title}
              className="group rounded-[1.4rem] border border-white/50 bg-white/50 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-gradient-to-br hover:from-white/80 hover:to-champagne/20"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive/10 text-olive transition-colors group-hover:bg-gold/20 group-hover:text-olive">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-forest">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
