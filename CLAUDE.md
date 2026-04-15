# CLAUDE.md — Feelm

## Project Overview

**Feelm** — кино-рекомендатор по настроению. Помогает найти что посмотреть, когда человек сам не знает чего хочет. Подбор по настроению и контексту, а не по названию. Данные из TMDB API.

## Stack

- **Framework:** Vite + React + TypeScript
- **Routing:** TanStack Router (file-based)
- **Server state:** TanStack Query (кэш, prefetch, stale-while-revalidate)
- **Client state:** Zustand (watchlist, UI-настройки, тема)
- **Styling:** Tailwind CSS — первый опыт, осваиваем на проекте
- **UI-компоненты:** shadcn/ui — ТОЛЬКО утилитарные (Slider, Dialog, Select, Dropdown). Тема полностью кастомная — дефолтный shadcn-лук недопустим
- **Animations:** Framer Motion (карточки, переходы, свайпы)
- **Icons:** Phosphor Icons (НЕ Lucide)
- **Linter/Formatter:** Biome (единый конфиг)
- **Deploy:** Vercel (free tier)
- **API proxy:** Vercel Serverless Functions (`api/` директория)

## Architecture

- **Frontend-only SPA** — без отдельного бэкенда
- TMDB API-ключ на сервере через Vercel serverless proxy (`api/tmdb.ts`)
- В dev-режиме: Vite proxy → TMDB напрямую (ключ из `.env.local`)
- Watchlist в localStorage (Zustand persist)
- FSD-архитектура на фронте

## Key Rules

1. **Named exports only** — без default export (исключение: TanStack Router file-based routes)
2. **Без `any`** — `unknown` + type narrowing или конкретный тип
3. **Zustand ≠ серверный стейт** — данные TMDB только через TanStack Query, Zustand — UI/client стейт
4. **Tailwind only** — без inline styles, без CSS Modules. Исключение: сложные анимации через Framer Motion
5. **shadcn — кастомный** — визуально неузнаваемый, своя цветовая схема, радиусы, шрифт
6. **FSD строго** — импорт только вниз: app → pages → widgets → features → entities → shared
7. **TMDB через proxy** — фронт НЕ обращается к TMDB напрямую, всё через `/api/tmdb`
8. **Код на английском**, комментарии на русском допустимы
9. **Conventional commits** на английском
10. **pnpm only**

## Commands

```bash
pnpm dev          # Vite dev server
pnpm build        # Production build
pnpm lint         # Biome check
pnpm lint:fix     # Biome fix
pnpm preview      # Preview production build
```

## Docs

- [claude/ARCHITECTURE.md](claude/ARCHITECTURE.md) — структура проекта, FSD-слои, serverless proxy, TMDB API
- [claude/CONVENTIONS.md](claude/CONVENTIONS.md) — кодстайл, компоненты, Tailwind, shadcn, тесты
- [claude/MOODS.md](claude/MOODS.md) — маппинг настроений на TMDB-параметры
- [claude/DECISIONS.md](claude/DECISIONS.md) — ADR: обоснования ключевых решений
