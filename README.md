# TP Final - Web Services & REST API (NestJS)

## Lancer le projet

```bash
npm install
npm run start:dev
```

## Authentification

Toutes les routes (sauf `/api-docs`) nécessitent un header :

```http
Authorization: Bearer tp-final-secret-token
```

Le token est configurable via `.env`.

## Endpoints Task

- `GET /tasks`
- `GET /tasks/title/:title`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

## Documentation Swagger

Accessible sur :

- `http://localhost:3000/api-docs`


## Auteur

- LukunkuSarah (lukunkusarahkert@gmail.com)
