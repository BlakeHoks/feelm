import { useQuery } from '@tanstack/react-query'
import { tmdbFetch } from '@/shared/api/tmdb-client'
import type { TMDBGenresResponse } from '../model/types'
import { movieKeys } from './keys'

export function useGenres() {
  return useQuery({
    queryKey: movieKeys.genres,
    queryFn: () => tmdbFetch<TMDBGenresResponse>('genre/movie/list', { language: 'ru-RU' }),
    staleTime: Number.POSITIVE_INFINITY
  })
}
