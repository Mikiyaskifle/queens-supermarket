import { motion } from 'framer-motion'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AnimatedButton from '../components/AnimatedButton'
import EmptyState from '../components/EmptyState'
import { useCart } from '../context/cart'
import { useToast } from '../context/toast'
import { useProducts } from '../hooks/useProducts'
import { formatETB } from '../lib/money'

export default function CartPage() {
  const cart = useCart()
  const toast = useToast()
  const { products } = useProducts()
  const navigate = useNavigate()

  const rows =
    products?.flatMap((p) => {
      const qty = cart.getQty(p.id)
      if (!qty) return []
      return [{ product: p, qty, lineTotal: qty * p.price }]
    }) ?? null

  const subtotal = rows?.reduce((s, r) => s + r.lineTotal, 0) ?? 0

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Cart
          </motion.h1>
          <p className="mt-2 text-slate-700 dark:text-slate-200">
            A minimal, premium checkout experience—smooth and elegant.
          </p>
        </div>

        {cart.count > 0 && (
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              cart.clear()
              toast.push({ kind: 'info', title: 'Cart cleared' })
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-2.5 text-sm font-extrabold tracking-wide text-slate-900 dark:text-white hover:bg-white/70 dark:hover:bg-white/[0.09] focus-gold"
          >
            <Trash2 className="h-4 w-4" /> Clear
          </motion.button>
        )}
      </div>

      <div className="mt-8">
        {cart.count === 0 && (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Add a few premium picks and come back—your order summary will appear here beautifully."
            primaryAction={{ label: 'Shop Products', onClick: () => navigate('/products') }}
          />
        )}

        {rows && rows.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <section className="grid gap-3">
              {rows.map(({ product, qty, lineTotal }) => (
                <div
                  key={product.id}
                  className="glass ring-gold rounded-[2.25rem] p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-full sm:w-20 rounded-3xl object-cover border border-white/30 dark:border-white/10"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/products/${product.id}`}
                      className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white focus-gold rounded-xl"
                    >
                      {product.name}
                    </Link>
                    <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                      {formatETB(product.price)} • {product.unit}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => cart.setQty(product.id, qty - 1)}
                      className="h-10 w-10 rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 font-extrabold text-slate-900 dark:text-white hover:bg-white/70 dark:hover:bg-white/[0.09] focus-gold"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <div className="w-12 text-center font-extrabold text-slate-900 dark:text-white">
                      {qty}
                    </div>
                    <button
                      onClick={() => cart.setQty(product.id, qty + 1)}
                      className="h-10 w-10 rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 font-extrabold text-slate-900 dark:text-white hover:bg-white/70 dark:hover:bg-white/[0.09] focus-gold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-[160px]">
                    <div className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                      {formatETB(lineTotal)}
                    </div>
                    <button
                      onClick={() => {
                        cart.remove(product.id)
                        toast.push({ kind: 'info', title: 'Removed', message: product.name })
                      }}
                      className="h-10 w-10 rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 flex items-center justify-center hover:bg-white/70 dark:hover:bg-white/[0.09] focus-gold"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4 text-slate-900 dark:text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </section>

            <aside className="glass ring-gold rounded-[2.25rem] p-6 h-fit lg:sticky lg:top-[104px]">
              <div className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                Order Summary
              </div>
              <div className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {formatETB(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {formatETB(0)}
                  </span>
                </div>
                <div className="h-px w-full bg-white/40 dark:bg-white/10 my-2" />
                <div className="flex items-center justify-between">
                  <span className="font-extrabold">Total</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {formatETB(subtotal)}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <AnimatedButton
                  className="w-full justify-center"
                  onClick={() => navigate('/checkout')}
                >
                  Checkout
                </AnimatedButton>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

