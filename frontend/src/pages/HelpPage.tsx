import { LifeBuoy, Mail, MessageSquareText } from 'lucide-react'
import { motion } from 'framer-motion'
import Accordion, { type AccordionItem } from '../components/Accordion'
import AnimatedButton from '../components/AnimatedButton'

export default function HelpPage() {
  const faqs: AccordionItem[] = [
    {
      id: 'delivery',
      title: 'Do you offer same-day delivery?',
      content:
        'Yes—this is a demo UI, but the experience is designed around premium same-day windows. In a real app, we’d surface available time slots at checkout.',
    },
    {
      id: 'freshness',
      title: 'How do you ensure freshness?',
      content:
        'We curate “Queen’s Picks” and treat every basket like a boutique order—careful selection, elegant packing, and quality-first sourcing.',
    },
    {
      id: 'payment',
      title: 'Is payment processed here?',
      content:
        'No—there is no backend in this project. Checkout is UI-only with localStorage persistence to simulate real-world flow.',
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Help & Support
        </h1>
        <p className="mt-2 text-slate-700 dark:text-slate-200 max-w-2xl">
          Friendly answers, premium experience. Browse FAQs or send a message—UI only.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <LifeBuoy className="h-5 w-5 text-gold-500" />
            <div className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
              FAQ
            </div>
          </div>
          <Accordion items={faqs} defaultOpenId="delivery" />
        </section>

        <section className="glass ring-gold rounded-[2.25rem] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                Contact form
              </div>
              <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                Send a message (demo UI).
              </div>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-gold-500/15 border border-gold-500/30">
              <MessageSquareText className="h-5 w-5 text-gold-500" />
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                Email
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-300" />
                <input className="h-11 w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 pl-10 pr-3 text-sm text-slate-800 dark:text-slate-100 focus-gold" />
              </div>
            </label>
            <label className="grid gap-2">
              <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                Message
              </div>
              <textarea className="min-h-[120px] w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus-gold" />
            </label>

            <div className="flex justify-end">
              <AnimatedButton>Send message</AnimatedButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

