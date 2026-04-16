import { ArrowSquareOut } from '@phosphor-icons/react'
import type { TMDBWatchLocale } from '@/entities/movie/model/types'
import { cn } from '@/shared/lib/cn/cn'

const TMDB_LOGO_BASE = 'https://image.tmdb.org/t/p/w92'

type WatchProvidersProps = {
  providers: { locale: string; data: TMDBWatchLocale } | null | undefined
  isLoading: boolean
  className?: string
}

export function WatchProviders({ providers, isLoading, className }: WatchProvidersProps) {
  if (isLoading) {
    return (
      <div className={cn('grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8', className)}>
        {Array.from({ length: 6 }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: статический skeleton
          <div key={i} className="aspect-square animate-pulse rounded-xl bg-surface" />
        ))}
      </div>
    )
  }

  const flatrate = providers?.data.flatrate ?? []
  if (!providers || flatrate.length === 0) {
    return (
      <div
        className={cn(
          'rounded-2xl border border-border border-dashed bg-bg-elevated/50 p-6 text-center text-fg-muted text-sm',
          className
        )}
      >
        Пока не доступно на стримингах
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
        {flatrate
          .slice()
          .sort((a, b) => a.display_priority - b.display_priority)
          .map((p) => (
            <div
              key={p.provider_id}
              title={p.provider_name}
              className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-border bg-bg-elevated p-2"
            >
              <img
                src={`${TMDB_LOGO_BASE}${p.logo_path}`}
                alt={p.provider_name}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
          ))}
      </div>
      {providers.data.link && (
        <a
          href={providers.data.link}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 font-mono text-fg-subtle text-xs uppercase tracking-[0.12em] hover:text-fg-muted"
        >
          Подробнее на JustWatch · {providers.locale}
          <ArrowSquareOut size={12} weight="bold" />
        </a>
      )}
    </div>
  )
}
