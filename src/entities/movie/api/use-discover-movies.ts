import { useQuery } from '@tanstack/react-query'
import { type TMDBQueryParams, tmdbFetch } from '@/shared/api/tmdb-client'
import type { DiscoverParams } from '@/shared/config/moods'
import type { TMDBMovieListItem, TMDBPaginated } from '../model/types'
import { movieKeys } from './keys'

const FIVE_MINUTES = 5 * 60 * 1000

function toQueryParams(params: DiscoverParams): TMDBQueryParams {
  return {
    with_genres: params.with_genres,
    'vote_average.gte': params['vote_average.gte'],
    'primary_release_date.gte': params['primary_release_date.gte'],
    'primary_release_date.lte': params['primary_release_date.lte'],
    'with_runtime.lte': params['with_runtime.lte'],
    with_keywords: params.with_keywords,
    certification_country: params.certification_country,
    'certification.lte': params['certification.lte'],
    sort_by: params.sort_by ?? 'popularity.desc',
    page: params.page ?? 1,
    include_adult: false,
    language: 'ru-RU'
  }
}

export function useDiscoverMovies(params: DiscoverParams | null) {
  const safeParams = params ?? {}
  return useQuery({
    queryKey: params ? movieKeys.discover(params) : movieKeys.all,
    queryFn: () =>
      tmdbFetch<TMDBPaginated<TMDBMovieListItem>>('discover/movie', toQueryParams(safeParams)),
    enabled: params !== null,
    staleTime: FIVE_MINUTES
  })
}
