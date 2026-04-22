export default function ProductCardSkeleton() {
  return (
    <div className="glass ring-gold rounded-[2.25rem] overflow-hidden animate-pulse">
      <div className="h-44 sm:h-48 bg-slate-200/70 dark:bg-white/[0.06]" />
      <div className="p-5">
        <div className="h-3 w-20 rounded bg-slate-200/70 dark:bg-white/[0.06]" />
        <div className="mt-3 h-4 w-2/3 rounded bg-slate-200/70 dark:bg-white/[0.06]" />
        <div className="mt-2 h-4 w-1/2 rounded bg-slate-200/70 dark:bg-white/[0.06]" />
        <div className="mt-5 flex items-center justify-between">
          <div>
            <div className="h-5 w-16 rounded bg-slate-200/70 dark:bg-white/[0.06]" />
            <div className="mt-2 h-3 w-20 rounded bg-slate-200/70 dark:bg-white/[0.06]" />
          </div>
          <div className="h-10 w-24 rounded-2xl bg-slate-200/70 dark:bg-white/[0.06]" />
        </div>
      </div>
    </div>
  )
}

