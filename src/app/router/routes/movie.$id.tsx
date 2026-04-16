import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useState } from 'react'
import { useMovieDetails } from '@/entities/movie/api/use-movie-details'
import { useMovieTrailer } from '@/entities/movie/api/use-movie-videos'
import { useSimilarMovies } from '@/entities/movie/api/use-similar-movies'
import { useWatchProviders } from '@/entities/movie/api/use-watch-providers'
import { MovieHero } from '@/widgets/movie-hero/ui/movie-hero'
import { MovieHeroSkeleton } from '@/widgets/movie-hero/ui/movie-hero-skeleton'
import { SimilarMovies } from '@/widgets/similar-movies/ui/similar-movies'
import { TrailerModal } from '@/widgets/trailer-modal/ui/trailer-modal'
import { WatchProviders } from '@/widgets/watch-providers/ui/watch-providers'

export const Route = createFileRoute('/movie/$id')({
  parseParams: (params) => {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id <= 0) throw notFound()
    return { id }
  },
  stringifyParams: (params) => ({ id: String(params.id) }),
  component: MoviePage
})

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-medium font-mono text-fg-subtle text-xs uppercase tracking-[0.12em]">
      ▸ {children}
    </p>
  )
}

function MoviePage() {
  const { id } = Route.useParams()
  const [trailerOpen, setTrailerOpen] = useState(false)

  const details = useMovieDetails(id)
  const trailer = useMovieTrailer(id)
  const providers = useWatchProviders(id)
  const similar = useSimilarMovies(id)

  if (details.isPending) {
    return (
      <main>
        <MovieHeroSkeleton />
      </main>
    )
  }

  if (details.isError || !details.data) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 md:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-bg-elevated p-8 text-center">
          <p className="mb-2 font-semibold text-fg text-lg">Фильм не найден</p>
          <p className="mb-6 text-fg-muted text-sm">
            {details.error instanceof Error ? details.error.message : 'Неизвестная ошибка'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 font-medium text-fg text-sm transition-colors hover:border-border-strong"
          >
            ← На главную
          </Link>
        </div>
      </main>
    )
  }

  const movie = details.data

  return (
    <main>
      <MovieHero
        movie={movie}
        hasTrailer={Boolean(trailer.data)}
        onPlayTrailer={() => setTrailerOpen(true)}
      />

      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {movie.overview && (
          <section className="mt-12 max-w-3xl md:mt-16">
            <SectionLabel>Описание</SectionLabel>
            <p className="mt-4 text-base text-fg leading-relaxed">{movie.overview}</p>
          </section>
        )}

        <section className="mt-16">
          <SectionLabel>
            Где посмотреть{providers.data ? ` · ${providers.data.locale}` : ''}
          </SectionLabel>
          <WatchProviders
            providers={providers.data}
            isLoading={providers.isPending}
            className="mt-4"
          />
        </section>

        {(similar.isPending || (similar.data && similar.data.length >= 3)) && (
          <section className="mt-16 pb-16 md:mt-20 md:pb-24">
            <SectionLabel>Похожее</SectionLabel>
            <SimilarMovies movies={similar.data} isLoading={similar.isPending} className="mt-4" />
          </section>
        )}
      </div>

      <TrailerModal
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        youtubeKey={trailer.data?.key ?? null}
        title={movie.title}
      />
    </main>
  )
}
