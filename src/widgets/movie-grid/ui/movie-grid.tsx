import type { TMDBMovieListItem } from '@/entities/movie/model/types'
import { MovieCard } from '@/entities/movie/ui/movie-card'
import { MovieCardSkeleton } from '@/entities/movie/ui/movie-card-skeleton'
import { WatchlistToggle } from '@/features/watchlist-toggle/ui/watchlist-toggle'
import { cn } from '@/shared/lib/cn/cn'

type MovieGridProps = {
  movies: TMDBMovieListItem[] | undefined
  isLoading: boolean
  isError: boolean
  error?: Error | null
  className?: string
  emptyLabel?: string
}

const SKELETON_COUNT = 8

export function MovieGrid({
  movies,
  isLoading,
  isError,
  error,
  className,
  emptyLabel = 'Ничего не нашлось. Попробуй другое настроение.'
}: MovieGridProps) {
  if (isError) {
    return (
      <div
        className={cn(
          'rounded-2xl border border-border bg-bg-elevated p-6 text-fg-muted text-sm',
          className
        )}
        role="alert"
      >
        <p className="mb-1 font-medium text-fg">Не удалось загрузить фильмы</p>
        <p className="text-fg-muted text-xs">{error?.message ?? 'Неизвестная ошибка'}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
          className
        )}
        aria-busy
      >
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: статический skeleton, порядок фиксирован
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!movies || movies.length === 0) {
    return (
      <div
        className={cn(
          'rounded-2xl border border-border border-dashed bg-bg-elevated/50 p-10 text-center text-fg-muted text-sm',
          className
        )}
      >
        {emptyLabel}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
        className
      )}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          overlay={<WatchlistToggle variant="overlay" movie={movie} />}
        />
      ))}
    </div>
  )
}
