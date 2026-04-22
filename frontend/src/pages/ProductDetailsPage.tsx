import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Tag,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { useCart } from '../context/cart'
import { useToast } from '../context/toast'
import { useWishlist } from '../context/wishlist'
import { useProducts } from '../hooks/useProducts'
import { cn } from '../lib/cn'
import { formatETB } from '../lib/money'

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export default function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>()
  const { products } = useProducts()
  const cart = useCart()
  const wishlist = useWishlist()
  const toast = useToast()
  const [qty, setQty] = React.useState(1)
  const [imgLoaded, setImgLoaded] = React.useState(false)

  const product = products?.find((p) => p.id === productId)
  const related = products
    ?.filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4)

  const liked = product ? wishlist.has(product.id) : false
  const cartQty = product ? cart.getQty(product.id) : 0

  if (products && !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
        <div className="glass ring-gold rounded-[2.25rem] p-10 text-center">
          <div className="font-display text-xl font-extrabold text-slate-900 dark:text-white">
            Product not found
          </div>
          <p className="mt-2 text-slate-700 dark:text-slate-200">
            This item may have been removed or the link is incorrect.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-royal-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-soft hover:bg-royal-700 focus-gold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      {/* Breadcrumb */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mb-6"
      >
        <Link to="/" className="hover:text-royal-700 dark:hover:text-gold-300 focus-gold rounded-lg px-1">
          Home
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-royal-700 dark:hover:text-gold-300 focus-gold rounded-lg px-1">
          Products
        </Link>
        {product && (
          <>
            <span>/</span>
            <Link
              to={`/products?category=${product.category}`}
              className="hover:text-royal-700 dark:hover:text-gold-300 focus-gold rounded-lg px-1"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[160px]">
              {product.name}
            </span>
          </>
        )}
      </motion.div>

      {/* Main product section */}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 blur-3xl opacity-50">
            <div className="absolute left-8 top-8 h-56 w-56 rounded-full bg-gold-500/30" />
            <div className="absolute right-4 bottom-4 h-48 w-48 rounded-full bg-royal-600/25" />
          </div>

          <div className="glass ring-gold rounded-[2.5rem] overflow-hidden">
            {!product && (
              <div className="h-[420px] bg-slate-200/70 dark:bg-white/[0.06] animate-pulse" />
            )}
            {product && (
              <div className="relative h-[380px] sm:h-[460px] overflow-hidden">
                <AnimatePresence>
                  {!imgLoaded && (
                    <motion.div
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-slate-200/70 dark:bg-white/[0.06] animate-pulse"
                    />
                  )}
                </AnimatePresence>
                <motion.img
                  src={product.image}
                  alt={product.name}
                  onLoad={() => setImgLoaded(true)}
                  initial={{ scale: 1.06, opacity: 0 }}
                  animate={{ scale: 1, opacity: imgLoaded ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  {product.badge && (
                    <span className="rounded-full bg-white/80 dark:bg-white/[0.12] border border-white/40 dark:border-white/10 px-3 py-1.5 text-xs font-extrabold tracking-wide text-slate-900 dark:text-white backdrop-blur">
                      {product.badge}
                    </span>
                  )}
                  {product.featured && (
                    <span className="rounded-full bg-gold-500/90 border border-gold-500/50 px-3 py-1.5 text-xs font-extrabold tracking-wide text-slate-900 backdrop-blur">
                      ★ Featured
                    </span>
                  )}
                </div>

                {/* Wishlist button */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    wishlist.toggle(product.id)
                    toast.push({
                      kind: 'success',
                      title: liked ? 'Removed from wishlist' : 'Saved to wishlist',
                      message: product.name,
                    })
                  }}
                  className={cn(
                    'absolute right-5 top-5 h-12 w-12 rounded-2xl backdrop-blur border flex items-center justify-center focus-gold transition-colors',
                    'bg-white/70 border-white/40 hover:bg-white/90',
                    'dark:bg-white/[0.10] dark:border-white/10 dark:hover:bg-white/[0.18]',
                  )}
                  aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    className={cn(
                      'h-5 w-5 transition-colors',
                      liked ? 'fill-gold-500 text-gold-500' : 'text-slate-900 dark:text-white',
                    )}
                  />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5"
        >
          {!product ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 w-24 rounded bg-slate-200/70 dark:bg-white/[0.06]" />
              <div className="h-8 w-3/4 rounded bg-slate-200/70 dark:bg-white/[0.06]" />
              <div className="h-4 w-full rounded bg-slate-200/70 dark:bg-white/[0.06]" />
              <div className="h-4 w-2/3 rounded bg-slate-200/70 dark:bg-white/[0.06]" />
            </div>
          ) : (
            <>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="rounded-full bg-royal-600/10 dark:bg-gold-500/10 border border-royal-600/20 dark:border-gold-500/20 px-3 py-1 text-xs font-extrabold tracking-wide text-royal-700 dark:text-gold-300">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < Math.round(product.rating)
                            ? 'fill-gold-500 text-gold-500'
                            : 'text-slate-300 dark:text-slate-600',
                        )}
                      />
                    ))}
                    <span className="ml-1 text-sm font-extrabold text-slate-900 dark:text-white">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <h1 className="mt-3 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {product.name}
                </h1>

                <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="glass ring-gold rounded-3xl p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                      Price
                    </div>
                    <div className="mt-1 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      {formatETB(product.price)}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      per {product.unit}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl bg-gold-500/15 border border-gold-500/30 px-3 py-2">
                    <Tag className="h-4 w-4 text-gold-500" />
                    <span className="text-xs font-extrabold text-slate-900 dark:text-gold-200">
                      Gold Price
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center gap-2 glass ring-gold rounded-2xl p-1.5">
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="h-10 w-10 rounded-xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 flex items-center justify-center font-extrabold text-slate-900 dark:text-white hover:bg-white/70 dark:hover:bg-white/[0.09] focus-gold"
                    aria-label="Decrease"
                  >
                    <Minus className="h-4 w-4" />
                  </motion.button>
                  <div className="w-12 text-center font-extrabold text-lg text-slate-900 dark:text-white">
                    {qty}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    className="h-10 w-10 rounded-xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 flex items-center justify-center font-extrabold text-slate-900 dark:text-white hover:bg-white/70 dark:hover:bg-white/[0.09] focus-gold"
                    aria-label="Increase"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    cart.add(product.id, qty)
                    toast.push({
                      kind: 'success',
                      title: 'Added to cart',
                      message: `${qty}× ${product.name}`,
                    })
                  }}
                  className="flex-1 h-12 rounded-2xl bg-gold-500 text-slate-900 font-extrabold tracking-wide shadow-glowGold hover:bg-gold-400 focus-gold inline-flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart — {formatETB(product.price * qty)}
                </motion.button>
              </div>

              {cartQty > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between rounded-2xl bg-royal-600/10 dark:bg-gold-500/10 border border-royal-600/20 dark:border-gold-500/20 px-4 py-3"
                >
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Already in cart: {cartQty}×
                  </span>
                  <Link
                    to="/cart"
                    className="text-xs font-extrabold tracking-wide text-royal-700 dark:text-gold-300 hover:underline focus-gold rounded-lg px-1"
                  >
                    View Cart →
                  </Link>
                </motion.div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, label: 'Same-day', sub: 'Delivery' },
                  { icon: Shield, label: 'Quality', sub: 'Guaranteed' },
                  { icon: RotateCcw, label: 'Easy', sub: 'Returns' },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="glass ring-gold rounded-2xl p-3 text-center"
                  >
                    <b.icon className="h-5 w-5 text-gold-500 mx-auto" />
                    <div className="mt-1.5 text-xs font-extrabold text-slate-900 dark:text-white">
                      {b.label}
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300">
                      {b.sub}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Related products */}
      {(related?.length ?? 0) > 0 && (
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <div className="glass ring-gold rounded-[2.25rem] p-6 sm:p-8">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  More from {product?.category}
                </h2>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                  Curated picks you might love.
                </p>
              </div>
              <Link
                to={`/products?category=${product?.category}`}
                className="text-sm font-extrabold tracking-wide text-royal-700 dark:text-gold-300 hover:underline focus-gold rounded-lg px-1"
              >
                View all →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {!products &&
                Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              {related?.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </motion.section>
      )}
    </div>
  )
}
