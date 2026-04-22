import { motion } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  Star,
  Truck,
  Shield,
  Clock,
  Crown,
  Zap,
} from 'lucide-react'
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

const stagger = {
  show: { transition: { staggerChildren: 0.09 } },
}

const testimonials = [
  {
    name: 'Selam T.',
    role: 'Regular Customer',
    text: 'Queen\'s Supermarket has the freshest produce I\'ve ever found. The quality is unmatched!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Dawit M.',
    role: 'Loyal Member',
    text: 'The gold-level service is real. Every visit feels premium and the staff is incredibly helpful.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Hana B.',
    role: 'Weekly Shopper',
    text: 'I love the curated selection. It\'s like a boutique grocery experience every single time.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { products } = useProducts()
  const featured = (products ?? []).filter((p) => p.featured).slice(0, 6)
  const picks = featured.slice(0, 3)

  return (
    <div className="pb-16">
      {/* Promo Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-royal-600 via-royal-700 to-royal-600 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-semibold tracking-wide"
      >
        <span className="inline-flex items-center gap-2">
          <Zap className="h-3.5 w-3.5 text-gold-300" />
          Free delivery on orders over ETB 1,000 — Limited time offer!
          <Zap className="h-3.5 w-3.5 text-gold-300" />
        </span>
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        {/* Hero */}
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

            <h1 className="mt-5 font-heading text-4xl leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Fresh Groceries
              <br />
              <span className="text-royal-700 dark:text-gold-300">Delivered</span>{' '}
              in Style
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
              Curated produce, artisan snacks, and refreshing drinks—presented with
              elegance, delivered with care. Freshness fit for a Queen.
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
                <div key={s.k} className="glass ring-gold rounded-3xl px-4 py-3">
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
                    Queen's Picks
                  </div>
                  <div className="rounded-full bg-gold-500/15 border border-gold-500/30 px-3 py-1 text-xs font-extrabold tracking-wide text-slate-900 dark:text-gold-200">
                    NEW
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {picks.length === 0 &&
                    Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-16 rounded-2xl bg-slate-200/70 dark:bg-white/[0.06] animate-pulse"
                      />
                    ))}
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
                      onClick={() => navigate(`/products/${p.id}`)}
                      className="flex items-center justify-between rounded-2xl bg-white/60 dark:bg-white/[0.06] border border-white/40 dark:border-white/10 px-4 py-3 cursor-pointer hover:bg-white/80 dark:hover:bg-white/[0.10] transition-colors"
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

        {/* Stats */}
        <motion.section
          className="mt-14"
          variants={{ ...fadeUp, ...stagger }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass ring-gold rounded-[2.25rem] p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {[
                { value: '500+', label: 'Premium Products', icon: Crown },
                { value: '10K+', label: 'Happy Customers', icon: Star },
                { value: '99%', label: 'Satisfaction Rate', icon: Shield },
                { value: '2h', label: 'Avg. Delivery Time', icon: Truck },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  transition={{ delay: i * 0.07 }}
                  className="text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 border border-gold-500/30">
                    <s.icon className="h-5 w-5 text-gold-500" />
                  </div>
                  <div className="mt-3 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Categories */}
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
            <AnimatedButton variant="ghost" onClick={() => navigate('/products')}>
              All Products <ArrowRight className="h-4 w-4" />
            </AnimatedButton>
          </div>

          <div className="mt-5 sm:mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              title="Fruits"
              subtitle="Crisp, vibrant picks"
              image="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80"
              onClick={() => navigate('/products?category=Fruits')}
            />
            <CategoryCard
              title="Vegetables"
              subtitle="Fresh & green"
              image="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
              onClick={() => navigate('/products?category=Vegetables')}
            />
            <CategoryCard
              title="Drinks"
              subtitle="Sparkling refresh"
              image="https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80"
              onClick={() => navigate('/products?category=Drinks')}
            />
            <CategoryCard
              title="Snacks"
              subtitle="Gold-crave worthy"
              image="https://images.unsplash.com/photo-1621939514649-280e2ee25f71?auto=format&fit=crop&w=800&q=80"
              onClick={() => navigate('/products?category=Snacks')}
            />
          </div>
        </motion.section>

        {/* Featured Products */}
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
                    <div key={i} className="min-w-[300px] max-w-[340px] flex-1">
                      <ProductCardSkeleton />
                    </div>
                  ))}

                {featured.map((p) => (
                  <div key={p.id} className="min-w-[300px] max-w-[340px] flex-1">
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

        {/* Why Choose Us */}
        <motion.section
          className="mt-12 sm:mt-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Why Queen's Supermarket?
            </h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              We don't just sell groceries—we deliver an experience.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Truck,
                title: 'Same-Day Delivery',
                desc: 'Order before noon and receive your groceries the same day.',
              },
              {
                icon: Shield,
                title: 'Quality Guaranteed',
                desc: 'Every product is hand-selected for freshness and premium quality.',
              },
              {
                icon: Clock,
                title: 'Open 7 Days',
                desc: 'We\'re open daily from 7 AM to 10 PM for your convenience.',
              },
              {
                icon: Crown,
                title: 'Gold-Level Service',
                desc: 'Premium customer care that treats every shopper like royalty.',
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="glass ring-gold rounded-3xl p-6 hover:shadow-glowGold transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 border border-gold-500/30">
                  <f.icon className="h-5 w-5 text-gold-500" />
                </div>
                <div className="mt-4 font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {f.title}
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          className="mt-12 sm:mt-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              What Our Customers Say
            </h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              Real reviews from our royal community.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="glass ring-gold rounded-[2.25rem] p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-gold-500/10 blur-2xl -translate-y-6 translate-x-6" />
                <div className="relative">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 italic">
                    "{t.text}"
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-10 w-10 rounded-2xl object-cover border border-white/30 dark:border-white/10"
                    />
                    <div>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {t.name}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Banner */}
        <motion.section
          className="mt-12 sm:mt-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-royal-600 via-royal-700 to-royal-800 p-8 sm:p-12 text-center">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl" />
              <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-gold-200 mb-4">
                <Crown className="h-4 w-4 text-gold-300" />
                Freshness Fit for a Queen
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Start Your Premium Shopping Journey
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/80 max-w-xl mx-auto">
                Explore hundreds of hand-picked products. From farm-fresh fruits to artisan snacks—all in one elegant place.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/products')}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gold-500 px-6 py-3 text-sm font-extrabold tracking-wide text-slate-900 shadow-glowGold hover:bg-gold-400 focus-gold"
                >
                  Shop Now <ArrowRight className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-extrabold tracking-wide text-white hover:bg-white/20 focus-gold"
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
