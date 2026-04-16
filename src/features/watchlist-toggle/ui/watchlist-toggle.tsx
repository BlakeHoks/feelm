import { BookmarkSimple, Check, Plus } from '@phosphor-icons/react'
import { useMemo } from 'react'
import type { TMDBMovieDetails, TMDBMovieListItem } from '@/entities/movie/model/types'
import { useIsInWatchlist, useWatchlistStore } from '@/entities/watchlist/model/store'
import { cn } from '@/shared/lib/cn/cn'

type Variant = 'pill' | 'overlay'

type WatchlistToggleProps = {
  movie: TMDBMovieListItem | TMDBMovieDetails
  variant?: Variant
  className?: string
}

export function WatchlistToggle({ movie, variant = 'pill', className }: WatchlistToggleProps) {
  const inWatchlist = useIsInWatchlist(movie.id)
  const toggle = useWatchlistStore((state) => state.toggle)

  const label = useMemo(
    () => (inWatchlist ? 'Убрать из watchlist' : 'Добавить в watchlist'),
    [inWatchlist]
  )

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    toggle(movie)
  }

  if (variant === 'overlay') {
    return (
      <button
        type="button"
        aria-label={label}
        aria-pressed={inWatchlist}
        onClick={handleClick}
        className={cn(
          'relative inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md',
          'transition-colors duration-150',
          'after:-inset-1.5 after:absolute after:content-[""]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
          inWatchlist
            ? 'border-success/50 bg-success/15 text-success'
            : 'border-border bg-bg-elevated/70 text-fg hover:border-border-strong hover:text-primary',
          className
        )}
      >
        {inWatchlist ? (
          <Check size={16} weight="bold" className="motion-safe:animate-feelm-pop" />
        ) : (
          <Plus size={16} weight="bold" />
        )}
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={inWatchlist}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 font-medium text-sm transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
        inWatchlist
          ? 'border-success/40 bg-success/10 text-success'
          : 'border-border bg-surface text-fg hover:border-border-strong',
        className
      )}
    >
      {inWatchlist ? (
        <>
          <Check size={18} weight="bold" className="motion-safe:animate-feelm-pop" />В списке
        </>
      ) : (
        <>
          <BookmarkSimple size={18} weight="bold" />В watchlist
        </>
      )}
    </button>
  )
}
