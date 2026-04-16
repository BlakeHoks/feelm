import { useQuery } from '@tanstack/react-query'
import { tmdbFetch } from '@/shared/api/tmdb-client'
import type { TMDBMovieListItem, TMDBPaginated } from '../model/types'
import { movieKeys } from './keys'

const FIFTEEN_MINUTES = 15 * 60 * 1000

export function useSimilarMovies(id: number | null) {
  return useQuery({
    queryKey: id ? movieKeys.similar(id) : movieKeys.all,
    queryFn: () =>
      tmdbFetch<TMDBPaginated<TMDBMovieListItem>>(`movie/${id}/similar`, {
        language: 'ru-RU',
        page: 1
      }),
    enabled: id !== null,
    staleTime: FIFTEEN_MINUTES,
    select: (data) => data.results
  })
}
