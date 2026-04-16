# Watchlist — Override

> Overrides `design-system/MASTER.md` for route `/watchlist` и связанной фичи `watchlist-toggle`.
> Всё, что не упомянуто — берётся из MASTER как есть.

## Концепция

**"Личный каталог в стиле dev-console".** Сохранённые фильмы — не "избранное с сердечком", а **коллекция записей**: строгий заголовок, моно-счётчик, sans-плотная сетка карточек. Amber / сердечки не используются — состояние "сохранено" маркируется `--success` (зелёный, Phosphor `Check`) + текстом "В списке". Цвет никогда не несёт смысл в одиночку.

## Страница `/watchlist`

### Layout

```
┌─ Page header ──────────────────────────────────────────────┐
│  ▸ WATCHLIST                                              │
│  Моя коллекция                                            │
│  12 MOVIES · добавлено сегодня                            │
└────────────────────────────────────────────────────────────┘

┌─ Grid (3/4/5 cols) или Empty ─────────────────────────────┐
│  [MovieCard] [MovieCard] [MovieCard] ...                  │
└────────────────────────────────────────────────────────────┘
```

### Контейнер

- `<main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12 md:py-16">`
- Page header: `mb-10 md:mb-12`
- Grid: такой же как mood-результаты — `grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-8`

### Page header

| Элемент | Спек |
|---|---|
| Label | `▸ WATCHLIST` — mono caps, `font-mono text-xs uppercase tracking-[0.12em] text-fg-subtle` |
| Title | `Моя коллекция` — `h1` (`text-3xl md:text-4xl font-semibold text-fg tracking-tight`) |
| Stats line | `12 MOVIES · добавлено сегодня` — `font-mono text-meta text-fg-muted uppercase tracking-wide`. При 0 не рендерим. |

## Empty state

Показываем ровно тогда, когда `items.length === 0`. Не "тонкая" пустота — развёрнутая карточка с пояснением и CTA.

| Элемент | Спек |
|---|---|
| Wrapper | `rounded-2xl border border-dashed border-border bg-bg-elevated/50 px-6 py-16 md:py-20 text-center` |
| Icon | `Bookmark` (Phosphor, weight="duotone") 48px, `text-fg-subtle mx-auto mb-5` |
| Headline | `text-xl font-semibold text-fg` — "Watchlist пуст" |
| Body | `mt-2 text-fg-muted text-sm max-w-md mx-auto` — "Сохраняйте фильмы со страниц подбора или детали — они окажутся здесь." |
| CTA | Primary button (MASTER spec) → `Link to="/"` — "Подобрать по настроению" |

Никаких иллюстраций / SVG-сцен — только Phosphor-иконка: консистентно с остальным продуктом.

## Header badge (глобально)

Элемент навигации в sticky header, справа от логотипа (или слева от ThemeToggle).

| Элемент | Спек |
|---|---|
| Link | `inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-1.5 text-sm text-fg-muted hover:border-border-strong hover:text-fg transition-colors` |
| Active (на `/watchlist`) | `border-border-strong text-fg` |
| Icon | `Bookmark` 18px, regular weight (fill — когда active) |
| Label | "Watchlist" — скрыто на `< sm`, видно на `≥ sm` |
| Counter badge | inline-span справа от лейбла — `ml-0.5 min-w-[20px] rounded-full bg-primary/15 px-1.5 text-center font-mono text-[11px] text-primary-text leading-[18px]`. При 0 не рендерим. На active-состоянии → `bg-primary text-white`. |

Mobile (`< sm`): показываем только иконку + badge. touch target остаётся ≥44×44 за счёт `py-1.5 + px-3` и `hitSlop`-подобного padding — визуально 32px, реально ≥44 благодаря line-height badge.

## WatchlistToggle (shared компонент)

Одна реализация, два режима через `variant`:

### `variant="pill"` (для Hero detail-страницы)

- inactive: `bg-surface border border-border text-fg hover:border-border-strong rounded-xl px-5 py-2.5 font-medium text-sm inline-flex items-center gap-2` + `Plus` 18px + "В watchlist"
- active: `border-secondary/40 bg-secondary/10 text-secondary` + `Check` 18px + "В списке"
- `aria-pressed={inWatchlist}`, `transition-colors duration-150`

### `variant="overlay"` (для MovieCard poster)

- Floating в top-right постера: `absolute top-2 right-2 z-10`
- Круглая icon-only: `inline-flex items-center justify-center rounded-full w-9 h-9 border backdrop-blur-md`
- inactive: `border-border bg-bg-elevated/70 text-fg hover:text-primary hover:border-border-strong` + `Plus` 16px regular
- active: `border-secondary/50 bg-secondary/20 text-secondary` + `Check` 16px bold
- Touch target расширяется `hitSlop`-патч через `after:absolute after:inset-[-6px] after:content-['']` — реальная зона ≥44px
- `aria-label`: `"Добавить в watchlist"` / `"Убрать из watchlist"` (динамически)
- Клик **не** должен всплывать до `<Link>` карточки — `onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(); }}`
- Видимость на desktop: `opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity`; на touch (`< md` или при active-состоянии) — всегда `opacity-100`

### Motion feedback (обе варианты)

- При добавлении: scale `1 → 1.12 → 1` 180ms expo-out — только иконка, не кнопка целиком (предотвращает CLS)
- При удалении: opacity flash (fade-out→fade-in) 120ms
- `prefers-reduced-motion` → отключить scale, оставить только color transition

## Состояния

- **Empty (0 items):** empty-state (см. выше).
- **Populated:** grid карточек. Сортировка: по убыванию `addedAt` (свежее — сверху).
- **Single item:** grid всё равно рендерится (не fallback на spec-стиль), карточка одна.
- **Loading:** не применимо — данные из localStorage синхронны.

## Data shape (watchlist item)

Храним минимум, достаточный для рендера карточки без запроса к TMDB:

```ts
type WatchlistItem = {
  id: number
  title: string
  poster_path: string | null
  release_date: string | undefined
  vote_average: number
  addedAt: number // timestamp
}
```

Если карточка была открыта до добавления (есть `overview` etc.) — не храним, чтобы не раздувать localStorage. Card на `/watchlist` рендерится без overview (`movie.overview` undefined → блок просто не показывается, уже обрабатывается в `MovieCard`).

## Persistence

- Zustand с `persist` middleware (`zustand/middleware`)
- Ключ: `feelm:watchlist:v1`
- Версионирование: `version: 1` в persist-конфиге; при bump `migrate()` сбрасывает на пустой (v1 — первая схема, нечего мигрировать)
- SSR-safe не нужен (SPA)

## Accessibility

- Иконка `Bookmark` в header → `aria-label="Watchlist (12)"` с актуальным числом
- Badge `aria-hidden` — значение уже в aria-label ссылки
- Overlay-toggle: поверх `<Link>`, но сам — отдельный `<button>`. Предотвращаем всплытие, чтобы click по постеру ≠ toggle.
- Активное состояние "в watchlist" — не только цвет (success), но и icon (`Check`) + label text. Color-blind safe.
- Screen reader announcement на toggle: стандартно через aria-pressed (Tab + Enter/Space — toggle; состояние читается).

## Anti-patterns (страница-специфично)

- Не использовать `Heart` / сердечко — Feelm не "favorites", это **планшет просмотра** (watchlist).
- Не окрашивать всю карточку в success при "added" — состояние показывается только toggle-кнопкой; карточка остаётся нейтральной.
- Не делать toast при каждом toggle — он частый жест, toast захламлял бы экран. Visual state-change самого toggle достаточно.
- Не делать confirmation-dialog на remove — undo через повторный клик, одна кнопка.
- Не показывать counter badge при 0 — визуальный шум.
- Не добавлять сортировку / фильтры в MVP — коллекция редко > 30 элементов, простой список рулит.
