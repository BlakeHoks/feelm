import type { DiscoverParams } from '@/shared/config/moods'

export const movieKeys = {
  all: ['movies'] as const,
  discover: (params: DiscoverParams) => ['movies', 'discover', params] as const,
  detail: (id: number) => ['movies', 'detail', id] as const,
  videos: (id: number) => ['movies', 'detail', id, 'videos'] as const,
  similar: (id: number) => ['movies', 'detail', id, 'similar'] as const,
  providers: (id: number) => ['movies', 'detail', id, 'providers'] as const,
  search: (query: string) => ['movies', 'search', query] as const,
  genres: ['movies', 'genres'] as const
}
