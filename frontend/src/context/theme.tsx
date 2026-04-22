import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeContextValue = {
  theme: Theme
  setTheme: (t: Theme) => void
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'qs.theme'

function applyThemeToDom(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    const systemPrefersDark =
      window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false

    const initial: Theme = saved ?? (systemPrefersDark ? 'dark' : 'light')
    setThemeState(initial)
    applyThemeToDom(initial)
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem(STORAGE_KEY, t)
    applyThemeToDom(t)
  }

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

