# Architecture — Feelm

## Project Structure

```
feelm/
├── CLAUDE.md
├── biome.json
├── tailwind.config.ts
├── vite.config.ts
├── vercel.json
├── package.json
├── tsconfig.json
├── .env.local                      # VITE_TMDB_API_KEY (dev only)
├── api/                            # Vercel Serverless Functions
│   └── tmdb.ts                     # Proxy: /api/tmdb?path=...&params
├── public/
└── src/
    ├── app/                        # FSD: app layer
    │   ├── providers/              # QueryClientProvider, ThemeProvider
    │   ├── router/                 # TanStack Router config, routes
    │   ├── styles/                 # Global styles, Tailwind base
    │   └── index.tsx               # Entry point
    ├── pages/                      # FSD: pages
    │   ├── home/                   # MoodSelector → MovieGrid
    │   ├── movie/                  # Детали фильма, трейлер, похожие
    │   └── watchlist/              # Сохранённые фильмы
    ├── widgets/                    # FSD: widgets
    │   ├── mood-selector/          # Сетка настроений на главной
    │   ├── movie-grid/             # Результаты подборки
    │   └── swipe-stack/            # Tinder-mode (v2)
    ├── features/                   # FSD: features
    │   ├── filter-movies/          # Фильтры: год, рейтинг, длительность
    │   ├── add-to-watchlist/       # Кнопка + логика сохранения
    │   ├── share-collection/       # Шаринг через URL query params (v2)
    │   └── search-movie/           # Поиск по названию
    ├── entities/                   # FSD: entities
    │   └── movie/
    │       ├── ui/                 # MovieCard, MovieCardSkeleton
    │       ├── model/              # Types, interfaces
    │       ├── api/                # TMDB query hooks (TanStack Query)
    │       └── index.ts            # Public API
    └── shared/                     # FSD: shared
        ├── ui/                     # shadcn-компоненты (кастомизированные), общие UI-примитивы
        ├── api/                    # TMDB API client (fetch wrapper)
        ├── lib/                    # Утилиты (cn(), debounce, formatRuntime)
        ├── config/                 # Mood mappings, constants, env
        └── types/                  # Глобальные типы
```

## FSD Layer Rules

```
app → pages → widgets → features → entities → shared
```

- Импорт строго вниз по слоям
- Cross-import внутри одного слоя запрещён (page не импортирует другой page)
- Public API каждого слайса через `index.ts`

## Vercel Serverless Proxy

### Production

```
Client → /api/tmdb?path=discover/movie&with_genres=18 → Vercel Function → TMDB API
```

Файл `api/tmdb.ts` — единственная серверная функция. Подставляет `TMDB_API_KEY` из Vercel env vars, проксирует запрос в TMDB, возвращает JSON.

### Development

Vite proxy в `vite.config.ts`:

```ts
server: {
  proxy: {
    '/api/tmdb': {
      target: 'https://api.themoviedb.org/3',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/tmdb/, ''),
      // API key добавляется на клиенте через api client в dev-режиме
    }
  }
}
```

### Environment Variables

```env
# .env.local (dev) — НЕ коммитить
VITE_TMDB_API_KEY=...

# Vercel env vars (prod)
TMDB_API_KEY=...       # Без VITE_ префикса — серверная переменная
```

## TMDB API Endpoints

Все запросы идут через `/api/tmdb?path=<endpoint>&<params>`.

| Endpoint | Назначение |
|---|---|
| `discover/movie` | Основной — фильтрация по жанрам, году, рейтингу, keywords |
| `movie/{id}` | Детали фильма |
| `movie/{id}/videos` | Трейлеры (YouTube ключи) |
| `movie/{id}/similar` | Похожие фильмы |
| `movie/{id}/watch/providers` | Стриминговые сервисы |
| `search/movie` | Поиск по названию |
| `genre/movie/list` | Список жанров (кэшировать при старте) |

## Data Flow

```
User selects mood
  → resolve mood → TMDB params (genres, vote_average, year range, keywords)
  → TanStack Query → /api/tmdb?path=discover/movie&...
  → cache results (staleTime: 5min)
  → render MovieGrid

User clicks movie
  → TanStack Query → /api/tmdb?path=movie/{id}
  → prefetch: videos, similar, watch/providers
  → render MoviePage

User adds to watchlist
  → Zustand action → persist to localStorage
```

## Performance Considerations

- **TanStack Query staleTime:** 5 min для discover, 30 min для movie details
- **Debounce:** фильтры и поиск — 300ms
- **Lazy load:** постеры через Intersection Observer
- **Image placeholders:** TMDB отдаёт разные размеры (w185, w342, w500, original) — использовать w342 для карточек
- **Genre list:** загружать один раз при старте, кэшировать через TanStack Query с staleTime: Infinity
