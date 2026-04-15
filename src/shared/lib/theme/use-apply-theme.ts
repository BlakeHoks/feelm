import { useEffect } from 'react'
import { type ThemeMode, useThemeStore } from './store'

type ResolvedTheme = 'dark' | 'light'

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }
  return mode
}

function applyTheme(theme: ResolvedTheme) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function useApplyTheme() {
  const mode = useThemeStore((s) => s.mode)

  useEffect(() => {
    applyTheme(resolveTheme(mode))
  }, [mode])

  useEffect(() => {
    if (mode !== 'system') return
    const mql = window.matchMedia('(prefers-color-scheme: light)')
    const handler = () => applyTheme(mql.matches ? 'light' : 'dark')
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [mode])
}
