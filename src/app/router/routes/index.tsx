import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useDiscoverMovies } from '@/entities/movie/api/use-discover-movies'
import { getMoodById, isMoodId, type MoodId } from '@/shared/config/moods'
import { MoodSelector } from '@/widgets/mood-selector/ui/mood-selector'
import { MovieGrid } from '@/widgets/movie-grid/ui/movie-grid'

type HomeSearch = {
  mood?: MoodId
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): HomeSearch => {
    const raw = search.mood
    if (typeof raw === 'string' && isMoodId(raw)) return { mood: raw }
    return {}
  },
  component: HomePage
})

function HomePage() {
  const { mood } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const activeMood = mood ? getMoodById(mood) : undefined

  const discover = useDiscoverMovies(activeMood ? activeMood.discoverParams : null)

  const handleSelect = (id: MoodId) => {
    navigate({ search: { mood: id }, replace: true, resetScroll: false })
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <section className="max-w-3xl">
        <p className="mb-4 font-medium font-mono text-fg-subtle text-xs uppercase tracking-[0.15em]">
          ▸ Feelm · v0.1
        </p>
        <h1 className="mb-5 font-bold text-5xl text-fg tracking-tight md:text-6xl">
          Не знаешь, что посмотреть? Выбери настроение.
        </h1>
        <p className="mb-10 text-fg-muted text-lg leading-relaxed">
          Feelm подбирает кино по настроению и контексту, а не по названию. Источник данных — TMDB.
        </p>

        <MoodSelector
          selectedId={activeMood?.id ?? null}
          onSelect={handleSelect}
          className="mb-4"
        />

        {activeMood && (
          <p className="font-mono text-fg-muted text-xs">
            <span aria-hidden>▸ </span>
            {activeMood.description}
          </p>
        )}
      </section>

      <section className="mt-16">
        {activeMood ? (
          <>
            <p className="mb-6 font-medium font-mono text-fg-subtle text-xs uppercase tracking-[0.15em]">
              ▸ Подборка · {activeMood.label}
            </p>
            <MovieGrid
              movies={discover.data?.results}
              isLoading={discover.isPending}
              isError={discover.isError}
              error={discover.error instanceof Error ? discover.error : null}
            />
          </>
        ) : (
          <div className="rounded-2xl border border-border border-dashed bg-bg-elevated/50 p-10 text-center text-fg-muted text-sm">
            Выбери настроение выше — и Feelm подберёт фильмы.
          </div>
        )}
      </section>
    </main>
  )
}
