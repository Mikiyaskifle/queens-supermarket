import type { Product } from '../types/product'

export async function loadProducts(): Promise<Product[]> {
  const res = await fetch('/data/products.json')
  if (!res.ok) throw new Error('Failed to load products')
  return (await res.json()) as Product[]
}

