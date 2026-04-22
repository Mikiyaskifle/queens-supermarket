import * as React from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import type { CartItem } from '../types/cart'

type CartContextValue = {
  items: CartItem[]
  count: number
  getQty: (productId: string) => number
  add: (productId: string, qty?: number) => void
  setQty: (productId: string, qty: number) => void
  remove: (productId: string) => void
  clear: () => void
}

const CartContext = React.createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'qs.cart.v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorageState<CartItem[]>(STORAGE_KEY, [])

  const setQty = React.useCallback(
    (productId: string, qty: number) => {
      const safe = Math.max(0, Math.min(99, Math.floor(qty)))
      setItems((prev) => {
        const next = prev.filter((i) => i.productId !== productId)
        if (safe === 0) return next
        return [...next, { productId, qty: safe }]
      })
    },
    [setItems],
  )

  const add = React.useCallback(
    (productId: string, qty = 1) => {
      setItems((prev) => {
        const found = prev.find((i) => i.productId === productId)
        if (!found) return [...prev, { productId, qty: Math.max(1, qty) }]
        const nextQty = Math.min(99, found.qty + Math.max(1, qty))
        return prev.map((i) => (i.productId === productId ? { ...i, qty: nextQty } : i))
      })
    },
    [setItems],
  )

  const remove = React.useCallback(
    (productId: string) => setItems((prev) => prev.filter((i) => i.productId !== productId)),
    [setItems],
  )

  const clear = React.useCallback(() => setItems([]), [setItems])

  const getQty = React.useCallback(
    (productId: string) => items.find((i) => i.productId === productId)?.qty ?? 0,
    [items],
  )

  const count = React.useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  return (
    <CartContext.Provider value={{ items, count, getQty, add, setQty, remove, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

