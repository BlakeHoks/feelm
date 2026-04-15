import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ThemeMode = 'dark' | 'light' | 'system'

type ThemeState = {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

export const THEME_STORAGE_KEY = 'feelm-theme'

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'dark',
      setMode: (mode) => set({ mode })
    }),
    {
      name: THEME_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage)
    }
  )
)
