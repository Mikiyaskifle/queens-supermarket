import { cn } from '../lib/cn'

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default function HighlightText({
  text,
  query,
  className,
}: {
  text: string
  query: string
  className?: string
}) {
  const q = query.trim()
  if (!q) return <span className={className}>{text}</span>

  const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, 'ig'))
  return (
    <span className={className}>
      {parts.map((p, idx) =>
        p.toLowerCase() === q.toLowerCase() ? (
          <mark
            key={idx}
            className={cn(
              'rounded-md bg-gold-500/25 px-1 py-0.5 font-extrabold text-slate-900 dark:text-gold-100',
            )}
          >
            {p}
          </mark>
        ) : (
          <span key={idx}>{p}</span>
        ),
      )}
    </span>
  )
}

