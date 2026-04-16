const TMDB_PROXY_URL = '/api/tmdb'

export type TMDBQueryParams = Record<string, string | number | boolean | undefined | null>

export class TMDBError extends Error {
  readonly status: number
  readonly path: string

  constructor(message: string, status: number, path: string) {
    super(message)
    this.name = 'TMDBError'
    this.status = status
    this.path = path
  }
}

function buildUrl(path: string, params?: TMDBQueryParams): string {
  const search = new URLSearchParams()
  search.set('path', path.replace(/^\/+/, ''))
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === '') continue
      search.set(key, String(value))
    }
  }
  return `${TMDB_PROXY_URL}?${search.toString()}`
}

export async function tmdbFetch<T>(
  path: string,
  params?: TMDBQueryParams,
  init?: RequestInit
): Promise<T> {
  const url = buildUrl(path, params)
  const res = await fetch(url, { ...init, headers: { accept: 'application/json' } })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new TMDBError(
      `TMDB request failed: ${res.status} ${res.statusText}${detail ? ` — ${detail}` : ''}`,
      res.status,
      path
    )
  }
  return (await res.json()) as T
}
