export type ProductCategory =
  | 'Fruits'
  | 'Vegetables'
  | 'Drinks'
  | 'Snacks'
  | 'Chocolates'
  | 'Biscuits'
  | 'Juices'
  | 'Toys'

export type Product = {
  id: string
  name: string
  category: ProductCategory
  price: number
  unit: string
  rating: number
  featured: boolean
  badge?: string
  description: string
  image: string
}

