import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '../lib/cn'

type Props = {
  title: string
  subtitle: string
  image: string
  onClick?: () => void
  className?: string
}

export default function CategoryCard({
  title,
  subtitle,
  image,
  onClick,
  className,
}: Props) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 480, damping: 26 }}
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-3xl text-left focus-gold',
        'hover:shadow-glowGold',
        className,
      )}
    >
      {/* Background image */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Gold shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/10 group-hover:to-transparent transition-all duration-500" />
      </div>

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="font-display text-base font-extrabold tracking-tight text-white drop-shadow">
          {title}
        </div>
        <div className="mt-0.5 flex items-center justify-between">
          <div className="text-xs font-medium text-white/80">
            {subtitle}
          </div>
          <div className="flex items-center gap-1 rounded-full bg-gold-500/90 px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Explore <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>

      {/* Gold border ring on hover */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 group-hover:ring-gold-500/40 transition-all duration-300" />
    </motion.button>
  )
}
