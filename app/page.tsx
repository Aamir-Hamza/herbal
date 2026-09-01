import { SiteHeader } from "@/components/sections/site-header"
import { Hero } from "@/components/sections/hero"
import { FeaturedProducts } from "@/components/sections/featured-products"
import { Storytelling } from "@/components/sections/storytelling"
import { ValueProps } from "@/components/sections/value-props"
import { Certifications } from "@/components/sections/certifications"
import { Journal } from "@/components/sections/journal"
import { SiteFooter } from "@/components/sections/site-footer"

export default function Page() {
  return (
    <main className="relative z-10 bg-transparent">
      <SiteHeader />
      <Hero />
      <FeaturedProducts />
      <Storytelling />
      <ValueProps />
      <Certifications />
      <Journal />
      <SiteFooter />
    </main>
  )
}
