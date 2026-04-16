import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TMDBMovieDetails, TMDBMovieListItem } from '@/entities/movie/model/types'
import { movieToWatchlistItem, type WatchlistItem } from './types'

type WatchlistState = {
  items: WatchlistItem[]
  add: (movie: TMDBMovieListItem | TMDBMovieDetails) => void
  remove: (id: number) => void
  toggle: (movie: TMDBMovieListItem | TMDBMovieDetails) => void
  clear: () => void
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (movie) => {
        if (get().items.some((item) => item.id === movie.id)) return
        set({
          items: [{ ...movieToWatchlistItem(movie), addedAt: Date.now() }, ...get().items]
        })
      },
      remove: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      toggle: (movie) => {
        const exists = get().items.some((item) => item.id === movie.id)
        if (exists) get().remove(movie.id)
        else get().add(movie)
      },
      clear: () => set({ items: [] })
    }),
    {
      name: 'feelm:watchlist:v1',
      version: 1
    }
  )
)

export function useIsInWatchlist(id: number): boolean {
  return useWatchlistStore((state) => state.items.some((item) => item.id === id))
}

export function useWatchlistCount(): number {
  return useWatchlistStore((state) => state.items.length)
}
