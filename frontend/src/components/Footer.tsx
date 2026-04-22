import { motion } from 'framer-motion'
import { Crown, Heart, Mail, MapPin, Phone, Globe } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-white/30 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 group focus-gold rounded-2xl">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-royal-600 text-white shadow-soft group-hover:shadow-glowGreen transition-shadow">
                <Crown className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-base font-bold tracking-tight text-slate-900 dark:text-white">
                  Queen's Supermarket
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Freshness Fit for a Queen
                </div>
              </div>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200 max-w-xs">
              Premium groceries curated with elegance. Located in the heart of Gurd Shola, Addis Ababa.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {[
                { icon: Globe, label: 'Website', href: '#' },
                { icon: Mail, label: 'Email', href: '#' },
                { icon: Phone, label: 'Phone', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="h-10 w-10 rounded-2xl glass ring-gold flex items-center justify-center hover:shadow-glowGold focus-gold transition-shadow"
                >
                  <s.icon className="h-4 w-4 text-slate-800 dark:text-slate-100" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Shop */}
          <motion.div variants={fadeUp}>
            <div className="font-display text-sm font-extrabold tracking-wide text-slate-900 dark:text-white mb-4">
              Shop
            </div>
            <ul className="space-y-2.5">
              {[
                { to: '/products?category=Fruits', label: 'Fruits' },
                { to: '/products?category=Vegetables', label: 'Vegetables' },
                { to: '/products?category=Drinks', label: 'Drinks' },
                { to: '/products?category=Snacks', label: 'Snacks' },
                { to: '/products?featured=true', label: '★ Featured Picks' },
              ].map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className="text-sm text-slate-700 dark:text-slate-200 hover:text-royal-700 dark:hover:text-gold-300 transition-colors focus-gold rounded-lg"
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Account */}
          <motion.div variants={fadeUp}>
            <div className="font-display text-sm font-extrabold tracking-wide text-slate-900 dark:text-white mb-4">
              Account
            </div>
            <ul className="space-y-2.5">
              {[
                { to: '/profile', label: 'My Profile' },
                { to: '/orders', label: 'My Orders' },
                { to: '/wishlist', label: 'Wishlist' },
                { to: '/cart', label: 'Cart' },
                { to: '/help', label: 'Help & FAQ' },
              ].map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className="text-sm text-slate-700 dark:text-slate-200 hover:text-royal-700 dark:hover:text-gold-300 transition-colors focus-gold rounded-lg"
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <div className="font-display text-sm font-extrabold tracking-wide text-slate-900 dark:text-white mb-4">
              Contact
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                <MapPin className="h-4 w-4 text-gold-500 mt-0.5 flex-shrink-0" />
                Gurd Shola, Addis Ababa, Ethiopia
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                <Phone className="h-4 w-4 text-gold-500 flex-shrink-0" />
                +251 000 000 000
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                <Mail className="h-4 w-4 text-gold-500 flex-shrink-0" />
                hello@queens-supermarket.et
              </li>
            </ul>

            <div className="mt-5 rounded-2xl bg-gold-500/10 border border-gold-500/20 px-4 py-3">
              <div className="text-xs font-extrabold text-slate-900 dark:text-gold-200">
                Open Daily
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-200 mt-0.5">
                Mon – Sun: 7:00 AM – 10:00 PM
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 pt-6 border-t border-white/30 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="text-xs text-slate-600 dark:text-slate-300">
            © {year} Queen's Supermarket. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
            Made with <Heart className="h-3.5 w-3.5 text-gold-500 mx-1 fill-gold-500" /> in Addis Ababa
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
            <Link to="/about" className="hover:text-royal-700 dark:hover:text-gold-300 focus-gold rounded">
              About
            </Link>
            <Link to="/contact" className="hover:text-royal-700 dark:hover:text-gold-300 focus-gold rounded">
              Contact
            </Link>
            <Link to="/help" className="hover:text-royal-700 dark:hover:text-gold-300 focus-gold rounded">
              Help
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
