import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import { cn } from '../lib/cn'

export type ToastKind = 'success' | 'info' | 'error'

export type ToastItem = {
  id: string
  kind: ToastKind
  title: string
  message?: string
}

export function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[]
  onDismiss: (id: string) => void
}) {
  return (
    <div className="pointer-events-none fixed right-4 top-24 z-[60] flex w-[min(420px,calc(100vw-2rem))] flex-col gap-3">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'pointer-events-auto glass ring-gold rounded-3xl p-4',
              t.kind === 'success' && 'shadow-glowGreen',
              t.kind === 'error' && 'shadow-soft ring-1 ring-red-400/30',
            )}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {t.kind === 'success' && (
                  <CheckCircle2 className="h-5 w-5 text-royal-700 dark:text-gold-300" />
                )}
                {t.kind === 'info' && (
                  <Info className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                )}
                {t.kind === 'error' && (
                  <TriangleAlert className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {t.title}
                </div>
                {t.message && (
                  <div className="mt-0.5 text-sm text-slate-700 dark:text-slate-200">
                    {t.message}
                  </div>
                )}
              </div>
              <button
                onClick={() => onDismiss(t.id)}
                className="h-9 w-9 rounded-2xl bg-white/40 dark:bg-white/[0.06] border border-white/40 dark:border-white/10 flex items-center justify-center focus-gold"
                aria-label="Dismiss toast"
              >
                <X className="h-4 w-4 text-slate-700 dark:text-slate-200" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

