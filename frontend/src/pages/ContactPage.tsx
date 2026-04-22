import { motion } from 'framer-motion'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import AnimatedButton from '../components/AnimatedButton'

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Contact
        </h1>
        <p className="mt-2 text-slate-700 dark:text-slate-200 max-w-2xl">
          Questions, partnerships, or feedback—reach out. (Demo UI)
        </p>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="glass ring-gold rounded-[2.25rem] p-5 sm:p-7">
          <div className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
            Send a message
          </div>
          <div className="mt-5 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                  Name
                </div>
                <input className="h-11 w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 text-sm text-slate-800 dark:text-slate-100 focus-gold" />
              </label>
              <label className="grid gap-2">
                <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                  Email
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-300" />
                  <input className="h-11 w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 pl-10 pr-3 text-sm text-slate-800 dark:text-slate-100 focus-gold" />
                </div>
              </label>
            </div>
            <label className="grid gap-2">
              <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                Message
              </div>
              <textarea className="min-h-[140px] w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus-gold" />
            </label>
            <div className="flex justify-end">
              <AnimatedButton>Send</AnimatedButton>
            </div>
          </div>
        </section>

        <section className="grid gap-6">
          <div className="glass ring-gold rounded-[2.25rem] p-5 sm:p-7">
            <div className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
              Visit us
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-700 dark:text-slate-200">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-500 mt-0.5" />
                <div>Royal Avenue, Premium District</div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gold-500 mt-0.5" />
                <div>+000 000 0000</div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-gold-500 mt-0.5" />
                <div>queens-supermarket.example</div>
              </div>
            </div>
          </div>

          <div className="glass ring-gold rounded-[2.25rem] p-5 sm:p-7">
            <div className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
              Map
            </div>
            <div className="mt-4 overflow-hidden rounded-[1.75rem] border border-white/30 dark:border-white/10">
              <div className="h-56 bg-gradient-to-br from-white/60 to-white/30 dark:from-white/[0.08] dark:to-white/[0.02] flex items-center justify-center">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Map placeholder
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <a
                className="h-11 w-11 rounded-2xl glass ring-gold flex items-center justify-center focus-gold"
                href="#"
                aria-label="Social"
              >
                <Globe className="h-5 w-5 text-slate-800 dark:text-slate-100" />
              </a>
              <a
                className="h-11 w-11 rounded-2xl glass ring-gold flex items-center justify-center focus-gold"
                href="#"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-slate-800 dark:text-slate-100" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

