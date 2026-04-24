# API Contract

Este contrato cobre as necessidades atuais do frontend exportado da Base44.

## Autenticacao

### `POST /auth/register`

Body:

```json
{
  "email": "cliente@exemplo.com",
  "password": "123456",
  "full_name": "Cliente Exemplo"
}
```

Resposta:

```json
{
  "token": "jwt",
  "user": {
    "id": "uuid",
    "email": "cliente@exemplo.com",
    "full_name": "Cliente Exemplo",
    "role": "user",
    "onboarded": false,
    "profile_photo": null,
    "bio": null
  }
}
```

### `POST /auth/login`

Body:

```json
{
  "email": "cliente@exemplo.com",
  "password": "123456"
}
```

### `GET /auth/me`

Retorna o usuario autenticado.

### `PATCH /auth/me`

Campos aceitos:

```json
{
  "full_name": "Novo Nome",
  "role": "admin",
  "onboarded": true,
  "profile_photo": "https://cdn.exemplo.com/foto.jpg",
  "bio": "Barbeiro ha 10 anos"
}
```

### `POST /auth/logout`

Opcional se voce usar JWT stateless no cliente.

## Uploads

### `POST /uploads`

Entrada:

- `multipart/form-data`
- campo `file`

Resposta:

```json
{
  "file_url": "https://cdn.exemplo.com/uploads/arquivo.jpg"
}
```

## Barbearias

### `GET /barbershops`

Filtros suportados:

- `ownerEmail`
- `ownerProfileId`
- `limit`
- `sort`

### `GET /barbershops/:id`

### `POST /barbershops`

### `PATCH /barbershops/:id`

### `DELETE /barbershops/:id`

## Servicos

### `GET /services`

Filtros suportados:

- `barbershopId`

### `POST /services`

### `PATCH /services/:id`

### `DELETE /services/:id`

## Agendamentos

### `GET /appointments`

Filtros suportados:

- `clientEmail`
- `profileId`
- `barbershopId`
- `status`
- `date`
- `limit`
- `sort`

### `POST /appointments`

Body:

```json
{
  "barbershop_id": "uuid",
  "service_id": "uuid",
  "client_email": "cliente@exemplo.com",
  "client_name": "Cliente",
  "date": "2026-04-24",
  "time": "14:00",
  "status": "pendente",
  "service_name": "Corte",
  "service_price": 35,
  "barbershop_name": "Barbearia Central"
}
```

### `PATCH /appointments/:id`

Exemplo:

```json
{
  "status": "confirmado"
}
```

### `DELETE /appointments/:id`

## Avaliacoes

### `GET /reviews`

Filtros suportados:

- `barbershopId`

### `POST /reviews`

### `PATCH /reviews/:id`

### `DELETE /reviews/:id`

## Galeria

### `GET /gallery-photos`

Filtros suportados:

- `barbershopId`

### `POST /gallery-photos`

### `DELETE /gallery-photos/:id`

## Cupons

### `GET /coupons`

Filtros suportados:

- `barbershopId`
- `active`

### `POST /coupons`

### `PATCH /coupons/:id`

### `DELETE /coupons/:id`

## Observacoes de compatibilidade

1. O frontend atual consulta por email em varios pontos. O backend pode manter esse suporte no inicio.
2. Para evolucao futura, prefira autorizar por `user_id` e buscar dados do usuario pelo token.
3. Onde hoje existe `list('-created_date', 50)` na Base44, trate no backend como `sort=created_at:desc&limit=50`.
