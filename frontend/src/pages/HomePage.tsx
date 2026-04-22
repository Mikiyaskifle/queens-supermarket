import { motion } from 'framer-motion'
import { Apple, ArrowRight, Carrot, Sparkles, Utensils, Wine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AnimatedButton from '../components/AnimatedButton'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { useProducts } from '../hooks/useProducts'

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export default function HomePage() {
  const navigate = useNavigate()
  const { products } = useProducts()
  const featured = (products ?? []).filter((p) => p.featured).slice(0, 6)
  const picks = featured.slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-white/50 dark:bg-white/[0.04] px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-800 dark:text-slate-100">
            <Sparkles className="h-4 w-4 text-gold-500" />
            Premium grocery experience
          </div>

          <h1 className="mt-5 font-heading text-3xl leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Fresh Groceries
            <span className="text-royal-700 dark:text-gold-300"> Delivered</span>{' '}
            in Style
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Curated produce, artisan snacks, and refreshing drinks—presented with
            elegance, delivered with care.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <AnimatedButton onClick={() => navigate('/products')}>
              Shop Now <ArrowRight className="h-4 w-4" />
            </AnimatedButton>
            <AnimatedButton
              variant="ghost"
              onClick={() => navigate('/products?featured=true')}
            >
              View Featured
            </AnimatedButton>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
            {[
              { k: 'Same‑day', v: 'Delivery' },
              { k: 'Hand‑picked', v: 'Quality' },
              { k: 'Gold‑level', v: 'Support' },
            ].map((s) => (
              <div
                key={s.k}
                className="glass ring-gold rounded-3xl px-4 py-3"
              >
                <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                  {s.k}
                </div>
                <div className="mt-0.5 font-display text-sm font-bold text-slate-900 dark:text-white">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 blur-3xl opacity-60">
            <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-gold-500/30" />
            <div className="absolute right-6 bottom-8 h-64 w-64 rounded-full bg-royal-600/25" />
          </div>

          <div className="glass ring-gold rounded-[2.25rem] p-5 sm:p-7">
            <div className="relative overflow-hidden rounded-3xl border border-white/30 dark:border-white/10 bg-gradient-to-b from-white/60 to-white/30 dark:from-white/[0.08] dark:to-white/[0.02] p-6">
              <div className="flex items-center justify-between">
                <div className="font-display text-sm font-bold text-slate-900 dark:text-white">
                  Queen’s Picks
                </div>
                <div className="rounded-full bg-gold-500/15 border border-gold-500/30 px-3 py-1 text-xs font-extrabold tracking-wide text-slate-900 dark:text-gold-200">
                  NEW
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {picks.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.18 + i * 0.08,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center justify-between rounded-2xl bg-white/60 dark:bg-white/[0.06] border border-white/40 dark:border-white/10 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-10 w-10 rounded-2xl object-cover border border-gold-500/30"
                        loading="lazy"
                      />
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {p.name}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">
                          {p.category} • {p.unit}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold tracking-wide text-royal-700 dark:text-gold-300">
                      View →
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-royal-600/10 dark:bg-gold-500/10 border border-royal-600/20 dark:border-gold-500/20 px-4 py-3">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Limited-time gold offers
                </div>
                <div className="text-xs font-extrabold tracking-wide text-royal-700 dark:text-gold-300">
                  Save up to 25%
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.section
        className="mt-12 sm:mt-14"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
          <div>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Shop by Category
            </h2>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
              Four essentials, curated like a boutique.
            </p>
          </div>
        </div>

        <div className="mt-5 sm:mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            title="Fruits"
            subtitle="Crisp, vibrant picks"
            icon={Apple}
            onClick={() => navigate('/products?category=Fruits')}
          />
          <CategoryCard
            title="Vegetables"
            subtitle="Fresh & green"
            icon={Carrot}
            onClick={() => navigate('/products?category=Vegetables')}
          />
          <CategoryCard
            title="Drinks"
            subtitle="Sparkling refresh"
            icon={Wine}
            onClick={() => navigate('/products?category=Drinks')}
          />
          <CategoryCard
            title="Snacks"
            subtitle="Gold-crave worthy"
            icon={Utensils}
            onClick={() => navigate('/products?category=Snacks')}
          />
        </div>
      </motion.section>

      <motion.section
        className="mt-12 sm:mt-14"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass ring-gold rounded-[2.25rem] p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Featured Products
              </h2>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                Handpicked favorites—crafted for a premium cart.
              </p>
            </div>
            <AnimatedButton variant="ghost" onClick={() => navigate('/products')}>
              Browse all <ArrowRight className="h-4 w-4" />
            </AnimatedButton>
          </div>

          <div className="mt-6">
            <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {!products &&
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="min-w-[320px] max-w-[360px] flex-1">
                    <ProductCardSkeleton />
                  </div>
                ))}

              {featured.map((p) => (
                <div key={p.id} className="min-w-[320px] max-w-[360px] flex-1">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>

            <div className="mt-3 text-xs text-slate-600 dark:text-slate-300">
              Tip: swipe horizontally to explore featured picks.
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

