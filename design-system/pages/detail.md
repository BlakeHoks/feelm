# Detail Page — Override

> Overrides `design-system/MASTER.md` for route `/movie/$id`.
> Всё, что не упомянуто здесь — берётся из MASTER как есть.

## Концепция

**"Спецификация фильма" как developer-spec.** Верх страницы — кинематографичный hero с backdrop как постером-киноафишей; дальше вниз — плотная data-зона: overview, опции просмотра, похожие. Моно-шрифт усиливает "читать фильм как код" метафору. Единственная декорация — backdrop-изображение + градиент; никаких декоративных blobs.

## Композиция (сверху вниз)

```
┌─ Hero (full-bleed, min-h-[560px] md:min-h-[640px]) ───────────────┐
│  backdrop (absolute, cover) + gradient scrim                      │
│  ┌───────────┬───────────────────────────────────────────┐        │
│  │  poster   │  title (display)                          │        │
│  │  aspect   │  tagline (italic, fg-muted)               │        │
│  │  2:3      │  meta-row: 2024 · 128m · ★ 8.2 (mono)     │        │
│  │  w-[220]  │  genres: pill, pill, pill                 │        │
│  │  lg:w-64  │  CTAs: [▶ Трейлер] [＋ В watchlist]       │        │
│  └───────────┴───────────────────────────────────────────┘        │
└───────────────────────────────────────────────────────────────────┘

┌─ Overview section ─────────────────────────────────────────────────┐
│  ▸ ОПИСАНИЕ                                                       │
│  body text max-w-2xl                                              │
└────────────────────────────────────────────────────────────────────┘

┌─ Watch providers ──────────────────────────────────────────────────┐
│  ▸ ГДЕ ПОСМОТРЕТЬ · RU                                            │
│  [logo] [logo] [logo]  — flatrate provider grid                   │
│  empty: "Пока не доступно на стримингах"                          │
└────────────────────────────────────────────────────────────────────┘

┌─ Similar movies ───────────────────────────────────────────────────┐
│  ▸ ПОХОЖЕЕ                                                        │
│  horizontal scroll-snap strip из MovieCard (min-w-[180px])        │
└────────────────────────────────────────────────────────────────────┘
```

## Hero — spec

| Свойство | Значение |
|---|---|
| Container | `relative isolate overflow-hidden` |
| Min-height | `min-h-[560px] md:min-h-[640px]` |
| Backdrop img | `absolute inset-0 -z-10 object-cover`; в dark — `brightness-[0.45] saturate-110`; в light — `brightness-[0.65] saturate-105` |
| Scrim (dark) | `bg-[linear-gradient(180deg,rgba(10,10,15,0.35)_0%,rgba(10,10,15,0.75)_55%,var(--bg-base)_100%)]` |
| Scrim (light) | `bg-[linear-gradient(180deg,rgba(247,248,250,0.55)_0%,rgba(247,248,250,0.9)_60%,var(--bg-base)_100%)]` |
| Content grid | `grid gap-8 md:grid-cols-[220px_1fr] lg:grid-cols-[256px_1fr] items-end pb-12 md:pb-16` |
| Poster | `aspect-[2/3] w-full rounded-2xl border border-border-strong shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]` |
| Title | `display` scale — `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-fg` |
| Tagline | `italic text-fg-muted text-lg` |
| Meta row | `font-mono text-meta text-fg-muted flex flex-wrap gap-x-3 gap-y-1 items-center` |
| Genre pill | MoodChip-style minus selection: `border border-border bg-surface px-3 py-1 rounded-full font-mono text-xs text-fg-muted` |
| CTA primary (Trailer) | стандартный button из MASTER; иконка `Play` (Phosphor fill) 20px |
| CTA secondary (Watchlist) | `bg-surface border border-border text-fg hover:border-border-strong rounded-xl px-4 py-2.5`; icon `Plus` 20px; в добавленном состоянии → icon `Check` + text "В списке" + `border-secondary/40 text-secondary` |

## Skeleton (hero)

- Backdrop-область → `bg-gradient-to-b from-bg-elevated to-bg-base` + `animate-pulse`
- Poster slot → `aspect-[2/3] bg-surface animate-pulse rounded-2xl`
- Title → `h-12 w-3/4 bg-surface rounded animate-pulse`
- Meta → 3 строчки pill-shimmer
- CTAs → 2 pill-shimmer по 140px ширины

Длительность pulse — стандартная Tailwind (2s); `prefers-reduced-motion` → замереть на 0.8 opacity без анимации.

## Trailer Modal

- Custom `<Modal>` (не shadcn) — focus-trap (`useEffect` + ref), ESC-close, click-outside, `role="dialog" aria-modal="true"`
- Backdrop: `fixed inset-0 bg-bg-deep/80 backdrop-blur-sm`
- Panel: `relative w-[min(92vw,960px)] aspect-video rounded-2xl overflow-hidden border border-border-strong bg-bg-deep shadow-2xl`
- YouTube iframe: `w-full h-full` + `allow="autoplay; encrypted-media; picture-in-picture"`
- Close button: `absolute top-3 right-3` — icon `X` 20px, `bg-bg-elevated/80 border border-border rounded-full p-2 backdrop-blur`
- Motion: backdrop `opacity 0→1` 200ms, panel `scale .96→1 + opacity 0→1` 220ms expo-out. Exit 150ms.
- `prefers-reduced-motion` → только opacity, без scale
- Empty (нет официального трейлера) — кнопка скрыта, не отображается

## Watch providers

- Grid: `grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8`
- Provider tile: `aspect-square rounded-xl overflow-hidden border border-border bg-bg-elevated` + logo `w-full h-full object-contain p-2`
- Приоритет локали: `RU` → `US` → первая из ответа. Берём только `flatrate` (подписка).
- Empty state: `rounded-2xl border border-border border-dashed bg-bg-elevated/50 p-6 text-center text-fg-muted text-sm`
- Если вообще нет providers — секция не рендерится

## Similar movies (strip)

- Wrapper: `relative -mx-4 md:-mx-6 lg:-mx-8` (полноширинный bleed над контейнером)
- Inner scroll: `flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 md:px-6 lg:px-8 pb-2`
- Scrollbar: скрыть (`[&::-webkit-scrollbar]:hidden [scrollbar-width:none]`)
- Card: `min-w-[160px] sm:min-w-[180px] md:min-w-[200px] snap-start`
- Overflow-gradient fade справа (dark): `after:absolute after:inset-y-0 after:right-0 after:w-12 after:bg-gradient-to-l after:from-bg-base after:pointer-events-none`
- Пустой результат или ≤1 фильма — секцию не показываем

## Spacing ritme

| Блок | Margin-top |
|---|---|
| Hero → Overview | `mt-12 md:mt-16` |
| Overview → Providers | `mt-16` |
| Providers → Similar | `mt-16 md:mt-20` |
| Внутри секции между label и контентом | `mt-4` |

## Label treatment

Все section-labels — mono caps с `▸ ` префиксом (см. MASTER `label` scale): `font-mono text-xs uppercase tracking-[0.12em] text-fg-subtle`.

## States

- **Loading:** hero-skeleton виден сразу. Similar/providers — свои skeleton-стрипы, не блокируют hero.
- **404 / не найден:** full-page empty state "Фильм не найден" + ссылка на `/`.
- **Сетевая ошибка:** inline error card внутри соответствующей секции + retry-кнопка (используем `query.refetch()`).

## Accessibility

- `<main>` обрамляет всё содержимое страницы.
- `<h1>` — title фильма (один на странице).
- Backdrop-изображение `aria-hidden="true"` (декор), `alt=""`; постер — осмысленный alt `Постер фильма {title}`.
- Трейлер-модалка: focus возвращается на триггер при закрытии.
- Similar strip навигация клавиатурой — стрелочные скроллы работают естественно через TabIndex на карточках (links).

## Anti-patterns (страница-специфично)

- Не делать параллакс на backdrop — perf дороже, чем эстетика даёт.
- Не показывать несколько трейлеров selector'ом — выбираем один official YouTube trailer и всё.
- Не рендерить "related" секцию с < 3 карточек — лучше пустоту спрятать.
- Не ставить CTA "Watchlist" как primary — primary остаётся Trailer (акцент на просмотр), watchlist — secondary.
