import { useQuery } from '@tanstack/react-query'
import { tmdbFetch } from '@/shared/api/tmdb-client'
import type { TMDBVideo, TMDBVideosResponse } from '../model/types'
import { movieKeys } from './keys'

const THIRTY_MINUTES = 30 * 60 * 1000

// Выбираем один official YouTube trailer — приоритет Trailer > Teaser.
function pickOfficialTrailer(videos: TMDBVideo[]): TMDBVideo | null {
  const youtube = videos.filter((v) => v.site === 'YouTube')
  const officialTrailer = youtube.find((v) => v.official && v.type === 'Trailer')
  if (officialTrailer) return officialTrailer
  const anyTrailer = youtube.find((v) => v.type === 'Trailer')
  if (anyTrailer) return anyTrailer
  return youtube.find((v) => v.type === 'Teaser') ?? null
}

export function useMovieTrailer(id: number | null) {
  return useQuery({
    queryKey: id ? movieKeys.videos(id) : movieKeys.all,
    queryFn: () => tmdbFetch<TMDBVideosResponse>(`movie/${id}/videos`),
    enabled: id !== null,
    staleTime: THIRTY_MINUTES,
    select: (data) => pickOfficialTrailer(data.results)
  })
}
