"use client"

import { Minus, Plus, ShoppingBag, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/components/providers/cart-provider"
import { MagneticButton } from "@/components/ui/magnetic-button"

export function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, count, setQty, remove } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[70] bg-forest/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-stone shadow-[-24px_0_80px_rgba(15,41,30,0.22)]"
          >
            <div className="flex items-center justify-between border-b border-forest/10 px-6 py-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  Your ritual
                </p>
                <h2 id="cart-title" className="font-serif text-2xl text-forest">
                  Cart · {count} {count === 1 ? "piece" : "pieces"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-full p-2 hover:bg-mist"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-8 w-8 text-olive/40" />
                  <p className="mt-4 font-serif text-xl text-forest">
                    The basket is empty
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add a few essences from the collection.
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-6 text-sm font-semibold text-olive underline-offset-4 hover:underline"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  {lines.map(({ product, qty }) => (
                    <li key={product.id} className="flex gap-4">
                      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-mist">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                          {product.concern}
                        </p>
                        <h3 className="truncate font-serif text-lg leading-snug text-forest">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-forest/15 bg-white/70">
                            <button
                              type="button"
                              className="p-2"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(product.id, qty - 1)}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">
                              {qty}
                            </span>
                            <button
                              type="button"
                              className="p-2"
                              aria-label="Increase quantity"
                              onClick={() => setQty(product.id, qty + 1)}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(product.id)}
                            className="text-xs text-muted-foreground hover:text-forest"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <p className="shrink-0 font-serif text-lg text-forest">
                        ${(product.price * qty).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-forest/10 px-6 py-5">
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-serif text-3xl text-forest">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <MagneticButton variant="gold" className="w-full">
                  Checkout
                </MagneticButton>
                <p className="mt-3 text-center text-[11px] tracking-wide text-muted-foreground">
                  Complimentary shipping over $49
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
