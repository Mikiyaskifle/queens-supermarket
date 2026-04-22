import * as React from 'react'
import { ToastViewport, type ToastItem, type ToastKind } from '../components/Toast'

type ToastInput = Omit<ToastItem, 'id'>

type ToastContextValue = {
  push: (t: ToastInput) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16)
}

const DEFAULT_TTL_MS: Record<ToastKind, number> = {
  success: 2800,
  info: 2600,
  error: 3400,
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const push = React.useCallback((t: ToastInput) => {
    const id = uid()
    const item: ToastItem = { id, ...t }
    setToasts((prev) => [item, ...prev].slice(0, 4))

    const ttl = DEFAULT_TTL_MS[t.kind]
    window.setTimeout(() => dismiss(id), ttl)
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

