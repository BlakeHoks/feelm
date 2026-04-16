import { MOODS, type MoodId } from '@/shared/config/moods'
import { cn } from '@/shared/lib/cn/cn'

type MoodSelectorProps = {
  selectedId: MoodId | null
  onSelect: (id: MoodId) => void
  className?: string
}

export function MoodSelector({ selectedId, onSelect, className }: MoodSelectorProps) {
  return (
    <fieldset className={cn('flex flex-wrap gap-2 border-0 p-0', className)}>
      <legend className="sr-only">Настроение</legend>
      {MOODS.map((mood) => {
        const selected = mood.id === selectedId
        return (
          <button
            key={mood.id}
            type="button"
            aria-pressed={selected}
            aria-label={mood.label}
            onClick={() => onSelect(mood.id)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-4 py-2',
              'cursor-pointer',
              'font-mono text-sm transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
              selected
                ? 'border-secondary/50 bg-secondary/10 text-secondary'
                : 'border-border bg-surface text-fg-muted hover:border-border-strong hover:text-fg'
            )}
          >
            <span aria-hidden>{mood.emoji}</span>
            <span>{mood.label}</span>
          </button>
        )
      })}
    </fieldset>
  )
}
