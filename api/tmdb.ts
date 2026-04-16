import type { VercelRequest, VercelResponse } from '@vercel/node'

const TMDB_BASE = 'https://api.themoviedb.org/3'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'TMDB_API_KEY env var is not configured' })
    return
  }

  const rawPath = req.query.path
  const tmdbPath = Array.isArray(rawPath) ? rawPath[0] : rawPath
  if (!tmdbPath || typeof tmdbPath !== 'string') {
    res.status(400).json({ error: 'path query param is required' })
    return
  }

  const upstream = new URL(`${TMDB_BASE}/${tmdbPath.replace(/^\/+/, '')}`)
  for (const [key, value] of Object.entries(req.query)) {
    if (key === 'path' || value === undefined) continue
    if (Array.isArray(value)) {
      for (const v of value) upstream.searchParams.append(key, v)
    } else {
      upstream.searchParams.set(key, value)
    }
  }
  upstream.searchParams.set('api_key', apiKey)

  try {
    const upstreamRes = await fetch(upstream)
    const body = await upstreamRes.text()
    res
      .status(upstreamRes.status)
      .setHeader('content-type', upstreamRes.headers.get('content-type') ?? 'application/json')
      .setHeader('cache-control', 'public, s-maxage=300, stale-while-revalidate=600')
      .send(body)
  } catch (error) {
    res.status(502).json({
      error: 'tmdb upstream fetch failed',
      detail: error instanceof Error ? error.message : 'unknown'
    })
  }
}
