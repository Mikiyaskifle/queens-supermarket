import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

type Props = {
  title: string
  subtitle: string
  icon: LucideIcon
  onClick?: () => void
  className?: string
}

export default function CategoryCard({
  title,
  subtitle,
  icon: Icon,
  onClick,
  className,
}: Props) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 520, damping: 28 }}
      onClick={onClick}
      className={cn(
        'glass ring-gold rounded-3xl p-5 text-left focus-gold',
        'hover:shadow-glowGold',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-base font-bold text-slate-900 dark:text-white">
            {title}
          </div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {subtitle}
          </div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-500/15 dark:bg-gold-500/10 border border-gold-500/30">
          <Icon className="h-5 w-5 text-gold-500" />
        </div>
      </div>
      <div className="mt-4 h-px w-full bg-gradient-to-r from-gold-500/40 via-white/30 to-transparent dark:via-white/10" />
      <div className="mt-3 text-xs font-semibold tracking-wide text-royal-700 dark:text-gold-300">
        Explore →
      </div>
    </motion.button>
  )
}

