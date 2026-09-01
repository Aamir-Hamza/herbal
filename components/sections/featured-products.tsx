"use client"

import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { products, type Product } from "@/lib/data"
import { SectionEyebrow } from "@/components/ui/organic-badge"
import { RevealText } from "@/components/ui/reveal-text"
import { StarRating } from "@/components/ui/star-rating"
import { useCart } from "@/components/providers/cart-provider"
import { cn } from "@/lib/utils"

const filters = ["All", "Teas", "Tonics", "Pantry"] as const

function categoryOf(product: Product) {
  if (product.concern === "Kitchen") return "Pantry"
  if (product.id.includes("tea") || product.concern === "Sleep") return "Teas"
  return "Tonics"
}

export function FeaturedProducts() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")
  const shop = useMemo(
    () =>
      products.filter((p) => filter === "All" || categoryOf(p) === filter),
    [filter],
  )

  return (
    <section id="collection" className="relative z-10 px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionEyebrow>Shop the harvest</SectionEyebrow>
            <RevealText
              as="h2"
              text="The collection"
              className="mt-2 font-serif text-4xl font-semibold text-forest sm:text-5xl"
            />
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Six whole-herb pieces, photographed as they leave the atelier.
              Add as many as you like — the cart keeps every bottle.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
                  filter === item
                    ? "bg-olive text-stone"
                    : "border border-forest/10 bg-white/50 text-olive hover:border-gold/40",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shop.map((product) => (
            <ShopCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ShopCard({ product }: { product: Product }) {
  const { add } = useCart()

  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-white/50 bg-white/55 shadow-[0_18px_50px_rgba(15,41,30,0.06)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_28px_70px_rgba(15,41,30,0.12)]">
      <div className="relative overflow-hidden bg-mist">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-olive backdrop-blur-md">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => add(product.id)}
          className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-2 rounded-full bg-olive py-3 text-sm font-semibold text-stone opacity-100 shadow-lg transition-all duration-300 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
        >
          <Plus className="h-4 w-4" />
          Add to cart
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
          {product.concern}
        </p>
        <h3 className="mt-1 font-serif text-2xl font-semibold leading-snug text-forest">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
        <StarRating
          rating={product.rating}
          reviews={product.reviews}
          className="mt-3"
        />
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-olive/50">
              {product.size}
            </p>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="font-serif text-2xl text-forest">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAt && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.compareAt.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => add(product.id)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-olive text-stone transition-transform hover:scale-105"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
