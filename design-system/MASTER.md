# Feelm — Design System (MASTER)

> Source of truth for Feelm UI. Page-specific overrides live in `design-system/pages/*.md`.
> When building a page: first check `design-system/pages/<page>.md`, fall back to this MASTER.

## Concept

**Cinematic Developer Console** — тёмный кинематографичный фон + терминальная точность в типографике и мета-данных. Кино "читается как код": год, runtime, rating, genres — моно-шрифтом, как "спецификация фильма". Настроения (mood chips) — главная интерактивная метафора.

**DNA одной строкой:** developer-tools плотность данных × тёмная кино-эстетика × синий бренд-якорь.

## Theme Support

- **Dark** (primary, default-first): cinematic OLED-safe
- **Light**: "day library" mode, тот же brand-blue
- Переключатель в header: `Sun / Moon / Monitor (system)` (Phosphor icons)
- Default при первом визите без system preference → **dark**
- State → Zustand persist; применение → `data-theme` на `<html>`
- FOUC-safe инициализация inline-script'ом в `index.html` до рендера React

## Color Tokens

Семантические токены, одинаковые по именам в обеих темах. Primary blue — **брендовая константа**, не меняется между темами.

| Token | Dark | Light | Назначение |
|-------|------|-------|------------|
| `--bg-deep` | `#020203` | `#F1F2F5` | основание градиента hero |
| `--bg-base` | `#0A0A0F` | `#F7F8FA` | дефолтный фон |
| `--bg-elevated` | `#12131A` | `#FFFFFF` | карточки, модалки |
| `--surface` | `rgba(255,255,255,0.05)` | `rgba(15,23,42,0.03)` | hover-поверхности |
| `--border` | `rgba(255,255,255,0.08)` | `rgba(15,23,42,0.08)` | hairline |
| `--border-strong` | `rgba(255,255,255,0.14)` | `rgba(15,23,42,0.16)` | focus, active |
| `--fg` | `#EDEDEF` | `#0F1115` | основной текст |
| `--fg-muted` | `#8A8F98` | `#4A5561` | мета, secondary |
| `--fg-subtle` | `#5A5F68` | `#8A8F98` | hints, captions |
| `--primary` | `#3B82F6` | `#3B82F6` | CTA, акцент (blue-500) |
| `--primary-hover` | `#2563EB` | `#2563EB` | hover CTA |
| `--primary-text` | `#3B82F6` | `#2563EB` | inline-ссылки (blue-600 на light для контраста ≥4.5:1) |
| `--primary-glow` | `rgba(59,130,246,0.25)` | `rgba(59,130,246,0.18)` | ambient glow под CTA |
| `--secondary` | `#38BDF8` | `#0891B2` | mood-chip selected, второстепенный акцент (cyan) |
| `--accent-warm` | `#F59E0B` | `#D97706` | рейтинги, звёзды — **единственный тёплый тон** |
| `--success` | `#10B981` | `#059669` | в watchlist, подтверждения |
| `--destructive` | `#EF4444` | `#DC2626` | удаление, errors |
| `--ring` | `#3B82F6` | `#3B82F6` | focus-ring |

**Правила:**
- Raw hex **запрещён** в компонентах — только через токены / Tailwind semantic classes (`bg-base`, `text-fg`, `border-border` и т.д.)
- Primary (синий) — **одинаковый** в обеих темах. `--primary-text` используется только для inline-текста в body (ссылки), для CTA-кнопок — всегда `--primary`.
- Amber (`--accent-warm`) — **только** для рейтингов TMDB. Никакого другого тёплого цвета в UI нет.

## Surface-Specific Treatments

**Ключевое различие между темами — не только цвет:**

| Элемент | Dark | Light |
|---------|------|-------|
| Card | border hairline + без shadow | `shadow-sm` + border только при hover |
| Hero ambient blobs | blue/cyan blobs, opacity 0.08–0.12, Framer Motion осцилляция | **убираются полностью**, заменяются на `rgba(59,130,246,0.04)` grid-pattern |
| Poster overlay (hero) | `rgba(0,0,0,0.55)` | `rgba(0,0,0,0.35)` |
| Poster filter в grid | `brightness(0.92) saturate(1.05)` на not-hover | без фильтров |
| CTA primary | flat blue + glow (shadow через primary-glow) | flat blue + лёгкая shadow |
| Sticky header | BlurView (backdrop-blur-xl) + bg-elevated/80 | backdrop-blur-md + bg-elevated/90 |

## Typography

- **Sans (UI, body, headings):** `Inter` — weights 300/400/500/600/700
- **Mono (meta, technical labels):** `Space Mono` — weights 400/700 only

**Когда mono:**
- Мета-данные фильма: `2024 · 128m · 8.2` (год · runtime · rating)
- Labels над блоками: `▸ SIMILAR MOODS`, `▸ CAST`, `▸ WATCH OPTIONS`
- Числа в watchlist-статистике (`42 MOVIES · 87H TOTAL`)
- TMDB IDs и любые технические идентификаторы
- Никогда — для body-текста, overview фильма, описаний

**Type scale:**

| Token | Size / Line | Weight | Tracking | Использование |
|-------|-------------|--------|----------|---------------|
| `display` | 48/56 (mobile) → 64/72 (lg) | 700 | -0.02em | hero headline |
| `h1` | 32/40 → 40/48 | 600 | -0.01em | page title |
| `h2` | 24/32 | 600 | -0.005em | section |
| `h3` | 18/24 | 600 | 0 | subsection, card title |
| `body` | 16/24 | 400 | 0 | overview, описания |
| `small` | 14/20 | 400 | 0 | captions, hints |
| `meta` (mono) | 13/18 | 500 | 0 | `2024 · 128m · 8.2` |
| `label` (mono caps) | 11/16 | 500 | +0.08em uppercase | `▸ SIMILAR MOODS` |

Space Mono не имеет 500-й weight → использовать 400, визуально moncaps с letter-spacing сами дают "вес".

## Spacing & Layout

- **Базис:** 4pt — `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64`
- **Контейнер:** `max-w-7xl` (1280px)
- **Gutters:** `px-4 md:px-6 lg:px-8`
- **Breakpoints** (Tailwind defaults): `sm 640 / md 768 / lg 1024 / xl 1280`
- **Плотность data-spec блоков** (detail page): `gap-2`, `py-1.5`
- **Плотность movie-grid:** `gap-6 lg:gap-8`
- **Card radius:** `rounded-2xl` (16px)
- **Button radius:** `rounded-xl` (12px)
- **Chip radius:** `rounded-full`

## Motion

- **Easing (default):** `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) — для входов
- **Easing (exit):** `cubic-bezier(0.7, 0, 0.84, 0)` (expo-in) — для выходов
- **Micro (hover, chip toggle):** 150–200ms
- **Macro (modal, page transition):** 280–320ms
- **Exit duration:** ~70% от enter (быстрее исчезает, чтобы UI ощущался отзывчивым)
- **Card hover:** scale `1.0 → 1.02` + shadow lift + border brightening. **Не translateY** — вызывает CLS.
- **Stagger в grid:** 30–40ms между карточками
- **`prefers-reduced-motion`:** отключает ambient-blobs, stagger, scale-hover. Transitions color/opacity остаются.

## Иконки

- **Phosphor Icons** (обязательно, НЕ Lucide — см. CLAUDE.md)
- `Regular` для inactive / default
- `Fill` для active / selected
- Размеры: **только** `16 / 20 / 24` — никаких промежуточных
- Никаких эмодзи в UI

## Компоненты — ключевые патерны

### Button (primary)
```
bg-primary text-white rounded-xl px-4 py-2.5 text-body font-medium
shadow-[0_0_0_1px_var(--primary)/0.4,0_8px_24px_-8px_var(--primary-glow)]
hover:bg-primary-hover transition-colors duration-150
focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
```

### MoodChip
```
// default
border border-border bg-surface px-4 py-2 rounded-full font-mono text-small

// selected
border-secondary/50 bg-secondary/10 text-secondary
// (на light: border-secondary/40 bg-secondary/8 text-secondary)
```

### Card (movie)
```
bg-elevated rounded-2xl border border-border overflow-hidden
hover:border-border-strong transition-[border-color,transform] duration-200
hover:scale-[1.02]
// на light добавляется shadow-sm → hover:shadow-md
```

### Spec row (meta)
```
font-mono text-meta text-fg-muted
// labels в caps:
text-label uppercase tracking-wider text-fg-subtle
```

### Sticky header
```
backdrop-blur-xl bg-elevated/80 border-b border-border
// light: backdrop-blur-md bg-elevated/90
```

## shadcn/ui — правила

- Используем **только** утилитарные компоненты (Slider, Dialog, Select, Dropdown, DropdownMenu, Popover, Tooltip)
- Все визуальные компоненты (Button, Card, Input) — собственные в `src/shared/ui/`
- Если всё же используем shadcn-wrapper, переопределяем полностью через `className` — дефолтный shadcn-лук недопустим (см. CLAUDE.md)

## Anti-patterns

- Чистый `#000` фон — всегда `#0A0A0F` минимум (OLED smear)
- Неоновые свечения / glitch / scanlines — это cyberpunk, не кино
- Фиолетовый / purple как primary
- Градиенты на CTA (flat blue + glow — чище)
- Raw hex в компонентах вместо токенов
- Mono для body-текста
- Эмодзи как иконки
- `translate-y` на hover карточки (CLS)
- Shadow в dark mode для разделения поверхностей (они невидимы) — используй border + glow
- Блокирующие спиннеры — всегда skeleton screens через Framer Motion

## Accessibility Baseline

- Контраст body text ≥ 4.5:1 (проверено: `--fg` на `--bg-base` в обеих темах OK)
- Focus-ring обязателен — `ring-2 ring-ring ring-offset-2 ring-offset-bg-base`
- Все icon-only кнопки → `aria-label`
- Keyboard nav работает на всех интерактивных элементах
- `prefers-reduced-motion` уважается глобально
- Color не несёт значение в одиночку — всегда icon/text рядом (например, "в watchlist" = icon + text, не только зелёный цвет)

## Файловая структура

```
design-system/
├── MASTER.md                    # этот файл
└── pages/                       # overrides для конкретных страниц
    ├── hero.md                  # (создаётся при работе над hero)
    ├── detail.md
    └── watchlist.md

src/shared/styles/
├── tokens.css                   # CSS variables (dark + light)
└── index.css                    # Tailwind import + @theme mapping + base layers
```

## Версия

v0.1 — 2026-04-15 — initial system (Feelm MVP)
