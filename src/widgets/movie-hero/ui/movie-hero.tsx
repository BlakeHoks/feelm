import { Play, Star } from '@phosphor-icons/react'
import type { TMDBMovieDetails } from '@/entities/movie/model/types'
import { WatchlistToggle } from '@/features/watchlist-toggle/ui/watchlist-toggle'
import { backdropUrl, posterUrl } from '@/shared/config/tmdb-image'
import { cn } from '@/shared/lib/cn/cn'
import { formatRuntime, formatYear } from '@/shared/lib/format/format-runtime'

type MovieHeroProps = {
  movie: TMDBMovieDetails
  hasTrailer: boolean
  onPlayTrailer: () => void
  className?: string
}

export function MovieHero({ movie, hasTrailer, onPlayTrailer, className }: MovieHeroProps) {
  const backdrop = backdropUrl(movie.backdrop_path, 'w1280')
  const poster = posterUrl(movie.poster_path, 'w500')
  const year = formatYear(movie.release_date)
  const runtime = formatRuntime(movie.runtime)
  const rating = movie.vote_average > 0 ? movie.vote_average.toFixed(1) : null

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden',
        'min-h-[560px] md:min-h-[640px]',
        className
      )}
      aria-label={`Hero: ${movie.title}`}
    >
      {backdrop && (
        <img
          src={backdrop}
          alt=""
          aria-hidden
          className="-z-20 absolute inset-0 h-full w-full object-cover brightness-[0.45] saturate-110 dark:brightness-[0.45] [[data-theme='light']_&]:brightness-[0.75]"
        />
      )}
      <div
        aria-hidden
        className="-z-10 absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,15,0.35)_0%,rgba(10,10,15,0.75)_55%,var(--bg-base)_100%)] [[data-theme='light']_&]:bg-[linear-gradient(180deg,rgba(247,248,250,0.55)_0%,rgba(247,248,250,0.9)_60%,var(--bg-base)_100%)]"
      />

      <div className="mx-auto flex h-full max-w-7xl items-end px-4 pt-32 pb-12 md:px-6 md:pb-16 md:pt-40 lg:px-8">
        <div className="grid w-full gap-8 md:grid-cols-[220px_1fr] lg:grid-cols-[256px_1fr]">
          <div className="hidden md:block">
            {poster ? (
              <img
                src={poster}
                alt={`Постер фильма ${movie.title}`}
                className="aspect-[2/3] w-full rounded-2xl border border-border-strong object-cover shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center rounded-2xl border border-border bg-bg-elevated font-mono text-fg-subtle text-xs">
                [ no poster ]
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <h1 className="font-bold text-4xl text-fg tracking-tight md:text-5xl lg:text-6xl">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="mt-2 text-fg-muted text-lg italic">{movie.tagline}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-fg-muted text-sm">
              {year && <span>{year}</span>}
              {runtime && (
                <>
                  <span aria-hidden>·</span>
                  <span>{runtime}</span>
                </>
              )}
              {rating && (
                <>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1 text-accent-warm">
                    <Star size={14} weight="fill" />
                    {rating}
                  </span>
                </>
              )}
              {movie.original_language && (
                <>
                  <span aria-hidden>·</span>
                  <span className="uppercase">{movie.original_language}</span>
                </>
              )}
            </div>

            {movie.genres.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <li
                    key={g.id}
                    className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-fg-muted text-xs"
                  >
                    {g.name}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-2 flex flex-wrap gap-3">
              {hasTrailer && (
                <button
                  type="button"
                  onClick={onPlayTrailer}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-sm text-white shadow-primary-glow transition-colors duration-150 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Play size={18} weight="fill" />
                  Трейлер
                </button>
              )}
              <WatchlistToggle variant="pill" movie={movie} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
