import { motion } from 'framer-motion'
import { Crown, Leaf, Sparkles } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          About Queen’s Supermarket
        </h1>
        <p className="mt-2 max-w-3xl text-slate-700 dark:text-slate-200">
          Welcome to <strong>Queen’s Supermarket</strong>, your trusted destination
          for quality products and exceptional shopping experience in{' '}
          <strong>Addis Ababa, Gurd Shola</strong>.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="glass ring-gold rounded-[2.5rem] p-8 overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-12 -top-12 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
            <div className="absolute -right-12 -bottom-12 h-72 w-72 rounded-full bg-royal-600/20 blur-3xl" />
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-white/50 dark:bg-white/[0.04] px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-800 dark:text-slate-100">
              <Sparkles className="h-4 w-4 text-gold-500" />
              Freshness Fit for a Queen
            </div>
            <div className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight text-slate-900 dark:text-white">
              Convenient.
              <span className="text-royal-700 dark:text-gold-300"> Affordable</span>.
              Enjoyable.
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200 max-w-xl">
              At Queen’s Supermarket, we believe shopping should be convenient,
              affordable, and enjoyable. That is why we provide a wide range of
              carefully selected products, from fresh foods and household essentials
              to personal care items and daily necessities, all under one roof.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200 max-w-xl">
              Our mission is simple: <strong>to serve our community with quality,
              trust, and convenience</strong>. We are committed to offering fresh
              products, fair prices, and friendly service that makes every customer
              feel valued.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200 max-w-xl">
              Located in the heart of <strong>Gurd Shola</strong>, we proudly serve
              families, professionals, and businesses in the surrounding areas.
              Whether you are doing your weekly shopping or just picking up a few
              items, Queen’s Supermarket is here to make your experience smooth and
              satisfying.
            </p>
          </div>
        </section>

        <section className="grid gap-6">
          <div className="glass ring-gold rounded-[2.25rem] p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Why Choose Us?
                </div>
                <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-200">
                  <li>- Fresh and high-quality products</li>
                  <li>- Affordable and competitive prices</li>
                  <li>- Wide variety of items in one place</li>
                  <li>- Friendly and reliable customer service</li>
                  <li>- Convenient location in Gurd Shola</li>
                </ul>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-gold-500/15 border border-gold-500/30">
                <Crown className="h-5 w-5 text-gold-500" />
              </div>
            </div>
          </div>

          <div className="glass ring-gold rounded-[2.25rem] p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Vision
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                  To become one of the most trusted and customer-focused supermarkets
                  in <strong>Ethiopia</strong>, delivering excellence in every
                  shopping experience.
                </p>
                <div className="mt-4 font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Our Promise
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                  At Queen’s Supermarket, we do not just sell products, we build
                  relationships. Your satisfaction is our priority, and we are always
                  working to serve you better.
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-royal-600/10 border border-royal-600/20 dark:bg-gold-500/10 dark:border-gold-500/20">
                <Leaf className="h-5 w-5 text-royal-700 dark:text-gold-300" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

