import * as React from 'react'
import { loadProducts } from '../data/products'
import type { Product } from '../types/product'

export function useProducts() {
  const [products, setProducts] = React.useState<Product[] | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let alive = true
    loadProducts()
      .then((p) => {
        if (!alive) return
        setProducts(p)
      })
      .catch((e: unknown) => {
        if (!alive) return
        setError(e instanceof Error ? e.message : 'Failed to load products')
      })
    return () => {
      alive = false
    }
  }, [])

  return { products, error }
}

