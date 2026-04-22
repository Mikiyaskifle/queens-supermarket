import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { cn } from '../lib/cn'

export type AccordionItem = {
  id: string
  title: string
  content: React.ReactNode
}

export default function Accordion({
  items,
  defaultOpenId,
}: {
  items: AccordionItem[]
  defaultOpenId?: string
}) {
  const [openId, setOpenId] = React.useState<string | null>(defaultOpenId ?? null)

  return (
    <div className="grid gap-3">
      {items.map((it) => {
        const open = openId === it.id
        return (
          <div key={it.id} className="glass ring-gold rounded-3xl overflow-hidden">
            <button
              className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left focus-gold"
              onClick={() => setOpenId((prev) => (prev === it.id ? null : it.id))}
              aria-expanded={open}
            >
              <div className="font-display text-sm sm:text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                {it.title}
              </div>
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-slate-700 dark:text-slate-200 transition-transform',
                  open && 'rotate-180',
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                    {it.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

