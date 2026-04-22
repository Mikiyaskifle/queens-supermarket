import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import * as React from 'react'

export default function ScrollToTopButton() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-[55] h-12 w-12 rounded-3xl glass ring-gold shadow-glowGold flex items-center justify-center focus-gold"
          aria-label="Scroll to top"
          title="Back to top"
        >
          <ArrowUp className="h-5 w-5 text-slate-900 dark:text-gold-200" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

