import type { Order } from '../types/order'

const STORAGE_KEY = 'qs.orders.v1'

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Order[]
  } catch {
    return []
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

export function saveOrder(order: Order) {
  const prev = loadOrders()
  saveOrders([order, ...prev])
  localStorage.setItem('qs.lastOrderId', order.id)
}

export function loadLastOrderId(): string | null {
  return localStorage.getItem('qs.lastOrderId')
}

