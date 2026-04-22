import type { CartItem } from './cart'

export type Order = {
  id: string
  createdAt: string
  items: CartItem[]
  subtotal: number
  deliveryFee?: number
  total?: number
  customer?: {
    fullName: string
    phone: string
    address: string
    notes?: string
  }
}

