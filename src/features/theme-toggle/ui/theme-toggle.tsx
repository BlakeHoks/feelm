import { Monitor, Moon, Sun } from '@phosphor-icons/react'
import { type ThemeMode, useThemeStore } from '@/shared/lib/theme/store'

const options: Array<{ value: ThemeMode; label: string; Icon: typeof Sun }> = [
  { value: 'light', label: 'Light mode', Icon: Sun },
  { value: 'system', label: 'System mode', Icon: Monitor },
  { value: 'dark', label: 'Dark mode', Icon: Moon }
]

export function ThemeToggle() {
  const mode = useThemeStore((s) => s.mode)
  const setMode = useThemeStore((s) => s.setMode)

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-surface p-0.5"
    >
      {options.map(({ value, label, Icon }) => {
        const selected = mode === value
        return (
          // biome-ignore lint/a11y/useSemanticElements: segmented control uses button+role=radio for visual grouping, radio input не даёт нужного UX
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            onClick={() => setMode(value)}
            className={[
              'inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-150',
              selected
                ? 'bg-bg-elevated text-fg shadow-[0_1px_0_0_var(--border-strong)]'
                : 'text-fg-subtle hover:text-fg'
            ].join(' ')}
          >
            <Icon size={16} weight={selected ? 'fill' : 'regular'} />
          </button>
        )
      })}
    </div>
  )
}
