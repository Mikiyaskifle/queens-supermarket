import { motion } from 'framer-motion'
import { Crown, Heart, Menu, Moon, Search, ShoppingBag, Sun, User2 } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useCart } from '../context/cart'
import { useTheme } from '../context/theme'
import { useWishlist } from '../context/wishlist'
import { cn } from '../lib/cn'
import Sheet from './Sheet'

const linkBase =
  'rounded-xl px-3 py-2 text-sm font-semibold tracking-wide transition-colors focus-gold'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const cart = useCart()
  const wishlist = useWishlist()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const cartCount = cart.count
  const wishlistCount = wishlist.count

  const onSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const links = useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/products', label: 'Products' },
      { to: '/about', label: 'About' },
      { to: '/help', label: 'Help' },
      { to: '/orders', label: 'Orders' },
    ],
    [],
  )

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="glass ring-gold rounded-3xl">
          <div className="flex items-center gap-1.5 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-3">
            <NavLink
              to="/"
              className="group flex items-center gap-2 rounded-2xl px-1.5 sm:px-2 py-1.5 focus-gold"
            >
              <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-royal-600 text-white shadow-soft">
                <Crown className="h-5 w-5" />
              </span>
              <div className="leading-tight min-w-0">
                <div className="font-display text-[13px] sm:text-[15px] font-bold tracking-tight text-slate-900 dark:text-white truncate max-w-[130px] sm:max-w-none">
                  Queen’s Supermarket
                </div>
                <div className="hidden sm:block text-xs text-slate-600 dark:text-slate-300">
                  Freshness Fit for a Queen
                </div>
              </div>
            </NavLink>

            <nav className="hidden lg:flex items-center gap-1 ml-2">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    cn(
                      linkBase,
                      isActive
                        ? 'text-royal-700 dark:text-gold-300 bg-white/50 dark:bg-white/[0.06]'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-white/40 dark:hover:bg-white/[0.05]',
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex-1" />

            <form
              onSubmit={onSubmitSearch}
              className="hidden xl:flex items-center gap-2"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-300" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search premium groceries…"
                  className="h-11 w-[320px] rounded-2xl bg-white/50 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 pl-10 pr-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-gold"
                />
              </div>
            </form>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMenuOpen(true)}
                className="lg:hidden h-10 w-10 sm:h-11 sm:w-11 rounded-2xl glass ring-gold flex items-center justify-center focus-gold"
                aria-label="Open menu"
                title="Menu"
              >
                <Menu className="h-5 w-5 text-slate-800 dark:text-slate-100" />
              </motion.button>

              <NavLink
                to="/profile"
                className="hidden sm:flex h-11 w-11 rounded-2xl glass ring-gold items-center justify-center focus-gold"
                aria-label="Profile"
              >
                <User2 className="h-5 w-5 text-slate-800 dark:text-slate-100" />
              </NavLink>

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggle}
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl glass ring-gold flex items-center justify-center focus-gold"
                aria-label="Toggle dark mode"
                title="Toggle dark mode"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-gold-300" />
                ) : (
                  <Moon className="h-5 w-5 text-royal-700" />
                )}
              </motion.button>

              <NavLink
                to="/wishlist"
                className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-2xl glass ring-gold flex items-center justify-center focus-gold"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5 text-slate-800 dark:text-slate-100" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-[11px] font-extrabold text-slate-900">
                    {wishlistCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-2xl glass ring-gold flex items-center justify-center focus-gold"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5 text-slate-800 dark:text-slate-100" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-royal-600 px-1 text-[11px] font-extrabold text-white">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen} title="Menu">
        <form
          onSubmit={(e) => {
            onSubmitSearch(e)
            setMenuOpen(false)
          }}
          className="grid gap-3"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-300" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search premium groceries…"
              className="h-11 w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 pl-10 pr-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-gold"
            />
          </div>
          <button
            type="submit"
            className="h-11 rounded-2xl bg-royal-600 text-white font-extrabold tracking-wide shadow-soft hover:bg-royal-700 focus-gold"
          >
            Search
          </button>
        </form>

        <div className="mt-5 grid gap-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-2xl px-4 py-3 text-sm font-extrabold tracking-wide focus-gold',
                  isActive
                    ? 'bg-royal-600 text-white shadow-soft'
                    : 'bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white/70 dark:hover:bg-white/[0.09]',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="rounded-2xl px-4 py-3 text-sm font-extrabold tracking-wide bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white/70 dark:hover:bg-white/[0.09] focus-gold"
          >
            Contact
          </NavLink>
          <NavLink
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="rounded-2xl px-4 py-3 text-sm font-extrabold tracking-wide bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white/70 dark:hover:bg-white/[0.09] focus-gold"
          >
            Profile
          </NavLink>
        </div>

        <div className="mt-6 grid gap-2">
          <button
            onClick={() => toggle()}
            className="h-11 rounded-2xl bg-gold-500 text-slate-900 font-extrabold tracking-wide shadow-glowGold hover:bg-gold-400 focus-gold"
          >
            {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          </button>
        </div>
      </Sheet>
    </header>
  )
}

