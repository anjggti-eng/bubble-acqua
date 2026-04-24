# Backend BarberApp

Backend Node.js + Express + Postgres para substituir a Base44.

## Requisitos

1. Node.js 20+
2. Um Postgres acessivel por `DATABASE_URL`

## Configuracao

1. Copie `.env.example` para `.env`
2. Preencha `DATABASE_URL` com o banco do Coolify
3. Instale as dependencias com `npm install`
4. Rode a migracao com `npm run db:migrate`
5. Inicie com `npm run dev`

## Variaveis de ambiente

- `PORT`: porta do servidor
- `DATABASE_URL`: conexao do Postgres
- `JWT_SECRET`: segredo para JWT
- `APP_URL`: URL publica da API
- `CORS_ORIGIN`: frontend permitido
- `UPLOAD_DIR`: pasta local dos uploads

## Rotas principais

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PATCH /api/auth/me`
- `POST /api/uploads`
- `GET /api/barbershops`
- `GET /api/services`
- `GET /api/appointments`
- `GET /api/reviews`
- `GET /api/gallery-photos`
- `GET /api/coupons`

## Deploy com Coolify

1. Coloque este projeto em um repositorio Git proprio
2. Crie um novo servico no Coolify apontando para a pasta `backend`
3. Se preferir, use o `Dockerfile` da pasta `backend`
4. Configure as variaveis de ambiente
5. Build command: `npm install`
6. Start command: `npm run start:prod`
7. Porta exposta: `3001`

## Variaveis minimas no Coolify

- `DATABASE_URL`
- `JWT_SECRET`
- `APP_URL`
- `CORS_ORIGIN`
- `UPLOAD_DIR=uploads`

## Observacao importante

Hoje esta pasta ainda nao esta ligada a um repositorio Git proprio. O `git origin` atual da maquina aponta para outro projeto, entao antes do deploy final o ideal e criar um repositorio separado para este app.
