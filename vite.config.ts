import path from 'node:path'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { type Dispatcher, ProxyAgent, fetch as undiciFetch } from 'undici'
import { defineConfig, loadEnv, type Plugin } from 'vite'

const TMDB_BASE = 'https://api.themoviedb.org/3'

// Если в окружении есть HTTPS_PROXY/HTTP_PROXY — уважаем его для Node fetch.
// Нужно, когда системный DNS редиректит TMDB на localhost (типичный обход через hosts + Clash/Shadowsocks).
function resolveProxyDispatcher(): Dispatcher | undefined {
  const proxyUrl =
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy
  return proxyUrl ? new ProxyAgent(proxyUrl) : undefined
}

// Dev-режим: эмулируем серверную функцию /api/tmdb, чтобы клиентский код был
// идентичен prod. В prod эту же роль играет api/tmdb.ts (Vercel Function).
function tmdbDevProxy(apiKey: string | undefined): Plugin {
  const dispatcher = resolveProxyDispatcher()
  return {
    name: 'feelm:tmdb-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/tmdb', async (req, res) => {
        if (!apiKey) {
          res.statusCode = 500
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify({ error: 'TMDB_API_KEY is not set in .env.local' }))
          return
        }

        const requestUrl = new URL(req.url ?? '', 'http://localhost')
        const tmdbPath = requestUrl.searchParams.get('path')
        if (!tmdbPath) {
          res.statusCode = 400
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify({ error: 'path query param is required' }))
          return
        }

        const upstream = new URL(`${TMDB_BASE}/${tmdbPath.replace(/^\/+/, '')}`)
        for (const [key, value] of requestUrl.searchParams.entries()) {
          if (key === 'path') continue
          upstream.searchParams.append(key, value)
        }
        upstream.searchParams.set('api_key', apiKey)

        try {
          const upstreamRes = await undiciFetch(upstream, dispatcher ? { dispatcher } : {})
          const body = await upstreamRes.text()
          res.statusCode = upstreamRes.status
          res.setHeader(
            'content-type',
            upstreamRes.headers.get('content-type') ?? 'application/json'
          )
          res.end(body)
        } catch (error) {
          res.statusCode = 502
          res.setHeader('content-type', 'application/json')
          res.end(
            JSON.stringify({
              error: 'tmdb upstream fetch failed',
              detail: error instanceof Error ? error.message : 'unknown'
            })
          )
        }
      })
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      TanStackRouterVite({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: 'src/app/router/routes',
        generatedRouteTree: 'src/app/router/routeTree.gen.ts'
      }),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
      tmdbDevProxy(env.TMDB_API_KEY)
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
})
