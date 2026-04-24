import { ArrowSquareOut } from '@phosphor-icons/react'
import type { TMDBWatchLocale } from '@/entities/movie/model/types'
import { cn } from '@/shared/lib/cn/cn'

type WatchProvidersProps = {
  providers: { locale: string; data: TMDBWatchLocale } | null | undefined
  isLoading: boolean
  className?: string
}

const PILL_BASE =
  'inline-flex items-center rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-fg-muted text-xs'
const PILL_LINK =
  'cursor-pointer transition-colors duration-150 hover:border-border-strong hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'

export function WatchProviders({ providers, isLoading, className }: WatchProvidersProps) {
  if (isLoading) {
    return (
      <div className={cn('flex flex-wrap gap-2', className)}>
        {Array.from({ length: 4 }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: статический skeleton
          <div key={i} className="h-7 w-24 animate-pulse rounded-full bg-surface" />
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

  const aggregateLink = providers.data.link
  const sorted = flatrate.slice().sort((a, b) => a.display_priority - b.display_priority)

  return (
    <div className={cn('space-y-3', className)}>
      <ul className="flex flex-wrap gap-2">
        {sorted.map((p) =>
          aggregateLink ? (
            <li key={p.provider_id}>
              <a
                href={aggregateLink}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Смотреть на ${p.provider_name}`}
                className={cn(PILL_BASE, PILL_LINK)}
              >
                {p.provider_name}
              </a>
            </li>
          ) : (
            <li key={p.provider_id}>
              <span className={PILL_BASE}>{p.provider_name}</span>
            </li>
          )
        )}
      </ul>
      {aggregateLink && (
        <a
          href={aggregateLink}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-fg-subtle uppercase tracking-[0.15em] transition-colors duration-150 hover:text-fg-muted"
        >
          <span aria-hidden>▸</span>
          Источник · JustWatch · {providers.locale}
          <ArrowSquareOut size={11} weight="bold" />
        </a>
      )}
    </div>
  )
}
