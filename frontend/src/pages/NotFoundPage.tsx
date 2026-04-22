import { motion } from 'framer-motion'
import { ArrowLeft, Crown, Ghost } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AnimatedButton from '../components/AnimatedButton'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <div className="glass ring-gold rounded-[2.75rem] p-6 sm:p-10 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-16 -top-16 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="absolute -right-16 -bottom-16 h-80 w-80 rounded-full bg-royal-600/20 blur-3xl" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-white/50 dark:bg-white/[0.04] px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-800 dark:text-slate-100">
              <Crown className="h-4 w-4 text-gold-500" />
              Error 404
            </div>
            <h1 className="mt-4 font-heading text-3xl sm:text-4xl leading-[1.05] tracking-tight text-slate-900 dark:text-white">
              Page Not Found
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200 max-w-xl">
              The page you’re looking for slipped out of the royal pantry. Let’s get
              you back to fresh, premium groceries.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <AnimatedButton onClick={() => navigate('/')}>Go Back Home</AnimatedButton>
              <AnimatedButton variant="ghost" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </AnimatedButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-auto flex h-44 w-44 items-center justify-center rounded-[2.5rem] bg-white/60 dark:bg-white/[0.06] border border-white/40 dark:border-white/10 shadow-soft"
            >
              <Ghost className="h-20 w-20 text-slate-800 dark:text-slate-100" />
            </motion.div>
            <div className="mt-4 text-center text-xs text-slate-600 dark:text-slate-300">
              A subtle animated illustration—luxury, not loud.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

