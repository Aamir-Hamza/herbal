"use client"

import { useState } from "react"
import { Leaf, Search, ShoppingBag, User, Menu, X } from "lucide-react"
import { useCart } from "@/components/providers/cart-provider"
import { cn } from "@/lib/utils"

const nav = [
  { label: "Collection", href: "#collection" },
  { label: "Ritual", href: "#ritual" },
  { label: "The Farm", href: "#story" },
  { label: "Journal", href: "#journal" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { count, toggleCart } = useCart()

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-6">
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-white/20 bg-white/70 px-3 py-2 shadow-[0_12px_40px_rgba(15,41,30,0.08)] backdrop-blur-xl dark:bg-black/40 sm:px-5">
        <a href="#top" className="flex items-center gap-2 pl-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-olive text-stone">
            <Leaf className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <span className="font-serif text-2xl font-semibold tracking-tight text-forest">
            Vana
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[13px] font-medium tracking-wide text-forest/75 transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-0.5">
          <IconBtn label="Search">
            <Search className="h-4.5 w-4.5" />
          </IconBtn>
          <IconBtn label="Account">
            <User className="h-4.5 w-4.5" />
          </IconBtn>
          <button
            type="button"
            onClick={toggleCart}
            className="relative ml-1 flex items-center gap-2 rounded-full border border-gold/30 bg-olive px-3 py-2 text-stone transition-transform hover:scale-[1.03]"
            aria-label={`Cart, ${count} items`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span
              key={count}
              className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[10px] font-bold text-forest"
              style={{ animation: "pulse-gold 1.4s ease-out" }}
            >
              {count}
            </span>
          </button>
          <button
            type="button"
            className="rounded-full p-2 text-forest/70 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="pointer-events-auto mx-auto mt-2 max-w-6xl rounded-3xl border border-white/20 bg-white/85 px-5 py-4 backdrop-blur-xl lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="block py-2.5 text-sm font-medium text-forest/80"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

function IconBtn({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      className={cn(
        "hidden rounded-full p-2 text-forest/70 transition-colors hover:bg-mist hover:text-olive sm:inline-flex",
      )}
      aria-label={label}
    >
      {children}
    </button>
  )
}
