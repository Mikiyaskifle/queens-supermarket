import { motion } from 'framer-motion'
import { SearchX } from 'lucide-react'
import * as React from 'react'
import { useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import HighlightText from '../components/HighlightText'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useProducts } from '../hooks/useProducts'

export default function SearchPage() {
  const { products } = useProducts()
  const [params, setParams] = useSearchParams()
  const initialQ = params.get('q') ?? ''

  const [q, setQ] = React.useState(initialQ)
  const dq = useDebouncedValue(q, 220)

  React.useEffect(() => {
    const next = new URLSearchParams(params)
    const trimmed = q.trim()
    if (!trimmed) next.delete('q')
    else next.set('q', trimmed)
    setParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  const results = React.useMemo(() => {
    const list = products ?? []
    const needle = dq.trim().toLowerCase()
    if (!needle) return []
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle),
    )
  }, [products, dq])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Search
          </motion.h1>
          <p className="mt-2 text-slate-700 dark:text-slate-200">
            Results curated instantly—no clutter, just premium matches.
          </p>
        </div>
      </div>

      <div className="mt-8 glass ring-gold rounded-[2.25rem] p-4 sm:p-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search Royal Gala Apples, drinks, snacks…"
          className="h-12 w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-gold"
        />
        <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">
          Tip: try “gold”, “broccoli”, “tea”…
        </div>
      </div>

      <div className="mt-6">
        {!products && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {products && dq.trim().length > 0 && results.length === 0 && (
          <EmptyState
            icon={SearchX}
            title="No results found"
            description="Try a shorter keyword or browse categories—your perfect pick is still here."
          />
        )}

        {products && dq.trim().length === 0 && (
          <EmptyState
            icon={SearchX}
            title="Search like a Queen"
            description="Type a keyword to see premium matches, highlighted instantly."
          />
        )}

        {products && results.length > 0 && (
          <>
            <div className="mb-4 text-sm text-slate-700 dark:text-slate-200">
              Showing{' '}
              <span className="font-extrabold text-slate-900 dark:text-white">
                {results.length}
              </span>{' '}
              match(es) for{' '}
              <HighlightText
                text={`“${dq.trim()}”`}
                query={dq.trim()}
                className="font-extrabold"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

