import type { TMDBMovieListItem } from '@/entities/movie/model/types'
import { MovieCard } from '@/entities/movie/ui/movie-card'
import { MovieCardSkeleton } from '@/entities/movie/ui/movie-card-skeleton'
import { WatchlistToggle } from '@/features/watchlist-toggle/ui/watchlist-toggle'
import { cn } from '@/shared/lib/cn/cn'

type SimilarMoviesProps = {
  movies: TMDBMovieListItem[] | undefined
  isLoading: boolean
  className?: string
}

const SKELETON_COUNT = 6

export function SimilarMovies({ movies, isLoading, className }: SimilarMoviesProps) {
  if (isLoading) {
    return (
      <div className={cn('relative -mx-4 md:-mx-6 lg:-mx-8', className)}>
        <div className="flex gap-4 overflow-hidden px-4 pb-2 md:px-6 lg:px-8">
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: статический skeleton
              key={i}
              className="min-w-[160px] shrink-1 sm:min-w-[180px] md:min-w-[200px]"
            >
              <MovieCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!movies || movies.length < 3) return null

  return (
    <div className={cn('relative -mx-4 md:-mx-6 lg:-mx-8', className)}>
      <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 md:px-6 lg:px-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[160px] shrink-1 snap-start sm:min-w-[180px] md:min-w-[200px]"
          >
            <MovieCard
              movie={movie}
              overlay={<WatchlistToggle variant="overlay" movie={movie} />}
            />
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg-base"
      />
    </div>
  )
}
