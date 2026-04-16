import { useQuery } from '@tanstack/react-query'
import { tmdbFetch } from '@/shared/api/tmdb-client'
import type { TMDBWatchLocale, TMDBWatchProvidersResponse } from '../model/types'
import { movieKeys } from './keys'

const ONE_HOUR = 60 * 60 * 1000
const LOCALE_PRIORITY = ['RU', 'US', 'GB', 'DE'] as const

type ResolvedProviders = {
  locale: string
  data: TMDBWatchLocale
} | null

function pickLocale(all: Record<string, TMDBWatchLocale>): ResolvedProviders {
  for (const locale of LOCALE_PRIORITY) {
    const data = all[locale]
    if (data && (data.flatrate?.length ?? 0) > 0) return { locale, data }
  }
  const firstWithFlatrate = Object.entries(all).find(([, v]) => (v.flatrate?.length ?? 0) > 0)
  if (firstWithFlatrate) return { locale: firstWithFlatrate[0], data: firstWithFlatrate[1] }
  return null
}

export function useWatchProviders(id: number | null) {
  return useQuery({
    queryKey: id ? movieKeys.providers(id) : movieKeys.all,
    queryFn: () => tmdbFetch<TMDBWatchProvidersResponse>(`movie/${id}/watch/providers`),
    enabled: id !== null,
    staleTime: ONE_HOUR,
    select: (data) => pickLocale(data.results)
  })
}
