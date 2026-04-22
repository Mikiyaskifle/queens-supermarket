import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Loader2, MapPin, Phone, ShoppingBag, User } from 'lucide-react'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { saveOrder } from '../data/orders'
import { useCart } from '../context/cart'
import { useToast } from '../context/toast'
import { useProducts } from '../hooks/useProducts'
import { formatETB } from '../lib/money'
import { cn } from '../lib/cn'

type FormState = {
  fullName: string
  phone: string
  address: string
  notes: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const DELIVERY_FEE = 120

function validate(form: FormState): FormErrors {
  const e: FormErrors = {}
  if (form.fullName.trim().length < 3) e.fullName = 'Please enter your full name.'
  if (!/^[0-9+\-\s]{9,}$/.test(form.phone.trim()))
    e.phone = 'Please enter a valid phone number.'
  if (form.address.trim().length < 8) e.address = 'Delivery address is too short.'
  if (form.notes.length > 300) e.notes = 'Notes must be 300 characters or less.'
  return e
}

const steps = [
  { id: 1, label: 'Cart Review', icon: ShoppingBag },
  { id: 2, label: 'Your Details', icon: User },
  { id: 3, label: 'Confirm', icon: CheckCircle2 },
]

const fadeSlide = {
  initial: { opacity: 0, x: 20, filter: 'blur(6px)' },
  animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, x: -20, filter: 'blur(6px)' },
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const cart = useCart()
  const toast = useToast()
  const { products } = useProducts()
  const [step, setStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [form, setForm] = React.useState<FormState>({
    fullName: '',
    phone: '',
    address: '',
    notes: '',
  })
  const [errors, setErrors] = React.useState<FormErrors>({})

  const rows =
    products?.flatMap((p) => {
      const qty = cart.getQty(p.id)
      if (!qty) return []
      return [{ product: p, qty, lineTotal: qty * p.price }]
    }) ?? []

  const subtotal = rows.reduce((s, r) => s + r.lineTotal, 0)
  const total = subtotal + (rows.length > 0 ? DELIVERY_FEE : 0)

  const goNext = () => {
    if (step === 2) {
      const nextErrors = validate(form)
      setErrors(nextErrors)
      if (Object.keys(nextErrors).length > 0) return
    }
    setStep((s) => Math.min(3, s + 1))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rows.length === 0) return
    setIsSubmitting(true)
    await new Promise((r) => window.setTimeout(r, 900))

    const orderId = `ord_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
    saveOrder({
      id: orderId,
      createdAt: new Date().toISOString(),
      items: cart.items,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
      customer: {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        notes: form.notes.trim() || undefined,
      },
    })
    cart.clear()
    toast.push({ kind: 'success', title: 'Order placed!', message: 'Redirecting…' })
    navigate(`/order-success?id=${encodeURIComponent(orderId)}`)
  }

  if (rows.length === 0 && !isSubmitting) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add products to cart before checking out."
          primaryAction={{ label: 'Shop Products', onClick: () => navigate('/products') }}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10">
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Checkout
        </motion.h1>
        <p className="mt-2 text-slate-700 dark:text-slate-200">
          Fast, smooth, and premium checkout in seconds.
        </p>
      </div>

      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center gap-0">
          {steps.map((s, i) => {
            const done = step > s.id
            const active = step === s.id
            return (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-1.5">
                  <motion.div
                    animate={{
                      backgroundColor: done
                        ? '#166534'
                        : active
                        ? '#facc15'
                        : undefined,
                    }}
                    className={cn(
                      'h-10 w-10 rounded-2xl flex items-center justify-center border transition-colors',
                      done
                        ? 'bg-royal-600 border-royal-600 text-white'
                        : active
                        ? 'bg-gold-500 border-gold-500 text-slate-900'
                        : 'bg-white/55 dark:bg-white/[0.05] border-white/40 dark:border-white/10 text-slate-500 dark:text-slate-400',
                    )}
                  >
                    {done ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <s.icon className="h-4 w-4" />
                    )}
                  </motion.div>
                  <div
                    className={cn(
                      'text-xs font-semibold tracking-wide hidden sm:block',
                      active
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-500 dark:text-slate-400',
                    )}
                  >
                    {s.label}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-2 mb-5 sm:mb-6 rounded-full transition-colors',
                      step > s.id
                        ? 'bg-royal-600'
                        : 'bg-white/40 dark:bg-white/10',
                    )}
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section>
          <AnimatePresence mode="wait">
            {/* Step 1: Cart Review */}
            {step === 1 && (
              <motion.div key="step1" {...fadeSlide} transition={{ duration: 0.3 }}>
                <div className="glass ring-gold rounded-[2.25rem] p-5 sm:p-6">
                  <div className="font-display text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white mb-5">
                    Review Your Cart
                  </div>
                  <div className="grid gap-3">
                    {rows.map(({ product, qty, lineTotal }) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-4 rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 p-3"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-14 w-14 rounded-2xl object-cover border border-white/30 dark:border-white/10 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-display text-sm font-extrabold text-slate-900 dark:text-white truncate">
                            {product.name}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-300">
                            {product.category} • {product.unit}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                            {formatETB(lineTotal)}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-300">
                            Qty: {qty}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <motion.button
                      type="button"
                      whileHover={{ y: -1, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={goNext}
                      className="inline-flex items-center gap-2 rounded-2xl bg-royal-600 px-5 py-2.5 text-sm font-extrabold tracking-wide text-white shadow-soft hover:bg-royal-700 focus-gold"
                    >
                      Continue <ChevronRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Customer Details */}
            {step === 2 && (
              <motion.div key="step2" {...fadeSlide} transition={{ duration: 0.3 }}>
                <div className="glass ring-gold rounded-[2.25rem] p-5 sm:p-6">
                  <div className="font-display text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white mb-5">
                    Customer Information
                  </div>
                  <div className="grid gap-4">
                    <label className="grid gap-2">
                      <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" /> Full Name
                      </div>
                      <input
                        value={form.fullName}
                        onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                        placeholder="Enter your full name"
                        className="h-11 w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-gold"
                      />
                      {errors.fullName && (
                        <div className="text-xs text-red-500">{errors.fullName}</div>
                      )}
                    </label>

                    <label className="grid gap-2">
                      <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" /> Phone Number
                      </div>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="+251..."
                        className="h-11 w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-gold"
                      />
                      {errors.phone && (
                        <div className="text-xs text-red-500">{errors.phone}</div>
                      )}
                    </label>

                    <label className="grid gap-2">
                      <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> Delivery Address
                      </div>
                      <textarea
                        value={form.address}
                        onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                        placeholder="Enter delivery address"
                        className="min-h-[100px] w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-gold"
                      />
                      {errors.address && (
                        <div className="text-xs text-red-500">{errors.address}</div>
                      )}
                    </label>

                    <label className="grid gap-2">
                      <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                        Optional Notes
                      </div>
                      <textarea
                        value={form.notes}
                        onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                        placeholder="Add delivery instructions (optional)"
                        className="min-h-[90px] w-full rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-gold"
                      />
                      {errors.notes && (
                        <div className="text-xs text-red-500">{errors.notes}</div>
                      )}
                    </label>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-2.5 text-sm font-extrabold text-slate-900 dark:text-white hover:bg-white/70 dark:hover:bg-white/[0.09] focus-gold"
                    >
                      ← Back
                    </button>
                    <motion.button
                      type="button"
                      whileHover={{ y: -1, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={goNext}
                      className="inline-flex items-center gap-2 rounded-2xl bg-royal-600 px-5 py-2.5 text-sm font-extrabold tracking-wide text-white shadow-soft hover:bg-royal-700 focus-gold"
                    >
                      Review Order <ChevronRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <motion.div key="step3" {...fadeSlide} transition={{ duration: 0.3 }}>
                <div className="glass ring-gold rounded-[2.25rem] p-5 sm:p-6">
                  <div className="font-display text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white mb-5">
                    Confirm Your Order
                  </div>

                  {/* Customer summary */}
                  <div className="grid gap-3 sm:grid-cols-2 mb-5">
                    {[
                      { icon: User, label: 'Name', value: form.fullName },
                      { icon: Phone, label: 'Phone', value: form.phone },
                      { icon: MapPin, label: 'Address', value: form.address },
                    ].map((f) => (
                      <div
                        key={f.label}
                        className="rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-3 flex items-start gap-3"
                      >
                        <f.icon className="h-4 w-4 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                            {f.label}
                          </div>
                          <div className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                            {f.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Items summary */}
                  <div className="rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 p-4 mb-5">
                    <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300 mb-3">
                      {rows.length} item(s)
                    </div>
                    <div className="grid gap-2">
                      {rows.map(({ product, qty, lineTotal }) => (
                        <div key={product.id} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700 dark:text-slate-200 truncate max-w-[200px]">
                            {product.name} × {qty}
                          </span>
                          <span className="font-extrabold text-slate-900 dark:text-white flex-shrink-0">
                            {formatETB(lineTotal)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 px-4 py-2.5 text-sm font-extrabold text-slate-900 dark:text-white hover:bg-white/70 dark:hover:bg-white/[0.09] focus-gold"
                    >
                      ← Back
                    </button>
                    <motion.button
                      type="submit"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-none h-12 rounded-2xl bg-gold-500 text-slate-900 font-extrabold tracking-wide shadow-glowGold hover:bg-gold-400 focus-gold disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 px-6"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Placing Order...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-5 w-5" />
                          Place Order
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Order Summary sidebar */}
        <aside className="glass ring-gold rounded-[2.25rem] p-5 sm:p-6 h-fit lg:sticky lg:top-[104px]">
          <div className="font-display text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
            Order Summary
          </div>
          <div className="mt-4 grid gap-3">
            {rows.map(({ product, qty, lineTotal }) => (
              <div
                key={product.id}
                className="rounded-2xl bg-white/55 dark:bg-white/[0.05] border border-white/40 dark:border-white/10 p-3 flex items-center gap-3"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-12 w-12 rounded-2xl object-cover border border-white/40 dark:border-white/10 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-extrabold text-slate-900 dark:text-white">
                    {product.name}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">Qty: {qty}</div>
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex-shrink-0">
                  {formatETB(lineTotal)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-2 text-sm text-slate-700 dark:text-slate-200">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {formatETB(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Delivery Fee</span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {formatETB(DELIVERY_FEE)}
              </span>
            </div>
            <div className="h-px w-full bg-white/40 dark:bg-white/10 my-2" />
            <div className="flex items-center justify-between">
              <span className="font-extrabold">Total</span>
              <span className="font-extrabold text-royal-700 dark:text-gold-300 text-base">
                {formatETB(total)}
              </span>
            </div>
          </div>

          {/* Step progress in sidebar */}
          <div className="mt-5 pt-5 border-t border-white/30 dark:border-white/10">
            <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300 mb-3">
              Progress
            </div>
            <div className="grid gap-2">
              {steps.map((s) => (
                <div
                  key={s.id}
                  className={cn(
                    'flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors',
                    step === s.id
                      ? 'bg-gold-500/15 border border-gold-500/30 text-slate-900 dark:text-gold-200'
                      : step > s.id
                      ? 'text-royal-700 dark:text-gold-300'
                      : 'text-slate-500 dark:text-slate-400',
                  )}
                >
                  {step > s.id ? (
                    <CheckCircle2 className="h-4 w-4 text-royal-600 dark:text-gold-400" />
                  ) : (
                    <s.icon className="h-4 w-4" />
                  )}
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </form>
    </div>
  )
}
