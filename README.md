# linksforall-api

REST API for managing users, pages, and links with authentication and role-based authorization. Built with **Clean Architecture** principles, following **SOLID** design patterns with comprehensive test coverage.


### Key Features
- ✅ **Modular Controllers**: Each operation in its own file with dedicated tests
- ✅ **Clean Architecture**: Separation of concerns (controllers → use cases → repositories)
- ✅ **SOLID Principles**: Dependency injection, single responsibility
- ✅ **Comprehensive Testing**: Unit tests + E2E tests with Vitest
- ✅ **Type Safety**: Full TypeScript with Zod validation
- ✅ **Security**: JWT authentication, bcrypt hashing, role-based access control

## Tech Stack

- **Runtime**: Node.js (>= 22)
- **Language**: TypeScript
- **Framework**: Express 5
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: Zod
- **Testing**: Vitest (Unit + E2E)
- **Dev Tools**: tsx, ESLint

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

Create a `.env` file at the project root:

```env
# Database connection
DATABASE_URL="postgresql://linksforall:linksforall@localhost:5432/linksforal-development"

# JWT Secret (use a strong random string in production)
JWT_SECRET="your-secret-key-here"

# Optional: Server port (defaults to 3001)
PORT=3001

# Optional: Node environment
NODE_ENV=development
```

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
| `npm test` | Run unit tests |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:e2e:watch` | Run E2E tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |
| `npm run test:ui` | Open Vitest UI for interactive testing |
| `npm run prisma:seed` | Seed database with fake data |
| `npm run prisma:studio` | Open Prisma Studio (database GUI) |

## Testing

The project has comprehensive test coverage with two test suites:

### Unit Tests
Test business logic in isolation using in-memory repositories:

```bash
# Run once
npm test

# Watch mode for TDD
npm run test:watch
```

### E2E Tests
Test the complete HTTP flow with real database:

```bash
# Run once
npm run test:e2e

# Watch mode
npm run test:e2e:watch
```

### Coverage Report

```bash
npm run test:coverage
```

### Interactive Testing UI

```bash
npm run test:ui
```

## API Endpoints

### Authentication
- `POST /auth` - Authenticate user and get JWT token

### Users
- `POST /users` - Create new user
- `GET /users/:id` - Get user profile (authenticated)
- `PATCH /users/:id` - Update user (authenticated, owner or admin)
- `DELETE /users/:id` - Delete user (authenticated, owner or admin)

### Pages
- `POST /pages` - Create new page (authenticated)
- `GET /pages/:id` - Get page by ID (authenticated)
- `GET /pages/:id/links` - Get all links from a page (authenticated)
- `PUT /pages/:id` - Update page (authenticated)
- `DELETE /pages/:id` - Delete page (authenticated)

### Links
- `GET /links/:id` - Get link by ID
- `POST /links` - Create new link
- `PUT /links/:id` - Update link
- `DELETE /links/:id` - Delete link

## Prisma Commands

| Command | Description |
|---------|-------------|
| `npx prisma studio` | Open Prisma Studio (database GUI) |
| `npx prisma migrate dev` | Create and apply migrations |
| `npx prisma migrate deploy` | Apply migrations in production |
| `npx prisma db push` | Push schema changes (no migration files) |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma db seed` | Run seed script |

## Authentication Flow

1. User registers via `POST /users`
2. User authenticates via `POST /auth` with email/password
3. Server returns JWT token
4. Client includes token in `Authorization: Bearer <token>` header
5. Protected routes verify token via `authMiddleware`

# Watch mode for TDD
npm run test:watch

## License

ISC
