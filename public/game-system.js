const API = '/api/game'
const PLAYER_KEY = 'nelly_game_player'
const HIGH_SCORE_KEY = 'nelly_high_score'

let currentPlayer = null
let ranking = []
let lastSubmittedScore = 0

const root = document.createElement('div')
root.id = 'game-account-system'
root.innerHTML = `
  <style>
    #game-account-system {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2147483000;
      font-family: "Fredoka", system-ui, sans-serif;
      color: white;
      --aqua: #22d3ee;
      --mint: #86efac;
      --blue: #2563eb;
      --panel: rgba(3, 14, 34, 0.88);
    }
    @keyframes game-soft-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    @keyframes game-ring {
      0% { transform: scale(0.86); opacity: 0.54; }
      70%, 100% { transform: scale(1.55); opacity: 0; }
    }
    @keyframes game-panel-in {
      from { opacity: 0; transform: translateY(18px) scale(0.94); filter: blur(8px); }
      to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    }
    @keyframes game-list-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes game-shimmer {
      from { background-position: 0% 50%; }
      to { background-position: 200% 50%; }
    }
    @keyframes game-score-pop {
      0% { transform: scale(1); }
      38% { transform: scale(1.08); }
      100% { transform: scale(1); }
    }
    @keyframes game-credit-in {
      0% { opacity: 0; transform: translateY(14px) scale(.96); filter: blur(10px); }
      18%, 72% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      100% { opacity: 0; transform: translateY(-10px) scale(1.02); filter: blur(8px); visibility: hidden; }
    }
    @keyframes game-credit-scan {
      from { transform: translateX(-120%) rotate(12deg); opacity: 0; }
      35% { opacity: .8; }
      to { transform: translateX(160%) rotate(12deg); opacity: 0; }
    }
    .game-credit-splash {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 22px;
      pointer-events: none;
      background:
        radial-gradient(circle at 50% 34%, rgba(34, 211, 238, .18), transparent 32%),
        linear-gradient(180deg, rgba(0, 7, 18, .92), rgba(0, 5, 16, .55));
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      animation: game-credit-in 5.2s cubic-bezier(.2,.85,.22,1) forwards;
    }
    .game-credit-card {
      position: relative;
      width: min(420px, 90vw);
      overflow: hidden;
      border-radius: 24px;
      border: 1px solid rgba(53, 242, 180, .22);
      background: rgba(0, 12, 18, .72);
      box-shadow: 0 28px 80px rgba(0, 0, 0, .56), 0 0 40px rgba(53, 242, 180, .12);
      text-align: center;
      padding: 18px 18px 20px;
    }
    .game-credit-card::after {
      content: "";
      position: absolute;
      top: -20%;
      bottom: -20%;
      width: 90px;
      left: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
      animation: game-credit-scan 2.8s ease-in-out 1.1s both;
    }
    .game-credit-card img {
      width: min(280px, 72vw);
      max-height: 220px;
      object-fit: contain;
      border-radius: 14px;
      display: block;
      margin: 0 auto 10px;
    }
    .game-credit-kicker {
      display: block;
      color: rgba(134, 239, 172, .86);
      font-size: 10px;
      font-weight: 900;
      letter-spacing: .16em;
      text-transform: uppercase;
    }
    .game-credit-text {
      margin: 7px 0 0;
      color: rgba(255,255,255,.92);
      font-size: 15px;
      font-weight: 900;
      line-height: 1.25;
      text-transform: uppercase;
      text-shadow: 0 2px 12px rgba(0,0,0,.45);
    }
    .game-topbar {
      position: absolute;
      top: max(12px, env(safe-area-inset-top));
      right: max(12px, env(safe-area-inset-right));
      display: flex;
      gap: 8px;
      align-items: center;
      pointer-events: auto;
      animation: game-soft-float 4.8s ease-in-out infinite;
    }
    .game-title-badge {
      position: absolute;
      top: max(12px, env(safe-area-inset-top));
      left: max(12px, env(safe-area-inset-left));
      pointer-events: none;
      padding: 9px 13px 10px;
      border-radius: 999px;
      border: 1px solid rgba(125, 241, 255, .28);
      background:
        radial-gradient(circle at 20% 12%, rgba(255,255,255,.3), transparent 30%),
        linear-gradient(135deg, rgba(3, 20, 48, .72), rgba(9, 54, 82, .58));
      color: white;
      box-shadow: 0 14px 30px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.16);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      text-shadow: 0 2px 8px rgba(0,0,0,.38);
      animation: game-soft-float 5.2s ease-in-out infinite;
    }
    .game-title-badge strong {
      display: block;
      font-size: 15px;
      line-height: 1;
      font-weight: 900;
    }
    .game-title-badge span {
      display: block;
      margin-top: 2px;
      font-size: 9px;
      line-height: 1;
      font-weight: 900;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: rgba(134, 239, 172, .88);
    }
    .game-chip,
    .game-action {
      border: 1px solid rgba(255, 255, 255, 0.22);
      background: linear-gradient(180deg, rgba(9, 28, 58, 0.8), rgba(2, 9, 26, 0.72));
      color: white;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.16);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
    }
    .game-chip {
      min-width: 96px;
      border-radius: 999px;
      padding: 8px 11px;
      line-height: 1.05;
      text-align: right;
    }
    .game-chip.is-pop {
      animation: game-score-pop 420ms cubic-bezier(.2, .85, .22, 1.25);
    }
    .game-chip strong {
      display: block;
      max-width: 126px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
    }
    .game-chip span {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.72);
    }
    .game-action {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 19px;
      font-weight: 800;
      cursor: pointer;
      position: relative;
      overflow: visible;
      background:
        radial-gradient(circle at 35% 25%, rgba(255,255,255,.44), transparent 28%),
        linear-gradient(135deg, rgba(34, 211, 238, 0.9), rgba(134, 239, 172, 0.9));
      color: #031628;
      text-shadow: 0 1px 0 rgba(255,255,255,.35);
    }
    .game-action::before,
    .game-action::after {
      content: "";
      position: absolute;
      inset: -6px;
      border-radius: inherit;
      border: 1px solid rgba(134, 239, 172, 0.42);
      animation: game-ring 2.8s ease-out infinite;
      pointer-events: none;
    }
    .game-action::after {
      animation-delay: 1.35s;
    }
    .game-action:hover {
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 18px 34px rgba(34, 211, 238, 0.28), 0 10px 28px rgba(0,0,0,.36);
    }
    .game-action:active {
      transform: translateY(0) scale(0.96);
    }
    .game-modal-wrap {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      background:
        radial-gradient(circle at 50% 12%, rgba(34, 211, 238, 0.2), transparent 28%),
        rgba(0, 5, 16, 0.56);
      backdrop-filter: blur(0);
      -webkit-backdrop-filter: blur(0);
      transition: opacity 260ms ease, visibility 260ms ease, backdrop-filter 260ms ease;
    }
    .game-modal-wrap.is-open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    }
    .game-modal-wrap::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(115deg, transparent 0 35%, rgba(255,255,255,.08) 42%, transparent 50% 100%),
        radial-gradient(circle at 20% 82%, rgba(134,239,172,.15), transparent 28%);
      background-size: 240% 100%, 100% 100%;
      animation: game-shimmer 7s linear infinite;
      pointer-events: none;
    }
    .game-modal {
      width: min(390px, 100%);
      max-height: min(720px, calc(100dvh - 36px));
      overflow: hidden;
      border-radius: 20px;
      border: 1px solid rgba(125, 241, 255, 0.28);
      background:
        radial-gradient(circle at 16% 4%, rgba(125, 241, 255, 0.3), transparent 34%),
        radial-gradient(circle at 86% 95%, rgba(134, 239, 172, 0.18), transparent 32%),
        linear-gradient(180deg, rgba(5, 28, 62, 0.96), rgba(0, 8, 24, 0.98));
      box-shadow: 0 26px 80px rgba(0, 0, 0, 0.66), inset 0 1px 0 rgba(255,255,255,.14);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      position: relative;
      transform-origin: center;
    }
    .game-modal-wrap.is-open .game-modal {
      animation: game-panel-in 320ms cubic-bezier(.2, .85, .22, 1.12) both;
    }
    .game-modal::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(120deg, transparent, rgba(255,255,255,.08), transparent),
        radial-gradient(circle at 22% 24%, rgba(255,255,255,.1), transparent 18%);
      background-size: 220% 100%, 100% 100%;
      animation: game-shimmer 8s linear infinite;
      pointer-events: none;
    }
    .game-modal header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 18px 18px 10px;
      position: relative;
    }
    .game-modal h2 {
      margin: 0;
      font-size: 25px;
      line-height: 1;
      text-shadow: 0 8px 26px rgba(34,211,238,.26);
    }
    .game-brand {
      position: absolute;
      left: 18px;
      bottom: -8px;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: rgba(134, 239, 172, .84);
    }
    .game-close {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.08);
      color: white;
      cursor: pointer;
      transition: transform 160ms ease, background 160ms ease;
    }
    .game-close:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: rotate(8deg) scale(1.05);
    }
    .game-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      padding: 0 18px 14px;
      position: relative;
    }
    .game-tabs button {
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
      padding: 9px 10px;
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.72);
      cursor: pointer;
      font-weight: 800;
      transition: transform 170ms ease, color 170ms ease, background 170ms ease, box-shadow 170ms ease;
    }
    .game-tabs button:hover {
      transform: translateY(-1px);
      color: white;
    }
    .game-tabs button.is-active {
      background: linear-gradient(90deg, var(--aqua), var(--mint));
      color: #06172c;
      border-color: transparent;
      box-shadow: 0 10px 22px rgba(34, 211, 238, 0.18);
    }
    .game-panel {
      display: none;
      padding: 0 18px 18px;
      position: relative;
    }
    .game-panel.is-active {
      display: block;
      animation: game-list-in 220ms ease both;
    }
    .game-field {
      display: grid;
      gap: 7px;
      margin-bottom: 12px;
    }
    .game-field label {
      font-size: 12px;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.72);
      text-transform: uppercase;
    }
    .game-field input {
      width: 100%;
      box-sizing: border-box;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.1);
      color: white;
      padding: 13px 12px;
      font: inherit;
      outline: none;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
      transition: border-color 170ms ease, box-shadow 170ms ease, transform 170ms ease, background 170ms ease;
    }
    .game-field input:focus {
      border-color: rgba(94, 234, 212, 0.8);
      box-shadow: 0 0 0 3px rgba(94, 234, 212, 0.16);
      background: rgba(255, 255, 255, 0.14);
      transform: translateY(-1px);
    }
    .game-submit {
      width: 100%;
      border: 0;
      border-radius: 14px;
      padding: 13px 16px;
      background: linear-gradient(90deg, var(--aqua), var(--mint), #60a5fa, var(--aqua));
      background-size: 240% 100%;
      color: #031628;
      font: inherit;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 0 12px 24px rgba(34, 211, 238, 0.2);
      transition: transform 170ms ease, box-shadow 170ms ease;
      animation: game-shimmer 5.6s linear infinite;
    }
    .game-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 18px 32px rgba(34, 211, 238, 0.27);
    }
    .game-submit:active {
      transform: translateY(0) scale(.98);
    }
    .game-message {
      min-height: 20px;
      margin: 10px 0 0;
      color: #8affd5;
      font-size: 13px;
      font-weight: 700;
    }
    .game-ranking {
      max-height: 430px;
      overflow: auto;
      padding-right: 4px;
      scrollbar-width: thin;
      scrollbar-color: rgba(34, 211, 238, .55) rgba(255,255,255,.08);
    }
    .game-row {
      display: grid;
      grid-template-columns: 34px 1fr auto;
      gap: 10px;
      align-items: center;
      min-height: 44px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-weight: 800;
      border-radius: 12px;
      padding: 3px 8px 3px 0;
      animation: game-list-in 280ms ease both;
      transition: background 160ms ease, transform 160ms ease;
    }
    .game-row:hover {
      background: rgba(255, 255, 255, 0.07);
      transform: translateX(2px);
    }
    .game-row small {
      display: block;
      color: rgba(255, 255, 255, 0.55);
      font-size: 11px;
      font-weight: 700;
    }
    .game-rank {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, rgba(34,211,238,.28), rgba(134,239,172,.18));
      color: #c7f9ff;
      font-size: 12px;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.18);
    }
    .game-row:nth-child(1) .game-rank {
      background: linear-gradient(135deg, #fde68a, #fbbf24);
      color: #3b2600;
    }
    .game-row:nth-child(2) .game-rank {
      background: linear-gradient(135deg, #e5e7eb, #94a3b8);
      color: #0f172a;
    }
    .game-row:nth-child(3) .game-rank {
      background: linear-gradient(135deg, #fdba74, #f97316);
      color: #351300;
    }
    .game-empty {
      padding: 26px 0;
      color: rgba(255, 255, 255, 0.68);
      text-align: center;
      font-weight: 700;
    }
    @media (max-width: 480px) {
      .game-topbar {
        top: max(8px, env(safe-area-inset-top));
        right: max(8px, env(safe-area-inset-right));
      }
      .game-chip {
        display: none;
      }
      .game-title-badge {
        padding: 8px 10px;
      }
      .game-title-badge strong {
        font-size: 13px;
      }
      .game-title-badge span {
        display: none;
      }
      .game-modal h2 {
        font-size: 22px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      #game-account-system *,
      #game-account-system *::before,
      #game-account-system *::after {
        animation-duration: 1ms !important;
        transition-duration: 1ms !important;
      }
    }
  </style>
  <div class="game-title-badge">
    <strong>Bubble Acqua</strong>
    <span>Merge the tide</span>
  </div>
  <div class="game-credit-splash" data-credit-splash>
    <div class="game-credit-card">
      <img src="/orbitan-logo.png" alt="Orbitan" />
      <span class="game-credit-kicker">Produto desenvolvido pela</span>
      <p class="game-credit-text">Orbitan &amp; Noctus.co</p>
    </div>
  </div>
  <div class="game-topbar">
    <div class="game-chip">
      <strong data-player-name>Visitante</strong>
      <span data-player-score>Score 0</span>
    </div>
    <button class="game-action" data-open-account title="Cadastro e ranking" aria-label="Cadastro e ranking">🏆</button>
  </div>
  <div class="game-modal-wrap" data-modal>
    <section class="game-modal" role="dialog" aria-modal="true" aria-labelledby="game-modal-title">
      <header>
        <h2 id="game-modal-title">Ranking real</h2>
        <span class="game-brand">Bubble Acqua</span>
        <button class="game-close" data-close aria-label="Fechar">×</button>
      </header>
      <nav class="game-tabs">
        <button data-tab="register" class="is-active">Cadastro</button>
        <button data-tab="ranking">Ranking</button>
      </nav>
      <div class="game-panel is-active" data-panel="register">
        <form data-register-form>
          <div class="game-field">
            <label for="game-player-name">Nome</label>
            <input id="game-player-name" name="name" autocomplete="name" maxlength="32" required placeholder="Seu nome no ranking" />
          </div>
          <div class="game-field">
            <label for="game-player-email">Email opcional</label>
            <input id="game-player-email" name="email" type="email" autocomplete="email" maxlength="120" placeholder="para recuperar depois" />
          </div>
          <button class="game-submit" type="submit">Salvar cadastro</button>
          <p class="game-message" data-message></p>
        </form>
      </div>
      <div class="game-panel" data-panel="ranking">
        <div class="game-ranking" data-ranking></div>
      </div>
    </section>
  </div>
`

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(root)
  bindUi()
  startBrandTextGuard()
  boot()
})

function startBrandTextGuard() {
  const communityGoalMarkers = [
    'Community Goal',
    'Community Goal Complete',
    'Merge Rainbow + Rainbow',
    'Coral Tide Unlocked',
  ]

  const removeCommunityGoal = (node = document.body) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE || node.id === 'game-account-system') return

    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
    const textNodes = []
    while (walker.nextNode()) textNodes.push(walker.currentNode)

    for (const textNode of textNodes) {
      const candidate = textNode.parentElement
      if (!candidate || candidate.closest('#game-account-system')) continue
      const text = textNode.nodeValue || ''
      if (!communityGoalMarkers.some((marker) => text.includes(marker))) continue

      const card = candidate.closest('.relative.z-40') || candidate.closest('[class*="glass"]')
      if (card && card.id !== 'root' && card !== document.body && !card.closest('#game-account-system')) card.remove()
      return
    }
  }

  const replaceBrandText = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const next = node.nodeValue
        .replace(/Nelly Jellies/gi, 'Bubble Acqua')
        .replace(/NELLY/g, 'BUBBLE')
        .replace(/JELLIES/g, 'ACQUA')
        .replace(/Nelly/g, 'Bubble')
        .replace(/Jellies/g, 'Acqua')

      if (next !== node.nodeValue) node.nodeValue = next
      return
    }

    if (node.nodeType !== Node.ELEMENT_NODE || node.id === 'game-account-system') return
    for (const child of node.childNodes) replaceBrandText(child)
  }

  replaceBrandText(document.body)
  removeCommunityGoal()
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        replaceBrandText(node)
        removeCommunityGoal(node)
      }
      if (mutation.type === 'characterData') {
        replaceBrandText(mutation.target)
        removeCommunityGoal(mutation.target.parentElement)
      }
    }
  })

  observer.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true,
  })

  const cleanupTimer = setInterval(removeCommunityGoal, 350)
  setTimeout(() => clearInterval(cleanupTimer), 12000)
}

function bindUi() {
  root.querySelector('[data-credit-splash]')?.addEventListener('animationend', (event) => {
    if (event.animationName === 'game-credit-in') event.currentTarget.remove()
  })
  root.querySelector('[data-open-account]').addEventListener('click', () => openModal(currentPlayer ? 'ranking' : 'register'))
  root.querySelector('[data-close]').addEventListener('click', closeModal)
  root.querySelector('[data-modal]').addEventListener('click', (event) => {
    if (event.target.matches('[data-modal]')) closeModal()
  })

  for (const button of root.querySelectorAll('[data-tab]')) {
    button.addEventListener('click', () => setTab(button.dataset.tab))
  }

  root.querySelector('[data-register-form]').addEventListener('submit', async (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    await registerPlayer({
      name: form.get('name'),
      email: form.get('email'),
    })
  })
}

async function boot() {
  const saved = safeJson(localStorage.getItem(PLAYER_KEY))
  if (saved?.id) {
    currentPlayer = saved
    await refreshPlayer()
  } else {
    setTimeout(() => openModal('register'), 900)
  }

  updateChip()
  await refreshRanking()
  listenRanking()
  setInterval(syncScore, 2000)
}

function safeJson(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function openModal(tab = 'register') {
  root.querySelector('[data-modal]').classList.add('is-open')
  setTab(tab)
  if (currentPlayer) {
    root.querySelector('[name="name"]').value = currentPlayer.name || ''
    root.querySelector('[name="email"]').value = currentPlayer.email || ''
  }
}

function closeModal() {
  root.querySelector('[data-modal]').classList.remove('is-open')
}

function setTab(tab) {
  for (const button of root.querySelectorAll('[data-tab]')) {
    button.classList.toggle('is-active', button.dataset.tab === tab)
  }
  for (const panel of root.querySelectorAll('[data-panel]')) {
    panel.classList.toggle('is-active', panel.dataset.panel === tab)
  }
  if (tab === 'ranking') refreshRanking()
}

async function api(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.error || 'Erro de conexao')
  return payload
}

async function registerPlayer(data) {
  const message = root.querySelector('[data-message]')
  message.textContent = 'Salvando...'

  try {
    const payload = await api('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    currentPlayer = payload.player
    localStorage.setItem(PLAYER_KEY, JSON.stringify(currentPlayer))
    ranking = payload.ranking || ranking
    message.textContent = 'Cadastro salvo. Seu score agora entra no ranking.'
    updateChip()
    renderRanking()
    await syncScore()
    setTimeout(() => setTab('ranking'), 650)
  } catch (error) {
    message.textContent = error.message
  }
}

async function refreshPlayer() {
  if (!currentPlayer?.id) return

  try {
    const payload = await api(`/player?id=${encodeURIComponent(currentPlayer.id)}`)
    currentPlayer = payload.player
    localStorage.setItem(PLAYER_KEY, JSON.stringify(currentPlayer))
    lastSubmittedScore = currentPlayer.highScore || 0
  } catch {
    currentPlayer = null
    localStorage.removeItem(PLAYER_KEY)
  }
}

async function refreshRanking() {
  try {
    const payload = await api('/leaderboard')
    ranking = payload.ranking || []
    renderRanking()
  } catch {
    renderRanking('Ranking offline. Verifique se o servidor esta rodando.')
  }
}

function listenRanking() {
  if (!('EventSource' in window)) {
    setInterval(refreshRanking, 5000)
    return
  }

  const events = new EventSource(`${API}/events`)
  events.onmessage = (event) => {
    const payload = safeJson(event.data)
    if (payload?.type === 'leaderboard') {
      ranking = payload.ranking || []
      renderRanking()
      updateChip()
    }
  }
  events.onerror = () => {
    events.close()
    setInterval(refreshRanking, 5000)
  }
}

async function syncScore() {
  if (!currentPlayer?.id) return

  const score = Math.max(0, Math.floor(Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0))
  if (score <= lastSubmittedScore) return

  try {
    const payload = await api('/score', {
      method: 'POST',
      body: JSON.stringify({ playerId: currentPlayer.id, score }),
    })
    currentPlayer = payload.player
    ranking = payload.ranking || ranking
    lastSubmittedScore = currentPlayer.highScore || score
    localStorage.setItem(PLAYER_KEY, JSON.stringify(currentPlayer))
    updateChip()
    renderRanking()
  } catch {
    // Mantem o score local; a proxima rodada tenta sincronizar de novo.
  }
}

function updateChip() {
  const chip = root.querySelector('.game-chip')
  root.querySelector('[data-player-name]').textContent = currentPlayer?.name || 'Visitante'
  root.querySelector('[data-player-score]').textContent = `Score ${Number(currentPlayer?.highScore || 0).toLocaleString('pt-BR')}`
  chip.classList.remove('is-pop')
  requestAnimationFrame(() => chip.classList.add('is-pop'))
}

function renderRanking(error = '') {
  const target = root.querySelector('[data-ranking]')

  if (error) {
    target.innerHTML = `<div class="game-empty">${escapeHtml(error)}</div>`
    return
  }

  if (!ranking.length) {
    target.innerHTML = '<div class="game-empty">Nenhum jogador cadastrado ainda.</div>'
    return
  }

  target.innerHTML = ranking.map((player, index) => `
    <div class="game-row" style="animation-delay: ${Math.min(index * 28, 280)}ms">
      <span class="game-rank">${index + 1}</span>
      <span>${escapeHtml(player.name)}${player.id === currentPlayer?.id ? '<small>Voce</small>' : ''}</span>
      <strong>${Number(player.highScore || 0).toLocaleString('pt-BR')}</strong>
    </div>
  `).join('')
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }[char]))
}
