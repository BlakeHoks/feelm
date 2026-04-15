# Mood Mappings — Feelm

## Концепция

Каждое "настроение" маппится на набор TMDB `/discover/movie` параметров: жанры, минимальный рейтинг, диапазон годов, keywords. Маппинг хранится в `src/shared/config/moods.ts`.

## Маппинг

| Mood | Label (RU) | Genres (TMDB IDs) | vote_average | Year range | Notes |
|---|---|---|---|---|---|
| `cry` | Хочу поплакать | 18 (Drama), 10749 (Romance) | ≥ 7.5 | — | Высокий рейтинг = качественная драма |
| `brainoff` | Выключить мозг | 28 (Action), 35 (Comedy), 12 (Adventure) | — | — | Без фильтра по рейтингу — тут норм |
| `date` | Свидание | 10749 (Romance), 35 (Comedy) | ≥ 7.0 | — | Лёгкие, приятные фильмы |
| `insomnia` | Не могу уснуть | 99 (Documentary), 16 (Animation) | — | — | `with_runtime.lte=100` — короткие |
| `scary` | Хочу бояться | 27 (Horror), 53 (Thriller) | — | — | — |
| `nostalgia` | Ностальгия | — | ≥ 7.0 | 1990–2005 | Без жанрового ограничения |
| `inspire` | Вдохновиться | 18 (Drama), 36 (History) | ≥ 7.5 | — | Keywords: `based on true story` (keyword ID: 9672) |
| `laugh` | Посмеяться | 35 (Comedy) | ≥ 6.5 | 2010+ | Свежие комедии |
| `kids` | С детьми | 16 (Animation), 10751 (Family) | ≥ 6.0 | — | `certification_country=US&certification.lte=PG` |
| `random` | Рулетка | — | ≥ 6.0 | — | Случайная страница (random page 1-20) |

## Структура данных

```ts
type Mood = {
  id: string;
  label: string;
  emoji: string;
  description: string;          // Короткое пояснение под карточкой
  discoverParams: DiscoverParams;
};

type DiscoverParams = {
  with_genres?: string;         // Comma-separated TMDB genre IDs
  'vote_average.gte'?: number;
  'primary_release_date.gte'?: string;  // YYYY-MM-DD
  'primary_release_date.lte'?: string;
  'with_runtime.lte'?: number;
  with_keywords?: string;
  certification_country?: string;
  'certification.lte'?: string;
  sort_by?: string;             // Default: 'popularity.desc'
  page?: number;
};
```

## Правила расширения

- Новое настроение = новый объект в массиве `MOODS`
- Обязательно: `id`, `label`, `emoji`, `discoverParams`
- Жанры комбинируются через запятую (TMDB трактует как OR)
- Если нужен AND по жанрам — использовать `with_genres` с `|` разделителем (но в большинстве случаев OR лучше для разнообразия)
- `sort_by: 'popularity.desc'` по умолчанию — самые популярные первыми
