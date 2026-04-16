import { BookmarkSimple, FilmReel } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { useWatchlistCount } from '@/entities/watchlist/model/store'
import { ThemeToggle } from '@/features/theme-toggle/ui/theme-toggle'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg-elevated/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link to="/" className="group inline-flex items-center gap-2">
          <FilmReel size={20} weight="fill" className="text-primary" />
          <span className="font-semibold text-fg text-lg tracking-tight">feelm</span>
        </Link>

        <nav className="flex items-center gap-2">
          <WatchlistNavLink />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

function WatchlistNavLink() {
  const count = useWatchlistCount()
  const ariaLabel = count > 0 ? `Watchlist (${count})` : 'Watchlist'

  return (
    <Link
      to="/watchlist"
      aria-label={ariaLabel}
      activeProps={{
        className:
          'inline-flex items-center gap-2 rounded-xl border border-border-strong bg-surface px-3 py-1.5 text-fg text-sm transition-colors'
      }}
      inactiveProps={{
        className:
          'inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-1.5 text-fg-muted text-sm transition-colors hover:border-border-strong hover:text-fg'
      }}
    >
      {({ isActive }) => (
        <>
          <BookmarkSimple size={18} weight={isActive ? 'fill' : 'regular'} />
          <span className="hidden sm:inline">Watchlist</span>
          {count > 0 && (
            <span
              aria-hidden
              className={
                isActive
                  ? 'min-w-[20px] rounded-full bg-primary px-1.5 text-center font-mono text-[11px] text-white leading-[18px]'
                  : 'min-w-[20px] rounded-full bg-primary/15 px-1.5 text-center font-mono text-[11px] text-primary-text leading-[18px]'
              }
            >
              {count}
            </span>
          )}
        </>
      )}
    </Link>
  )
}
