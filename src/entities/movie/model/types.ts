export type TMDBPaginated<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type TMDBMovieListItem = {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  genre_ids: number[]
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  original_language: string
  video: boolean
}

export type TMDBGenre = {
  id: number
  name: string
}

export type TMDBGenresResponse = {
  genres: TMDBGenre[]
}

export type TMDBMovieDetails = TMDBMovieListItem & {
  runtime: number | null
  tagline: string | null
  status: string
  genres: TMDBGenre[]
  homepage: string | null
  imdb_id: string | null
  budget: number
  revenue: number
}

export type TMDBVideo = {
  id: string
  key: string
  name: string
  site: 'YouTube' | 'Vimeo' | string
  type: string
  official: boolean
}

export type TMDBVideosResponse = {
  id: number
  results: TMDBVideo[]
}

export type TMDBWatchProvider = {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export type TMDBWatchLocale = {
  link: string
  flatrate?: TMDBWatchProvider[]
  rent?: TMDBWatchProvider[]
  buy?: TMDBWatchProvider[]
  ads?: TMDBWatchProvider[]
  free?: TMDBWatchProvider[]
}

export type TMDBWatchProvidersResponse = {
  id: number
  results: Record<string, TMDBWatchLocale>
}
