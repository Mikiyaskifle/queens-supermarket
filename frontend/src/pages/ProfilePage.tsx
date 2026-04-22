import { motion } from 'framer-motion'
import { KeyRound, Mail, MapPin, ShieldCheck, User } from 'lucide-react'
import * as React from 'react'
import AnimatedButton from '../components/AnimatedButton'
import { useToast } from '../context/toast'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

type Profile = {
  name: string
  email: string
  address: string
  avatar: string
}

const STORAGE_KEY = 'qs.profile.v1'

const defaultProfile: Profile = {
  name: 'Queen Customer',
  email: 'queen.customer@example.com',
  address: 'Royal Avenue, Premium District',
  avatar:
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
}

function Field({
  label,
  icon: Icon,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <label className="grid gap-2">
      <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
        {label}
      </div>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-300" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          className="h-11 w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 pl-10 pr-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-gold"
        />
      </div>
    </label>
  )
}

export default function ProfilePage() {
  const toast = useToast()
  const [profile, setProfile] = useLocalStorageState<Profile>(STORAGE_KEY, defaultProfile)
  const [draft, setDraft] = React.useState(profile)

  React.useEffect(() => setDraft(profile), [profile])

  const dirty =
    draft.name !== profile.name ||
    draft.email !== profile.email ||
    draft.address !== profile.address ||
    draft.avatar !== profile.avatar

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Profile
          </motion.h1>
          <p className="mt-2 text-slate-700 dark:text-slate-200">
            Manage your account with a clean, premium experience.
          </p>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-3">
          <AnimatedButton
            variant="ghost"
            disabled={!dirty}
            onClick={() => setDraft(profile)}
            className={`${!dirty ? 'opacity-60 cursor-not-allowed' : ''} flex-1 sm:flex-none`}
          >
            Reset
          </AnimatedButton>
          <AnimatedButton
            disabled={!dirty}
            onClick={() => {
              setProfile(draft)
              toast.push({ kind: 'success', title: 'Profile updated', message: 'Saved locally' })
            }}
            className={`${!dirty ? 'opacity-60 cursor-not-allowed' : ''} flex-1 sm:flex-none`}
          >
            Save changes
          </AnimatedButton>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
        <section className="glass ring-gold rounded-[2.25rem] p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={draft.avatar}
                alt={draft.name}
                className="h-20 w-20 rounded-3xl object-cover border border-white/30 dark:border-white/10"
              />
              <div className="absolute -bottom-2 -right-2 h-9 w-9 rounded-2xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-gold-500" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="truncate font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                {draft.name}
              </div>
              <div className="truncate text-sm text-slate-700 dark:text-slate-200">
                {draft.email}
              </div>
              <div className="mt-1 text-xs font-semibold tracking-wide text-royal-700 dark:text-gold-300">
                Luxury Member
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <Field
              label="Avatar URL"
              icon={User}
              value={draft.avatar}
              onChange={(avatar) => setDraft((p) => ({ ...p, avatar }))}
            />
            <Field
              label="Full name"
              icon={User}
              value={draft.name}
              onChange={(name) => setDraft((p) => ({ ...p, name }))}
            />
            <Field
              label="Email"
              icon={Mail}
              value={draft.email}
              onChange={(email) => setDraft((p) => ({ ...p, email }))}
              type="email"
            />
            <Field
              label="Address"
              icon={MapPin}
              value={draft.address}
              onChange={(address) => setDraft((p) => ({ ...p, address }))}
            />
          </div>
        </section>

        <section className="grid gap-6">
          <div className="glass ring-gold rounded-[2.25rem] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Account Info
                </div>
                <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                  Your details are stored locally for this demo.
                </div>
              </div>
              <div className="rounded-2xl bg-royal-600/10 dark:bg-gold-500/10 border border-royal-600/20 dark:border-gold-500/20 px-3 py-2 text-xs font-extrabold tracking-wide text-royal-700 dark:text-gold-300">
                Local only
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { k: 'Orders', v: 'Ready' },
                { k: 'Wishlist', v: 'Synced' },
                { k: 'Cart', v: 'Persisted' },
                { k: 'Theme', v: 'Dark mode' },
              ].map((s) => (
                <div key={s.k} className="rounded-3xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-3">
                  <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                    {s.k}
                  </div>
                  <div className="mt-0.5 font-display text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass ring-gold rounded-[2.25rem] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Security
                </div>
                <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                  Demo-only UI—no backend, no passwords stored.
                </div>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-gold-500/15 border border-gold-500/30">
                <KeyRound className="h-5 w-5 text-gold-500" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button className="rounded-3xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-3 text-left hover:shadow-soft focus-gold">
                <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Change password
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  UI only
                </div>
              </button>
              <button className="rounded-3xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-3 text-left hover:shadow-soft focus-gold">
                <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Two‑factor
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  UI only
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

