import { motion } from 'framer-motion'
import { HeartCrack, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { useCart } from '../context/cart'
import { useToast } from '../context/toast'
import { useWishlist } from '../context/wishlist'
import { useProducts } from '../hooks/useProducts'

export default function WishlistPage() {
  const navigate = useNavigate()
  const { products } = useProducts()
  const wishlist = useWishlist()
  const cart = useCart()
  const toast = useToast()

  const wishedProducts =
    products?.filter((p) => wishlist.ids.includes(p.id)) ?? null

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Wishlist
          </motion.h1>
          <p className="mt-2 text-slate-700 dark:text-slate-200">
            Saved like royalty—ready when you are.
          </p>
        </div>

        {wishlist.count > 0 && (
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              wishlist.ids.forEach((id) => cart.add(id, 1))
              toast.push({
                kind: 'success',
                title: 'Moved wishlist to cart',
                message: `${wishlist.count} item(s) added`,
              })
            }}
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-2xl bg-gold-500 px-4 py-2.5 text-sm font-extrabold tracking-wide text-slate-900 shadow-glowGold hover:bg-gold-400 focus-gold"
          >
            <ShoppingBag className="h-4 w-4" /> Move All to Cart
          </motion.button>
        )}
      </div>

      <div className="mt-8">
        {!products && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {products && wishlist.count === 0 && (
          <EmptyState
            icon={HeartCrack}
            title="Your wishlist is empty"
            description="Tap the heart on any product to save it here. Your picks will be waiting—beautifully."
            primaryAction={{ label: 'Browse Products', onClick: () => navigate('/products') }}
          />
        )}

        {wishedProducts && wishedProducts.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {wishedProducts.map((p) => (
              <div key={p.id} className="relative">
                <ProductCard product={p} />
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    cart.add(p.id, 1)
                    toast.push({ kind: 'success', title: 'Moved to cart', message: p.name })
                  }}
                  className="absolute bottom-5 right-5 hidden md:inline-flex items-center gap-2 rounded-2xl bg-royal-600 px-3 py-2 text-xs font-extrabold tracking-wide text-white shadow-soft hover:bg-royal-700 focus-gold"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Move
                </motion.button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

