import { Star } from '@phosphor-icons/react'
import { useApplyTheme } from '@/shared/lib/theme'
import { Header } from '@/widgets/header'

const MOODS = ['Cozy', 'Mind-bending', 'Heartbreaking', 'Adrenaline', 'Feel-good', 'Slow burn']

function App() {
  useApplyTheme()

  return (
    <div className="min-h-svh bg-bg-base text-fg">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <section className="max-w-3xl">
          <p className="mb-4 font-medium font-mono text-fg-subtle text-xs uppercase tracking-[0.15em]">
            ▸ Design System · v0.1
          </p>
          <h1 className="mb-5 font-bold text-5xl text-fg tracking-tight md:text-6xl">
            Find something to watch when you don't know what you want.
          </h1>
          <p className="mb-10 text-fg-muted text-lg leading-relaxed">
            Feelm подбирает кино по настроению и контексту, а не по названию. Ниже — живой preview
            дизайн-системы в обеих темах.
          </p>

          <div className="mb-10 flex flex-wrap gap-2">
            {MOODS.map((mood, i) => {
              const selected = i === 1
              return (
                <button
                  key={mood}
                  type="button"
                  className={[
                    'rounded-full border px-4 py-2 font-mono text-sm transition-colors duration-150',
                    selected
                      ? 'border-secondary/50 bg-secondary/10 text-secondary'
                      : 'border-border bg-surface text-fg-muted hover:border-border-strong hover:text-fg'
                  ].join(' ')}
                >
                  {mood}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-sm text-white shadow-primary-glow transition-colors duration-150 hover:bg-primary-hover"
            >
              Pick a mood
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 font-medium text-fg text-sm transition-colors duration-150 hover:border-border-strong"
            >
              Surprise me
            </button>
          </div>
        </section>

        <section className="mt-24">
          <p className="mb-6 font-medium font-mono text-fg-subtle text-xs uppercase tracking-[0.15em]">
            ▸ Sample Movie Card
          </p>
          <article className="max-w-sm overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-[border-color,transform] duration-200 hover:scale-[1.02] hover:border-border-strong">
            <div className="flex aspect-[2/3] items-center justify-center bg-gradient-to-br from-surface to-bg-deep">
              <span className="font-mono text-fg-subtle text-xs">[ poster ]</span>
            </div>
            <div className="p-4">
              <h3 className="mb-1 font-semibold text-base text-fg">Blade Runner 2049</h3>
              <p className="mb-3 font-mono text-fg-muted text-xs">
                2017 · 164m ·{' '}
                <span className="inline-flex items-center gap-1 text-accent-warm">
                  <Star size={12} weight="fill" /> 8.0
                </span>
              </p>
              <p className="text-fg-muted text-sm leading-relaxed">
                A young blade runner's discovery of a long-buried secret leads him to track down
                former blade runner Rick Deckard.
              </p>
            </div>
          </article>
        </section>

        <section className="mt-24">
          <p className="mb-6 font-medium font-mono text-fg-subtle text-xs uppercase tracking-[0.15em]">
            ▸ Typography Scale
          </p>
          <div className="space-y-4 text-fg">
            <p className="font-bold text-5xl tracking-tight">Display 48/56</p>
            <p className="font-semibold text-3xl tracking-tight">H1 32/40</p>
            <p className="font-semibold text-2xl">H2 24/32</p>
            <p className="font-semibold text-lg">H3 18/24</p>
            <p className="text-base">Body 16/24 — основной текст для описаний.</p>
            <p className="text-fg-muted text-sm">Small 14/20 — captions, hints.</p>
            <p className="font-mono text-fg-muted text-xs">meta (mono) 13/18 · 2024 · 128m</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export { App }
