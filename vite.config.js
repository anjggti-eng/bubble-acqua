
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

const storeDir = path.resolve('.game-data')
const storePath = path.join(storeDir, 'ranking.json')

const emptyStore = () => ({ players: [], scores: [] })

async function readStore() {
  try {
    return JSON.parse(await fs.readFile(storePath, 'utf8'))
  } catch {
    return emptyStore()
  }
}

async function writeStore(store) {
  await fs.mkdir(storeDir, { recursive: true })
  await fs.writeFile(storePath, JSON.stringify(store, null, 2))
}

function sendJson(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
      if (body.length > 1024 * 1024) {
        reject(new Error('Payload muito grande'))
        req.destroy()
      }
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        reject(new Error('JSON invalido'))
      }
    })
    req.on('error', reject)
  })
}

function publicPlayer(player) {
  return {
    id: player.id,
    name: player.name,
    email: player.email || '',
    highScore: player.highScore || 0,
    createdAt: player.createdAt,
    updatedAt: player.updatedAt,
  }
}

function leaderboardFrom(store) {
  return store.players
    .map(publicPlayer)
    .sort((a, b) => b.highScore - a.highScore || a.name.localeCompare(b.name))
    .slice(0, 50)
}

function createGameApiPlugin() {
  const clients = new Set()

  const broadcast = async () => {
    const ranking = leaderboardFrom(await readStore())
    const payload = `data: ${JSON.stringify({ type: 'leaderboard', ranking })}\n\n`
    for (const res of clients) res.write(payload)
  }

  const attach = (server) => {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith('/api/game')) return next()

      try {
        const url = new URL(req.url, 'http://localhost')

        if (req.method === 'GET' && url.pathname === '/api/game/leaderboard') {
          return sendJson(res, 200, { ranking: leaderboardFrom(await readStore()) })
        }

        if (req.method === 'GET' && url.pathname === '/api/game/events') {
          res.writeHead(200, {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
          })
          clients.add(res)
          const ranking = leaderboardFrom(await readStore())
          res.write(`data: ${JSON.stringify({ type: 'leaderboard', ranking })}\n\n`)
          req.on('close', () => clients.delete(res))
          return
        }

        if (req.method === 'GET' && url.pathname === '/api/game/player') {
          const id = url.searchParams.get('id')
          const store = await readStore()
          const player = store.players.find((item) => item.id === id)
          return player
            ? sendJson(res, 200, { player: publicPlayer(player) })
            : sendJson(res, 404, { error: 'Jogador nao encontrado' })
        }

        if (req.method === 'POST' && url.pathname === '/api/game/register') {
          const body = await readBody(req)
          const name = String(body.name || '').trim().slice(0, 32)
          const email = String(body.email || '').trim().toLowerCase().slice(0, 120)

          if (name.length < 2) return sendJson(res, 400, { error: 'Informe um nome com pelo menos 2 letras' })

          const store = await readStore()
          const now = new Date().toISOString()
          let player = email ? store.players.find((item) => item.email === email) : null

          if (player) {
            player.name = name
            player.updatedAt = now
          } else {
            player = {
              id: randomUUID(),
              name,
              email,
              highScore: 0,
              createdAt: now,
              updatedAt: now,
            }
            store.players.push(player)
          }

          await writeStore(store)
          await broadcast()
          return sendJson(res, 200, { player: publicPlayer(player), ranking: leaderboardFrom(store) })
        }

        if (req.method === 'POST' && url.pathname === '/api/game/score') {
          const body = await readBody(req)
          const playerId = String(body.playerId || '')
          const score = Math.max(0, Math.floor(Number(body.score) || 0))

          const store = await readStore()
          const player = store.players.find((item) => item.id === playerId)
          if (!player) return sendJson(res, 404, { error: 'Cadastre-se antes de enviar score' })

          if (score > (player.highScore || 0)) {
            player.highScore = score
            player.updatedAt = new Date().toISOString()
            store.scores.push({ playerId, score, createdAt: player.updatedAt })
            await writeStore(store)
            await broadcast()
          }

          return sendJson(res, 200, { player: publicPlayer(player), ranking: leaderboardFrom(store) })
        }

        return sendJson(res, 404, { error: 'Rota nao encontrada' })
      } catch (error) {
        return sendJson(res, 500, { error: error.message || 'Erro interno' })
      }
    })
  }

  return {
    name: 'nelly-jellies-game-api',
    configureServer: attach,
    configurePreviewServer: attach,
  }
}

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
  plugins: [
    createGameApiPlugin(),
    react(),
  ]
});
