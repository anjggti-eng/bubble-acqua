const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

## Projeto exportado da Base44

Este repositorio contem um frontend React/Vite exportado da Base44.

No estado atual, a interface local existe, mas autenticacao, banco e upload de arquivos ainda dependem da Base44.

## Rodar localmente

1. Instale as dependencias com `npm install`
2. Inicie o frontend com `npm run dev`

## Sair da Base44

Os arquivos abaixo foram adicionados para orientar a migracao para uma infraestrutura propria:

- `docs/migracao-base44.md`
- `backend/schema.sql`
- `backend/api-contract.md`
- `backend/README.md`
- `backend/.env.example`

Esses arquivos descrevem:

1. O que ainda esta acoplado a Base44
2. O schema do banco para Postgres
3. O contrato de API necessario para o frontend funcionar sem Base44

## Proximo passo

O projeto agora tambem possui um backend Node.js em `backend/`, com:

1. autenticacao JWT
2. CRUD das entidades do app
3. upload local de arquivos
4. script de migracao para Postgres

Para usar com seu banco do Coolify:

1. copie `backend/.env.example` para `backend/.env`
2. preencha `DATABASE_URL`
3. rode `npm install`
4. rode `npm run db:migrate`
5. rode `npm run dev`

O proximo passo tecnico recomendado e substituir as chamadas `db.auth`, `db.entities` e `db.integrations.Core.UploadFile` do frontend por um cliente HTTP proprio apontando para esse backend.
