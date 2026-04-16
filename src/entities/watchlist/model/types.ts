import type { TMDBMovieDetails, TMDBMovieListItem } from '@/entities/movie/model/types'

export type WatchlistItem = {
  id: number
  title: string
  poster_path: string | null
  release_date: string | undefined
  vote_average: number
  addedAt: number
}

export function movieToWatchlistItem(
  movie: TMDBMovieListItem | TMDBMovieDetails
): Omit<WatchlistItem, 'addedAt'> {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average
  }
}
