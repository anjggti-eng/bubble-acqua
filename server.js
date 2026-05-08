import fs from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const port = Number(process.env.PORT || 5173)
const distDir = path.join(__dirname, 'dist')
const storeDir = path.resolve(process.env.GAME_DATA_DIR || path.join(__dirname, '.game-data'))
const storePath = path.join(storeDir, 'ranking.json')

const emptyStore = () => ({ players: [], scores: [] })

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
}

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
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
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

async function handleApi(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/game/leaderboard') {
    return sendJson(res, 200, { ranking: leaderboardFrom(await readStore()) })
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
    }

    return sendJson(res, 200, { player: publicPlayer(player), ranking: leaderboardFrom(store) })
  }

  return sendJson(res, 404, { error: 'Rota nao encontrada' })
}

async function serveStatic(req, res, url) {
  const requestedPath = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)
  const safePath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, '')
  let filePath = path.join(distDir, safePath)

  if (!filePath.startsWith(distDir)) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  try {
    const stat = await fs.stat(filePath)
    if (stat.isDirectory()) filePath = path.join(filePath, 'index.html')
  } catch {
    filePath = path.join(distDir, 'index.html')
  }

  try {
    const ext = path.extname(filePath).toLowerCase()
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' })
    createReadStream(filePath).pipe(res)
  } catch {
    res.writeHead(404)
    res.end('Not found')
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
    if (url.pathname.startsWith('/api/game')) return await handleApi(req, res, url)
    return await serveStatic(req, res, url)
  } catch (error) {
    return sendJson(res, 500, { error: error.message || 'Erro interno' })
  }
})

server.listen(port, () => {
  console.log(`Bubble Acqua rodando na porta ${port}`)
})
