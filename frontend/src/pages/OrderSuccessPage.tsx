import { AnimatePresence, motion } from 'framer-motion'
import { Crown, PartyPopper } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import AnimatedButton from '../components/AnimatedButton'
import { loadOrders } from '../data/orders'
import { formatETB } from '../lib/money'

export default function OrderSuccessPage() {
  const [params] = useSearchParams()
  const orderId = params.get('id')
  const orders = loadOrders()
  const order = orderId ? orders.find((o) => o.id === orderId) : orders[0]
  const deliveryFee = order?.deliveryFee ?? 0
  const total = order?.total ?? ((order?.subtotal ?? 0) + deliveryFee)

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <div className="glass ring-gold rounded-[2.5rem] p-8 sm:p-10 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-royal-600/20 blur-3xl" />
        </div>

        <div className="relative">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 14, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.92 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 520, damping: 22 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.75rem] bg-gold-500/15 border border-gold-500/30 shadow-glowGold"
              >
                <PartyPopper className="h-8 w-8 text-gold-500" />
              </motion.div>

              <h1 className="mt-5 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Your order has been placed successfully!
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-700 dark:text-slate-200">
                Freshness fit for a Queen—your items are being prepared with care.
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { k: 'Status', v: 'Confirmed' },
              { k: 'Delivery', v: 'Same‑day window' },
              { k: 'Support', v: 'Gold‑level' },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-[1.75rem] bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-5 py-4"
              >
                <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                  {s.k}
                </div>
                <div className="mt-0.5 font-display text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {s.v}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-gold-500" />
                <div className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Order Summary
                </div>
              </div>
              {order?.id && (
                <div className="text-xs font-extrabold tracking-wide text-royal-700 dark:text-gold-300">
                  #{order.id.slice(-8).toUpperCase()}
                </div>
              )}
            </div>

            <div className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-200">
              {!order && (
                <div>
                  No saved order found yet. Complete checkout to see the full summary here.
                </div>
              )}
              {order && (
                <>
                  <div className="flex items-center justify-between">
                    <span>Items</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {order.items.reduce((s, i) => s + i.qty, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {formatETB(order.subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delivery</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {formatETB(deliveryFee)}
                    </span>
                  </div>
                  <div className="h-px w-full bg-white/40 dark:bg-white/10 my-2" />
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold">Total</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {formatETB(total)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/products" className="focus-gold rounded-2xl">
              <AnimatedButton>Continue Shopping</AnimatedButton>
            </Link>
            <Link to="/orders" className="focus-gold rounded-2xl">
              <AnimatedButton variant="ghost">View Orders</AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

