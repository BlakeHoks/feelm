import { useQuery } from '@tanstack/react-query'
import { tmdbFetch } from '@/shared/api/tmdb-client'
import type { TMDBMovieDetails } from '../model/types'
import { movieKeys } from './keys'

const THIRTY_MINUTES = 30 * 60 * 1000

export function useMovieDetails(id: number | null) {
  return useQuery({
    queryKey: id ? movieKeys.detail(id) : movieKeys.all,
    queryFn: () => tmdbFetch<TMDBMovieDetails>(`movie/${id}`, { language: 'ru-RU' }),
    enabled: id !== null,
    staleTime: THIRTY_MINUTES
  })
}
