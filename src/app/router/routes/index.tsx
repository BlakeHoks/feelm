import { Shuffle } from '@phosphor-icons/react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { useDiscoverMovies } from '@/entities/movie/api/use-discover-movies'
import { getMoodById, isMoodId, type MoodId } from '@/shared/config/moods'
import { cn } from '@/shared/lib/cn/cn'
import { computeMoodPage } from '@/shared/lib/mood-page/compute-page'
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
  const [shuffleTick, setShuffleTick] = useState(0)

  const discoverParams = useMemo(() => {
    if (!activeMood) return null
    return {
      ...activeMood.discoverParams,
      page: computeMoodPage(activeMood.id, shuffleTick)
    }
  }, [activeMood, shuffleTick])

  const discover = useDiscoverMovies(discoverParams)

  const handleSelect = (id: MoodId) => {
    navigate({ search: { mood: id }, replace: true, resetScroll: false })
  }

  const handleReshuffle = () => {
    setShuffleTick((tick) => tick + 1)
  }

  const canReshuffle = activeMood?.id === 'random'

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
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="font-medium font-mono text-fg-subtle text-xs uppercase tracking-[0.15em]">
                ▸ Подборка · {activeMood.label}
              </p>
              {canReshuffle && (
                <button
                  type="button"
                  onClick={handleReshuffle}
                  disabled={discover.isFetching}
                  aria-label="Перемешать подборку"
                  className={cn(
                    'group inline-flex items-center gap-2 rounded-full border px-3 py-1.5',
                    'cursor-pointer font-mono text-[11px] uppercase tracking-[0.15em]',
                    'transition-colors duration-150',
                    'border-border bg-surface text-fg-muted',
                    'hover:border-border-strong hover:text-fg',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
                    'disabled:cursor-not-allowed disabled:opacity-50'
                  )}
                >
                  <Shuffle
                    size={14}
                    weight="bold"
                    className={cn(
                      'transition-transform duration-300 ease-out',
                      discover.isFetching ? 'animate-spin' : 'group-hover:rotate-180'
                    )}
                  />
                  <span>Перемешать</span>
                </button>
              )}
            </div>
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
