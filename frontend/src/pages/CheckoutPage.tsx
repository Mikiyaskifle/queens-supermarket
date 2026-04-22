import { motion } from 'framer-motion'
import { Loader2, ShoppingBag } from 'lucide-react'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { saveOrder } from '../data/orders'
import { useCart } from '../context/cart'
import { useToast } from '../context/toast'
import { useProducts } from '../hooks/useProducts'
import { formatETB } from '../lib/money'

type FormState = {
  fullName: string
  phone: string
  address: string
  notes: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const DELIVERY_FEE = 120

function validate(form: FormState): FormErrors {
  const e: FormErrors = {}
  if (form.fullName.trim().length < 3) e.fullName = 'Please enter your full name.'
  if (!/^[0-9+\-\s]{9,}$/.test(form.phone.trim()))
    e.phone = 'Please enter a valid phone number.'
  if (form.address.trim().length < 8) e.address = 'Delivery address is too short.'
  if (form.notes.length > 300) e.notes = 'Notes must be 300 characters or less.'
  return e
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const cart = useCart()
  const toast = useToast()
  const { products } = useProducts()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [form, setForm] = React.useState<FormState>({
    fullName: '',
    phone: '',
    address: '',
    notes: '',
  })
  const [errors, setErrors] = React.useState<FormErrors>({})

  const rows =
    products?.flatMap((p) => {
      const qty = cart.getQty(p.id)
      if (!qty) return []
      return [{ product: p, qty, lineTotal: qty * p.price }]
    }) ?? []

  const subtotal = rows.reduce((s, r) => s + r.lineTotal, 0)
  const total = subtotal + (rows.length > 0 ? DELIVERY_FEE : 0)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    if (rows.length === 0) return

    setIsSubmitting(true)
    await new Promise((r) => window.setTimeout(r, 800))

    const orderId = `ord_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
    saveOrder({
      id: orderId,
      createdAt: new Date().toISOString(),
      items: cart.items,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
      customer: {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        notes: form.notes.trim() || undefined,
      },
    })
    cart.clear()
    toast.push({ kind: 'success', title: 'Order placed', message: 'Redirecting to success page…' })
    navigate(`/order-success?id=${encodeURIComponent(orderId)}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <div className="mb-6">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Checkout
        </h1>
        <p className="mt-2 text-slate-700 dark:text-slate-200">
          Fast, smooth, and premium checkout in seconds.
        </p>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add products to cart before checking out."
          primaryAction={{ label: 'Shop Products', onClick: () => navigate('/products') }}
        />
      ) : (
        <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="glass ring-gold rounded-[2.25rem] p-5 sm:p-6">
            <div className="font-display text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              Customer Information
            </div>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2">
                <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                  Full Name
                </div>
                <input
                  value={form.fullName}
                  onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                  className="h-11 w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-gold"
                />
                {errors.fullName && <div className="text-xs text-red-500">{errors.fullName}</div>}
              </label>

              <label className="grid gap-2">
                <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                  Phone Number
                </div>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+251..."
                  className="h-11 w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-gold"
                />
                {errors.phone && <div className="text-xs text-red-500">{errors.phone}</div>}
              </label>

              <label className="grid gap-2">
                <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                  Delivery Address
                </div>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                  placeholder="Enter delivery address"
                  className="min-h-[100px] w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-gold"
                />
                {errors.address && <div className="text-xs text-red-500">{errors.address}</div>}
              </label>

              <label className="grid gap-2">
                <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                  Optional Notes
                </div>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Add delivery instructions (optional)"
                  className="min-h-[90px] w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-gold"
                />
                {errors.notes && <div className="text-xs text-red-500">{errors.notes}</div>}
              </label>
            </div>
          </section>

          <aside className="glass ring-gold rounded-[2.25rem] p-5 sm:p-6 h-fit lg:sticky lg:top-[104px]">
            <div className="font-display text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              Order Summary
            </div>
            <div className="mt-4 grid gap-3">
              {rows.map(({ product, qty, lineTotal }) => (
                <div
                  key={product.id}
                  className="rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 p-3 flex items-center gap-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded-2xl object-cover border border-white/40 dark:border-white/10"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-extrabold text-slate-900 dark:text-white">
                      {product.name}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">Qty: {qty}</div>
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                    {formatETB(lineTotal)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-2 text-sm text-slate-700 dark:text-slate-200">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-extrabold text-slate-900 dark:text-white">
                  {formatETB(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery Fee</span>
                <span className="font-extrabold text-slate-900 dark:text-white">
                  {formatETB(DELIVERY_FEE)}
                </span>
              </div>
              <div className="h-px w-full bg-white/40 dark:bg-white/10 my-2" />
              <div className="flex items-center justify-between">
                <span className="font-extrabold">Total</span>
                <span className="font-extrabold text-royal-700 dark:text-gold-300">
                  {formatETB(total)}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="mt-6 h-12 w-full rounded-2xl bg-gold-500 text-slate-900 font-extrabold tracking-wide shadow-glowGold hover:bg-gold-400 focus-gold disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Placing Order...
                </>
              ) : (
                'Place Order'
              )}
            </motion.button>
          </aside>
        </form>
      )}
    </div>
  )
}

