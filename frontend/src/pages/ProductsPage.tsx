import { motion } from 'framer-motion'
import { Filter, Search, X } from 'lucide-react'
import * as React from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import Sheet from '../components/Sheet'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useProducts } from '../hooks/useProducts'
import type { ProductCategory } from '../types/product'

export default function ProductsPage() {
  const { products, error } = useProducts()
  const [params, setParams] = useSearchParams()

  const initialCategory = (params.get('category') ?? 'All') as ProductCategory | 'All'
  const initialFeatured = params.get('featured') === 'true'
  const initialSearch = params.get('search') ?? ''

  const [category, setCategory] = React.useState<ProductCategory | 'All'>(initialCategory)
  const [featuredOnly, setFeaturedOnly] = React.useState(initialFeatured)
  const [search, setSearch] = React.useState(initialSearch)
  const debouncedSearch = useDebouncedValue(search, 220)
  const [filtersOpen, setFiltersOpen] = React.useState(false)

  React.useEffect(() => {
    const next = new URLSearchParams(params)
    if (category === 'All') next.delete('category')
    else next.set('category', category)

    if (!featuredOnly) next.delete('featured')
    else next.set('featured', 'true')

    const trimmed = search.trim()
    if (!trimmed) next.delete('search')
    else next.set('search', trimmed)

    setParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, featuredOnly, search])

  const categories: Array<ProductCategory | 'All'> = [
    'All',
    'Fruits',
    'Vegetables',
    'Drinks',
    'Snacks',
    'Chocolates',
    'Biscuits',
    'Juices',
    'Toys',
  ]

  const filtered = React.useMemo(() => {
    const list = products ?? []
    const q = debouncedSearch.trim().toLowerCase()
    return list
      .filter((p) => (category === 'All' ? true : p.category === category))
      .filter((p) => (featuredOnly ? p.featured : true))
      .filter((p) => {
        if (!q) return true
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        )
      })
  }, [products, category, featuredOnly, debouncedSearch])

  const Filters = (
    <div>
      <div className="flex items-center justify-between">
        <div className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
          Refine
        </div>
        <button
          className="text-xs font-semibold tracking-wide text-royal-700 dark:text-gold-300 hover:underline focus-gold rounded-xl px-2 py-1"
          onClick={() => {
            setCategory('All')
            setFeaturedOnly(false)
            setSearch('')
          }}
        >
          Reset
        </button>
      </div>

      <div className="mt-5">
        <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
          Category
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {categories.map((c) => {
            const active = category === c
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={[
                  'rounded-2xl px-3 py-2 text-sm font-semibold tracking-wide focus-gold',
                  active
                    ? 'bg-royal-600 text-white shadow-soft'
                    : 'bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:bg-white/70 dark:hover:bg-white/[0.09]',
                ].join(' ')}
              >
                {c}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6">
        <label className="flex items-center justify-between gap-3 rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-3">
          <div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              Featured only
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              Queen’s Picks
            </div>
          </div>
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={(e) => setFeaturedOnly(e.target.checked)}
            className="h-5 w-5 rounded border-white/40 dark:border-white/10 text-royal-700 focus:ring-gold-400/70"
          />
        </label>
      </div>

      <div className="mt-6 text-xs text-slate-600 dark:text-slate-300">
        Showing{' '}
        <span className="font-extrabold text-slate-900 dark:text-white">
          {products ? filtered.length : '…'}
        </span>{' '}
        items
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Products
          </motion.h1>
          <p className="mt-2 text-slate-700 dark:text-slate-200">
            Premium groceries, curated with a boutique feel.
          </p>
        </div>

        <div className="glass ring-gold rounded-3xl p-3 flex items-center gap-3 w-full md:w-[520px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-300" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fruits, snacks, drinks…"
              className="h-11 w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 pl-10 pr-10 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-gold"
            />
            {search.trim().length > 0 && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-2xl bg-white/50 dark:bg-white/[0.06] border border-white/40 dark:border-white/10 flex items-center justify-center focus-gold"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-slate-700 dark:text-slate-200" />
              </button>
            )}
          </div>
          <button
            onClick={() => setFiltersOpen(true)}
            className="md:hidden inline-flex items-center gap-2 rounded-2xl bg-white/50 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-3 py-2 text-xs font-extrabold tracking-wide text-slate-900 dark:text-white focus-gold"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <div className="hidden md:flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-700 dark:text-slate-200" />
            <div className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-200">
              Filters
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="hidden lg:block glass ring-gold rounded-[2.25rem] p-5 h-fit sticky top-[104px]">
          {Filters}
        </aside>

        <section>
          {error && (
            <div className="glass rounded-3xl p-5 ring-1 ring-red-400/30">
              <div className="font-display font-extrabold text-slate-900 dark:text-white">
                Couldn’t load products
              </div>
              <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                {error}
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {!products &&
              Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)}

            {products &&
              filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {products && filtered.length === 0 && (
            <div className="mt-6 glass ring-gold rounded-[2.25rem] p-8 text-center">
              <div className="font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                No matches found
              </div>
              <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                Try a different search or reset filters.
              </div>
            </div>
          )}
        </section>
      </div>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen} title="Filters" side="left">
        {Filters}
        <div className="mt-6">
          <button
            onClick={() => setFiltersOpen(false)}
            className="h-11 w-full rounded-2xl bg-royal-600 text-white font-extrabold tracking-wide shadow-soft hover:bg-royal-700 focus-gold"
          >
            Apply
          </button>
        </div>
      </Sheet>
    </div>
  )
}

