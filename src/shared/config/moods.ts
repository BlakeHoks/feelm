export type MoodId =
  | 'cry'
  | 'brainoff'
  | 'date'
  | 'insomnia'
  | 'scary'
  | 'nostalgia'
  | 'inspire'
  | 'laugh'
  | 'kids'
  | 'random'

export type DiscoverParams = {
  with_genres?: string
  'vote_average.gte'?: number
  'primary_release_date.gte'?: string
  'primary_release_date.lte'?: string
  'with_runtime.lte'?: number
  with_keywords?: string
  certification_country?: string
  'certification.lte'?: string
  sort_by?: string
  page?: number
}

export type Mood = {
  id: MoodId
  label: string
  emoji: string
  description: string
  discoverParams: DiscoverParams
}

export const MOODS: readonly Mood[] = [
  {
    id: 'cry',
    label: 'Хочу поплакать',
    emoji: '😢',
    description: 'Драмы и мелодрамы с высоким рейтингом',
    discoverParams: {
      with_genres: '18,10749',
      'vote_average.gte': 7.5,
      sort_by: 'popularity.desc'
    }
  },
  {
    id: 'brainoff',
    label: 'Выключить мозг',
    emoji: '🍿',
    description: 'Экшен, комедии, приключения',
    discoverParams: {
      with_genres: '28,35,12',
      sort_by: 'popularity.desc'
    }
  },
  {
    id: 'date',
    label: 'Свидание',
    emoji: '💘',
    description: 'Лёгкие ромкомы',
    discoverParams: {
      with_genres: '10749,35',
      'vote_average.gte': 7.0,
      sort_by: 'popularity.desc'
    }
  },
  {
    id: 'insomnia',
    label: 'Не могу уснуть',
    emoji: '🌙',
    description: 'Короткие доки и анимация',
    discoverParams: {
      with_genres: '99,16',
      'with_runtime.lte': 100,
      sort_by: 'popularity.desc'
    }
  },
  {
    id: 'scary',
    label: 'Хочу бояться',
    emoji: '👻',
    description: 'Хорроры и триллеры',
    discoverParams: {
      with_genres: '27,53',
      sort_by: 'popularity.desc'
    }
  },
  {
    id: 'nostalgia',
    label: 'Ностальгия',
    emoji: '📼',
    description: 'Классика 90-х и 2000-х',
    discoverParams: {
      'vote_average.gte': 7.0,
      'primary_release_date.gte': '1990-01-01',
      'primary_release_date.lte': '2005-12-31',
      sort_by: 'popularity.desc'
    }
  },
  {
    id: 'inspire',
    label: 'Вдохновиться',
    emoji: '✨',
    description: 'Основано на реальных событиях',
    discoverParams: {
      with_genres: '18,36',
      'vote_average.gte': 7.5,
      with_keywords: '9672',
      sort_by: 'popularity.desc'
    }
  },
  {
    id: 'laugh',
    label: 'Посмеяться',
    emoji: '😂',
    description: 'Свежие комедии',
    discoverParams: {
      with_genres: '35',
      'vote_average.gte': 6.5,
      'primary_release_date.gte': '2010-01-01',
      sort_by: 'popularity.desc'
    }
  },
  {
    id: 'kids',
    label: 'С детьми',
    emoji: '🧸',
    description: 'Мультфильмы и семейное',
    discoverParams: {
      with_genres: '16,10751',
      'vote_average.gte': 6.0,
      certification_country: 'US',
      'certification.lte': 'PG',
      sort_by: 'popularity.desc'
    }
  },
  {
    id: 'random',
    label: 'Рулетка',
    emoji: '🎲',
    description: 'Случайная подборка',
    discoverParams: {
      'vote_average.gte': 6.0,
      sort_by: 'popularity.desc'
    }
  }
]

const MOOD_BY_ID = new Map(MOODS.map((m) => [m.id, m]))

export function getMoodById(id: string): Mood | undefined {
  return MOOD_BY_ID.get(id as MoodId)
}

export function isMoodId(value: string): value is MoodId {
  return MOOD_BY_ID.has(value as MoodId)
}
