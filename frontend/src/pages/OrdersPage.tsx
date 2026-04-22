import { motion } from 'framer-motion'
import { Crown, Package, ShoppingBag, ChevronDown, ChevronUp, Clock } from 'lucide-react'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import AnimatedButton from '../components/AnimatedButton'
import { loadOrders } from '../data/orders'
import { useProducts } from '../hooks/useProducts'
import { formatETB } from '../lib/money'
import type { Order } from '../types/order'

const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

function OrderCard({ order, products }: { order: Order; products: ReturnType<typeof useProducts>['products'] }) {
  const [expanded, setExpanded] = React.useState(false)
  const deliveryFee = order.deliveryFee ?? 0
  const total = order.total ?? (order.subtotal + deliveryFee)

  const date = new Date(order.createdAt)
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <motion.div
      variants={fadeUp}
      className="glass ring-gold rounded-[2.25rem] overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-500/15 border border-gold-500/30">
              <Package className="h-5 w-5 text-gold-500" />
            </div>
            <div>
              <div className="font-display text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
                Order #{order.id.slice(-8).toUpperCase()}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                <Clock className="h-3.5 w-3.5" />
                {formattedDate} at {formattedTime}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-royal-600/10 dark:bg-gold-500/10 border border-royal-600/20 dark:border-gold-500/20 px-3 py-1.5 text-xs font-extrabold tracking-wide text-royal-700 dark:text-gold-300">
              Confirmed
            </div>
            <div className="font-display text-base font-extrabold text-slate-900 dark:text-white">
              {formatETB(total)}
            </div>
          </div>
        </div>

        {/* Customer info */}
        {order.customer && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { k: 'Customer', v: order.customer.fullName },
              { k: 'Phone', v: order.customer.phone },
              { k: 'Address', v: order.customer.address },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-3"
              >
                <div className="text-[11px] font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                  {s.k}
                </div>
                <div className="mt-0.5 text-sm font-extrabold text-slate-900 dark:text-white truncate">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm text-slate-700 dark:text-slate-200">
            <span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {order.items.reduce((s, i) => s + i.qty, 0)}
              </span>{' '}
              items
            </span>
            <span>
              Subtotal:{' '}
              <span className="font-extrabold text-slate-900 dark:text-white">
                {formatETB(order.subtotal)}
              </span>
            </span>
            {deliveryFee > 0 && (
              <span>
                Delivery:{' '}
                <span className="font-extrabold text-slate-900 dark:text-white">
                  {formatETB(deliveryFee)}
                </span>
              </span>
            )}
          </div>

          <button
            onClick={() => setExpanded((e) => !e)}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-3 py-2 text-xs font-extrabold tracking-wide text-slate-900 dark:text-white hover:bg-white/70 dark:hover:bg-white/[0.09] focus-gold"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4" /> Hide items
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" /> View items
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded items */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-white/30 dark:border-white/10 px-5 sm:px-6 py-5"
        >
          <div className="grid gap-3">
            {order.items.map((item) => {
              const product = products?.find((p) => p.id === item.productId)
              return (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 p-3"
                >
                  {product?.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-14 w-14 rounded-2xl object-cover border border-white/30 dark:border-white/10 flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-sm font-extrabold text-slate-900 dark:text-white truncate">
                      {product?.name ?? item.productId}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      {product?.category} • {product?.unit}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {product ? formatETB(product.price * item.qty) : '—'}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      Qty: {item.qty}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {order.customer?.notes && (
            <div className="mt-4 rounded-2xl bg-gold-500/10 border border-gold-500/20 px-4 py-3">
              <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                Delivery Notes
              </div>
              <div className="mt-1 text-sm text-slate-800 dark:text-slate-100">
                {order.customer.notes}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default function OrdersPage() {
  const navigate = useNavigate()
  const { products } = useProducts()
  const [orders, setOrders] = React.useState<Order[]>([])

  React.useEffect(() => {
    setOrders(loadOrders())
  }, [])

  const totalSpent = orders.reduce((s, o) => s + (o.total ?? o.subtotal), 0)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            My Orders
          </motion.h1>
          <p className="mt-2 text-slate-700 dark:text-slate-200">
            Your order history, beautifully presented.
          </p>
        </div>

        {orders.length > 0 && (
          <AnimatedButton onClick={() => navigate('/products')}>
            <ShoppingBag className="h-4 w-4" /> Shop Again
          </AnimatedButton>
        )}
      </div>

      {/* Stats */}
      {orders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4"
        >
          {[
            { k: 'Total Orders', v: orders.length.toString() },
            { k: 'Total Spent', v: formatETB(totalSpent) },
            {
              k: 'Last Order',
              v: new Date(orders[0].createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              }),
            },
          ].map((s) => (
            <div key={s.k} className="glass ring-gold rounded-3xl px-5 py-4">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-gold-500" />
                <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                  {s.k}
                </div>
              </div>
              <div className="mt-1 font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      <div className="mt-8">
        {orders.length === 0 && (
          <EmptyState
            icon={Package}
            title="No orders yet"
            description="Place your first order and it will appear here with all the details—beautifully."
            primaryAction={{ label: 'Start Shopping', onClick: () => navigate('/products') }}
          />
        )}

        {orders.length > 0 && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              show: { transition: { staggerChildren: 0.07 } },
            }}
            className="grid gap-4"
          >
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} products={products} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
