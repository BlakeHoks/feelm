import { BookmarkSimple } from '@phosphor-icons/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { TMDBMovieListItem } from '@/entities/movie/model/types'
import { MovieCard } from '@/entities/movie/ui/movie-card'
import { useWatchlistStore } from '@/entities/watchlist/model/store'
import type { WatchlistItem } from '@/entities/watchlist/model/types'
import { WatchlistToggle } from '@/features/watchlist-toggle/ui/watchlist-toggle'

export const Route = createFileRoute('/watchlist')({
  component: WatchlistPage
})

function toMovieListItem(item: WatchlistItem): TMDBMovieListItem {
  return {
    id: item.id,
    title: item.title,
    original_title: item.title,
    overview: '',
    poster_path: item.poster_path,
    backdrop_path: null,
    release_date: item.release_date ?? '',
    genre_ids: [],
    vote_average: item.vote_average,
    vote_count: 0,
    popularity: 0,
    adult: false,
    original_language: '',
    video: false
  }
}

function WatchlistPage() {
  const items = useWatchlistStore((state) => state.items)

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <header className="mb-10 md:mb-12">
        <p className="mb-3 font-medium font-mono text-fg-subtle text-xs uppercase tracking-[0.12em]">
          ▸ Watchlist
        </p>
        <h1 className="font-semibold text-3xl text-fg tracking-tight md:text-4xl">Моя коллекция</h1>
        {items.length > 0 && (
          <p className="mt-3 font-mono text-fg-muted text-sm uppercase tracking-wide">
            {items.length} {items.length === 1 ? 'movie' : 'movies'}
          </p>
        )}
      </header>

      {items.length === 0 ? <WatchlistEmpty /> : <WatchlistGrid items={items} />}
    </main>
  )
}

function WatchlistEmpty() {
  return (
    <div className="rounded-2xl border border-border border-dashed bg-bg-elevated/50 px-6 py-16 text-center md:py-20">
      <BookmarkSimple size={48} weight="duotone" className="mx-auto mb-5 text-fg-subtle" />
      <p className="text-fg text-xl">Watchlist пуст</p>
      <p className="mx-auto mt-2 max-w-md text-fg-muted text-sm leading-relaxed">
        Сохраняйте фильмы со страниц подбора или детали — они окажутся здесь.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-sm text-white shadow-primary-glow transition-colors duration-150 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Подобрать по настроению
      </Link>
    </div>
  )
}

function WatchlistGrid({ items }: { items: WatchlistItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5">
      {items.map((item) => {
        const movie = toMovieListItem(item)
        return (
          <li key={item.id}>
            <MovieCard
              movie={movie}
              overlay={<WatchlistToggle variant="overlay" movie={movie} />}
            />
          </li>
        )
      })}
    </ul>
  )
}
