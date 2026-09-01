"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { products, type Product } from "@/lib/data"

export type CartLine = {
  product: Product
  qty: number
}

type CartContextValue = {
  count: number
  lines: CartLine[]
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  add: (id: string, open?: boolean) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [qtyById, setQtyById] = useState<Record<string, number>>({})
  const [isOpen, setIsOpen] = useState(false)

  const add = useCallback((id: string, open = true) => {
    setQtyById((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
    if (open) setIsOpen(true)
  }, [])

  const remove = useCallback((id: string) => {
    setQtyById((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setQtyById((prev) => {
      if (qty <= 0) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      return { ...prev, [id]: qty }
    })
  }, [])

  const lines = useMemo<CartLine[]>(() => {
    return Object.entries(qtyById)
      .map(([id, qty]) => {
        const product = products.find((p) => p.id === id)
        if (!product) return null
        return { product, qty }
      })
      .filter((line): line is CartLine => Boolean(line))
  }, [qtyById])

  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty, 0),
    [lines],
  )

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.product.price * line.qty, 0),
    [lines],
  )

  const value = useMemo(
    () => ({
      count,
      lines,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((v) => !v),
      add,
      remove,
      setQty,
    }),
    [count, lines, subtotal, isOpen, add, remove, setQty],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider")
  }
  return ctx
}
