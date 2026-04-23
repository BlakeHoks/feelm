import type { MoodId } from '@/shared/config/moods'

const MAX_PAGE = 5

// Хэш строки в стабильное число (djb2-like)
function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

export function computeMoodPage(moodId: MoodId, shuffleTick = 0): number {
  if (moodId === 'random') {
    // shuffleTick даёт новый рандом при каждом клике "перемешать"
    void shuffleTick
    return Math.floor(Math.random() * MAX_PAGE) + 1
  }
  const today = new Date().toISOString().slice(0, 10)
  return (hashString(`${today}:${moodId}`) % MAX_PAGE) + 1
}
