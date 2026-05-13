# Bubble Acqua

demo:https://bubble-acqua.vercel.app/

Bubble Acqua e um jogo casual de merge com fisica, visual aquatico e sistema de ranking em tempo real. O jogador faz um cadastro simples, joga, melhora sua pontuacao e aparece em um leaderboard sincronizado.

## Destaques

- Jogo completo em navegador, com experiencia fluida e responsiva.
- Cadastro simples de jogador com nome e e-mail.
- Ranking sincronizado por API propria.
- Tela de entrada com creditos Orbitan & Noctus.co.
- Visual rebrandizado para Bubble Acqua.
- Pronto para deploy em PaaS/Coolify com Node.js.

## Rodar Localmente

```bash
npm install
npm run dev
```

Depois acesse:

```text
http://localhost:5173
```

## Rodar Em Producao

```bash
npm install
npm run build
npm start
```

O servidor de producao esta em `server.js`. Ele entrega os arquivos do `dist` e tambem responde as rotas da API do jogo.

## Rotas Da API

- `GET /api/game/leaderboard`
- `GET /api/game/player?id=...`
- `POST /api/game/register`
- `POST /api/game/score`

## Deploy No Coolify

Use a opcao Dockerfile ou Node.js. A opcao Dockerfile e a mais indicada para manter a API do ranking ativa junto com o jogo.

Se usar Dockerfile:

```text
Dockerfile location: /Dockerfile
Port: 5173
```

Se usar Node.js/Nixpacks:

Build command:

```bash
npm install && npm run build
```

Start command:

```bash
npm start
```

Variaveis recomendadas:

```bash
NODE_ENV=production
GAME_DATA_DIR=/app/.game-data
```

Crie tambem um volume persistente em:

```text
/app/.game-data
```

Isso mantem cadastros e pontuacoes salvos mesmo quando o app reiniciar.

## Creditos

Produto desenvolvido pela Orbitan & Noctus.co.
