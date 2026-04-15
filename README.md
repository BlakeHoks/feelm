# Feelm

Кино-рекомендатор по настроению. Подбор фильмов по mood и контексту, а не по названию. Данные из TMDB.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first config)
- TanStack Router + TanStack Query (планируется)
- Zustand (client state, watchlist, тема)
- Framer Motion (анимации)
- Phosphor Icons
- Biome (lint + format)
- Deploy: Vercel

FSD-архитектура: `app → pages → widgets → features → entities → shared`.

## Commands

```bash
pnpm dev          # Vite dev server
pnpm build        # Production build
pnpm preview      # Preview production build
pnpm lint         # Biome check
pnpm lint:fix     # Biome check + fix
pnpm format       # Biome format
```

## Documentation

- [CLAUDE.md](CLAUDE.md) — project rules for AI assistants
- [design-system/MASTER.md](design-system/MASTER.md) — design system source of truth
- [claude/ARCHITECTURE.md](claude/ARCHITECTURE.md) — FSD layers, serverless proxy, TMDB API
- [claude/CONVENTIONS.md](claude/CONVENTIONS.md) — codestyle, components, Tailwind, shadcn
- [claude/MOODS.md](claude/MOODS.md) — mood → TMDB params mapping
- [claude/DECISIONS.md](claude/DECISIONS.md) — ADRs
