import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import * as React from 'react'
import { cn } from '../lib/cn'

export default function Sheet({
  open,
  onOpenChange,
  title,
  children,
  side = 'right',
  className,
}: {
  open: boolean
  onOpenChange: (next: boolean) => void
  title?: string
  children: React.ReactNode
  side?: 'left' | 'right'
  className?: string
}) {
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close"
            className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            initial={{
              x: side === 'right' ? 24 : -24,
              opacity: 0,
              filter: 'blur(10px)',
            }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{
              x: side === 'right' ? 24 : -24,
              opacity: 0,
              filter: 'blur(10px)',
            }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'fixed top-0 bottom-0 z-[75] w-[min(420px,92vw)]',
              side === 'right' ? 'right-0' : 'left-0',
              'glass ring-gold shadow-glowGold',
              'rounded-none',
              className,
            )}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/30 dark:border-white/10">
                <div className="min-w-0">
                  {title && (
                    <div className="truncate font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                      {title}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onOpenChange(false)}
                  className="h-10 w-10 rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 flex items-center justify-center focus-gold"
                  aria-label="Close sheet"
                >
                  <X className="h-5 w-5 text-slate-900 dark:text-white" />
                </button>
              </div>
              <div className="flex-1 overflow-auto px-5 py-5">{children}</div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

