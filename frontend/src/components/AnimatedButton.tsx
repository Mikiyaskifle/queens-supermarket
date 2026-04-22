import { motion, type MotionProps } from 'framer-motion'
import * as React from 'react'
import { cn } from '../lib/cn'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps & {
    variant?: 'primary' | 'ghost'
  }

export default function AnimatedButton({
  className,
  variant = 'primary',
  ...props
}: Props) {
  return (
    <motion.button
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 520, damping: 26 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold tracking-wide focus-gold',
        variant === 'primary' &&
          'bg-royal-600 text-white shadow-soft hover:bg-royal-700',
        variant === 'ghost' &&
          'bg-white/40 dark:bg-white/[0.05] text-slate-800 dark:text-slate-100 border border-white/40 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/[0.09]',
        className,
      )}
      {...props}
    />
  )
}

