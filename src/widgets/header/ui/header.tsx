import { FilmReel } from '@phosphor-icons/react'
import { ThemeToggle } from '@/features/theme-toggle'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg-elevated/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <a href="/" className="group inline-flex items-center gap-2">
          <FilmReel size={20} weight="fill" className="text-primary" />
          <span className="font-semibold text-fg text-lg tracking-tight">feelm</span>
        </a>

        <nav className="flex items-center gap-3">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
