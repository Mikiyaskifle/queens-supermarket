import * as React from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

type WishlistContextValue = {
  ids: string[]
  count: number
  has: (productId: string) => boolean
  toggle: (productId: string) => void
  clear: () => void
}

const WishlistContext = React.createContext<WishlistContextValue | null>(null)

const STORAGE_KEY = 'qs.wishlist.v1'

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useLocalStorageState<string[]>(STORAGE_KEY, [])

  const has = React.useCallback((productId: string) => ids.includes(productId), [ids])

  const toggle = React.useCallback(
    (productId: string) => {
      setIds((prev) =>
        prev.includes(productId) ? prev.filter((id) => id !== productId) : [productId, ...prev],
      )
    },
    [setIds],
  )

  const clear = React.useCallback(() => setIds([]), [setIds])

  return (
    <WishlistContext.Provider value={{ ids, count: ids.length, has, toggle, clear }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = React.useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}

