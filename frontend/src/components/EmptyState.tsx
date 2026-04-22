import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import AnimatedButton from './AnimatedButton'

export default function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
}: {
  icon: LucideIcon
  title: string
  description: string
  primaryAction?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
}) {
  return (
    <div className="glass ring-gold rounded-[2.25rem] p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-md"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-gold-500/15 border border-gold-500/30">
          <Icon className="h-7 w-7 text-gold-500" />
        </div>
        <div className="mt-4 font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
          {title}
        </div>
        <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">
          {description}
        </div>

        {(primaryAction || secondaryAction) && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {primaryAction && (
              <AnimatedButton onClick={primaryAction.onClick}>
                {primaryAction.label}
              </AnimatedButton>
            )}
            {secondaryAction && (
              <AnimatedButton variant="ghost" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </AnimatedButton>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

