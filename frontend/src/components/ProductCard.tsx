import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cart'
import { useToast } from '../context/toast'
import { useWishlist } from '../context/wishlist'
import { cn } from '../lib/cn'
import { formatETB } from '../lib/money'
import type { Product } from '../types/product'

export default function ProductCard({ product }: { product: Product }) {
  const cart = useCart()
  const wishlist = useWishlist()
  const toast = useToast()

  const liked = wishlist.has(product.id)

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 520, damping: 30 }}
      className="group glass ring-gold rounded-[2.25rem] overflow-hidden hover:shadow-glowGold"
    >
      <div className="relative">
        <Link to={`/products/${product.id}`} className="block focus-gold">
          <div className="relative h-44 sm:h-48 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-80" />
          </div>
        </Link>

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.badge && (
            <span className="rounded-full bg-white/70 dark:bg-white/[0.08] border border-white/40 dark:border-white/10 px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-slate-900 dark:text-white backdrop-blur">
              {product.badge}
            </span>
          )}
          <span className="rounded-full bg-gold-500/20 border border-gold-500/30 px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-slate-900 dark:text-gold-200 backdrop-blur">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>

        <button
          onClick={() => {
            wishlist.toggle(product.id)
            toast.push({
              kind: 'success',
              title: liked ? 'Removed from wishlist' : 'Saved to wishlist',
              message: product.name,
            })
          }}
          className={cn(
            'absolute right-4 top-4 h-11 w-11 rounded-2xl backdrop-blur border flex items-center justify-center focus-gold transition-colors',
            'bg-white/65 border-white/40 hover:bg-white/80',
            'dark:bg-white/[0.08] dark:border-white/10 dark:hover:bg-white/[0.12]',
          )}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={cn(
              'h-5 w-5 transition-colors',
              liked ? 'fill-gold-500 text-gold-500' : 'text-slate-900 dark:text-white',
            )}
          />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs font-semibold tracking-wide text-royal-700 dark:text-gold-300">
              {product.category}
            </div>
            <Link
              to={`/products/${product.id}`}
              className="mt-1 block truncate font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white focus-gold"
              title={product.name}
            >
              {product.name}
            </Link>
            <div className="mt-1 line-clamp-2 text-sm text-slate-700 dark:text-slate-200">
              {product.description}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <div className="font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              {formatETB(product.price)}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              per {product.unit}
            </div>
          </div>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              cart.add(product.id, 1)
              toast.push({
                kind: 'success',
                title: 'Added to cart',
                message: product.name,
              })
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-gold-500 px-4 py-2.5 text-sm font-extrabold tracking-wide text-slate-900 shadow-glowGold hover:bg-gold-400 focus-gold"
          >
            <ShoppingBag className="h-4 w-4" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

