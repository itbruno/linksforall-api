# linksforall-api

Lightweight API for managing users, pages and links built with TypeScript, Express and Prisma (MongoDB).

## What you get

- REST endpoints for users, pages and links (see `src/routes.ts`).
- Prisma ORM configured to use MongoDB (`prisma/schema.prisma`).
- Development workflow with TypeScript using `tsx` watch.

## Requirements

- Node.js (recommended >= 18)
- npm or yarn
- A running MongoDB instance and a connection string

Dev dependencies in this project (installed via package manager):

- TypeScript
- tsx (for running TypeScript directly in dev)
- Prisma and @prisma/client

## Environment variables

Create a `.env` file at the project root with at least the following variable:

DATABASE_URL="<your mongodb connection string>"

Example (local MongoDB):

DATABASE_URL="mongodb://localhost:27017/linksforall"

If you use a cloud Mongo (MongoDB Atlas) the URL will be different — keep credentials/URI secure.

## Quick setup

1. Install dependencies

```bash
npm install
```

2. Generate Prisma client

```bash
npx prisma generate
```

3. Push Prisma schema to the database (creates collections)

```bash
npx prisma db push
```

4. (Optional) Seed the database with fake data

```bash
npm run prisma:seed
```

5. Run in development (hot-reload)

```bash
npm run dev
```

The server listens on port `3001` by default (see `src/server.ts`).

## Available npm scripts

- `dev` - run the app in dev mode with `tsx watch src/server.ts`
- `build` - compile TypeScript to `dist/` with `tsc`
- `lint` / `lint:fix` - ESLint tasks
- `prisma:seed` - run the seeding script (`prisma/seed.ts`)

## Prisma + Mongo notes

- The project uses Prisma's MongoDB connector (see `prisma/schema.prisma`).
- Use `npx prisma db push` to sync the schema to your database. `prisma migrate` has limited/varied support for MongoDB — `db push` is recommended for this project.

## Minimal contract

- Inputs: HTTP requests to the routes defined in `src/routes.ts`.
- Outputs: JSON HTTP responses; 500 errors are sent from the generic error handler in `src/server.ts`.
- Error modes: Uncaught exceptions are logged and return a 500 response.

## Common troubleshooting

- "PrismaClientNotFoundError" or client generation errors — run:

  ```bash
  npx prisma generate
  ```

- If collections do not appear after generation, run:

  ```bash
  npx prisma db push
  ```

- If seeding fails, ensure `DATABASE_URL` is correct and reachable, then run:

  ```bash
  npm run prisma:seed
  ```
