# Code Conventions — Feelm

## TypeScript

- `strict: true`
- Без `any` — `unknown` + type narrowing
- Named exports only (исключение: TanStack Router file-based routes)
- Файлы: `kebab-case` (`movie-card.tsx`, `use-discover-movies.ts`)
- Типы/интерфейсы: `PascalCase`
- Переменные/функции: `camelCase`
- Константы: `UPPER_SNAKE_CASE`
- Код на английском, комментарии на русском допустимы

## Tailwind CSS

Первый опыт с Tailwind — соглашения для консистентности:

### Порядок классов

Следовать логическому порядку: layout → sizing → spacing → typography → visual → state.

```tsx
// Хорошо
<div className="flex items-center gap-4 p-4 text-sm font-medium bg-white rounded-lg shadow-md hover:shadow-lg" />

// Плохо — хаотичный порядок
<div className="shadow-md flex bg-white text-sm p-4 rounded-lg hover:shadow-lg items-center font-medium gap-4" />
```

### Длинные строки классов

Использовать `cn()` хелпер (из `shared/lib/cn.ts`) для условных и длинных классов:

```tsx
import { cn } from '@/shared/lib/cn';

<div className={cn(
  'flex items-center gap-4 p-4 rounded-lg',
  'bg-white dark:bg-neutral-900',
  isActive && 'ring-2 ring-primary',
  className
)} />
```

### Кастомная тема

Цвета, радиусы, шрифты — через `tailwind.config.ts`, не хардкодить:

```tsx
// Хорошо
<div className="bg-primary text-primary-foreground rounded-card" />

// Плохо
<div className="bg-[#6C5CE7] text-white rounded-[12px]" />
```

### Responsive

Mobile-first: базовые стили → `sm:` → `md:` → `lg:`

```tsx
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" />
```

### Dark Theme

Через Tailwind `dark:` модификатор. Тема переключается классом на `<html>`, хранится в Zustand (persist).

## shadcn/ui

### Что берём из shadcn

Утилитарные компоненты: `Slider`, `Dialog`, `Select`, `DropdownMenu`, `Tooltip`, `Popover`, `Toggle`.

### Что НЕ берём

Всё визуально-центральное: карточки фильмов, MoodSelector, навигация, лейауты — пишем вручную.

### Кастомизация

shadcn-компоненты живут в `src/shared/ui/`. Обязательно:
- Перекрыть CSS variables в `app/styles/globals.css` — свои цвета, радиусы, шрифт
- Убрать дефолтный Geist/Inter — использовать свой шрифт
- Визуально результат НЕ должен быть узнаваем как shadcn

## React Components

### Структура компонента

```
feature-name/
├── ui/
│   ├── feature-component.tsx
│   └── sub-component.tsx
├── model/
│   ├── types.ts
│   └── use-feature-logic.ts      # Хук с бизнес-логикой
├── api/                           # Если есть запросы
│   └── use-feature-query.ts
└── index.ts                       # Public API
```

### Правила

- Один компонент = один файл
- Props-интерфейс рядом с компонентом, не в отдельном файле
- Хуки с бизнес-логикой выносить в `model/` — компонент только рендерит
- Skeleton для каждого компонента с данными (рядом в `ui/`)

## TanStack Query

### Ключи запросов

Фабрика ключей в `entities/movie/api/`:

```ts
export const movieKeys = {
  all: ['movies'] as const,
  discover: (params: DiscoverParams) => ['movies', 'discover', params] as const,
  detail: (id: number) => ['movies', 'detail', id] as const,
  videos: (id: number) => ['movies', 'detail', id, 'videos'] as const,
  similar: (id: number) => ['movies', 'detail', id, 'similar'] as const,
  providers: (id: number) => ['movies', 'detail', id, 'providers'] as const,
  search: (query: string) => ['movies', 'search', query] as const,
};
```

### Правила

- `staleTime` указывать явно для каждого запроса
- Prefetch на hover для MovieCard → movie details
- `enabled: false` для запросов, зависящих от пользовательского ввода (поиск)
- Error/loading states обрабатывать всегда — не оставлять пустой UI

## Zustand

Только для client-side стейта:

```ts
// shared/config/stores/
watchlist-store.ts     // Watchlist (persist → localStorage)
theme-store.ts         // Dark/light theme (persist)
filter-store.ts        // Активные фильтры (не persist)
```

Серверные данные (фильмы, жанры) — ТОЛЬКО TanStack Query. Дублирование в Zustand запрещено.

## Accessibility

- Все интерактивные элементы — keyboard navigable
- `aria-label` на иконочных кнопках
- Focus management при открытии/закрытии Dialog
- Semantic HTML: `<main>`, `<nav>`, `<article>` для карточек
- Contrast ratio: минимум WCAG AA (4.5:1 для текста)
- MoodSelector: кнопки с aria-label, не просто div с onClick

## Tests (на вырост)

- Unit: Vitest — утилиты, хуки, store логика
- Component: Vitest + React Testing Library — компоненты с моками TanStack Query
- E2E: Playwright — основные сценарии (выбор настроения → результаты → страница фильма)
