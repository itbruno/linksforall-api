# linksforall-api
**Important**: I'm refactoring this project to follow some good practices, tests and some SOLID principles

REST API for managing users, pages, and links with authentication and role-based authorization. Built with TypeScript, Express, Prisma ORM, and PostgreSQL.


## Tech Stack

- **Runtime**: Node.js (>= 22)
- **Language**: TypeScript
- **Framework**: Express 5
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Testing**: Vitest
- **Dev Tools**: tsx, ESLint

## Environment Variables

Create a `.env` file at the project root:

```env
# Database connection
DATABASE_URL="postgresql://user:password@localhost:5432/database"

# JWT Secret (use a strong random string in production)
JWT_SECRET="your-secret-key-here"

# Optional: Server port (defaults to 3001)
PORT=3001

# Optional: Node environment
NODE_ENV=development
```

**Example for Docker Compose database:**

```env
DATABASE_URL="postgresql://linksforall:linksforall@localhost:5432/linksforal-development"
JWT_SECRET="your-secret-key-here"
```

## Quick Start

### 1. Clone and install dependencies

```bash
npm install
```

### 2. Start PostgreSQL with Docker (recommended)

```bash
docker-compose up -d
```

This starts a PostgreSQL instance on `localhost:5432` with:
- Username: `linksforall`
- Password: `linksforall`
- Database: `linksforal-development`

### 3. Configure environment variables

Create a `.env` file (see Environment Variables section above)

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

Or use `db push` for schema prototyping:

```bash
npx prisma db push
```

### 6. (Optional) Seed the database

```bash
npm run prisma:seed
```

This creates 4 users (1 ADMIN, 3 USER) with pages. All users have password: `fakepassword`

### 7. Start development server

```bash
npm run dev
```

The server runs on `http://localhost:3001` by default.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Compile TypeScript to `dist/` directory |
| `npm run lint` | Run ESLint on source files |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |
| `npm run test:ui` | Open Vitest UI for interactive testing |
| `npm run prisma:seed` | Seed database with fake data |


## Prisma Commands

| Command | Description |
|---------|-------------|
| `npx prisma studio` | Open Prisma Studio (database GUI) |
| `npx prisma migrate dev` | Create and apply migrations |
| `npx prisma migrate deploy` | Apply migrations in production |
| `npx prisma db push` | Push schema changes (no migration files) |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma db seed` | Run seed script |

## Testing

The project uses Vitest for testing with coverage support:

```bash
# Run all tests
npm test

# Watch mode for TDD
npm run test:watch

# Generate coverage report
npm run test:coverage

# Open interactive UI
npm run test:ui
```

## License

ISC
