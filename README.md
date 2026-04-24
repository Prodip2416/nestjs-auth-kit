# NestJS Auth Kit

Production-ready NestJS authentication starter — JWT access/refresh tokens, bcrypt password hashing, MySQL + TypeORM, migration support, and seeding. Drop it into any backend project that needs auth from day one.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS 11 |
| Language | TypeScript 5 |
| Database | MySQL 8 |
| ORM | TypeORM 0.3 |
| Auth | JWT (access + refresh token) |
| Hashing | bcrypt |
| Validation | class-validator + class-transformer |
| Package Manager | Yarn |
| Runtime | Node.js >= 18 |

---

## Prerequisites

- Node.js >= 18
- Yarn
- MySQL 8 running locally (or remote)

---

## Installation

```bash
# Clone
git clone https://github.com/your-username/nestjs-auth-kit.git
cd nestjs-auth-kit

# Install dependencies
yarn install

# Setup environment
cp .env.development .env
# Edit .env — set DB credentials and JWT secrets
```

---

## Environment Variables

Create `.env.development` (or `.env`) with:

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=nestjs_revamp
DB_AUTOLOAD=true
DB_SYNC=false

API_VERSION=1.00

JWT_SECRET=your_jwt_secret_key
JWT_TOKEN_AUDIENCE=localhost:3000
JWT_TOKEN_ISSUER=localhost
JWT_ACCESS_TOKEN_TTL=3600       # 1 hour (seconds)
JWT_REFRESH_TOKEN_TTL=86400     # 24 hours (seconds)
```

---

## Commands

### Development

```bash
# Start in watch mode (hot reload)
yarn start:dev

# Start normal
yarn start

# Start in debug mode
yarn start:debug
```

### Production

```bash
# Build
yarn build

# Run built output
yarn start:prod
```

### Database Migrations

```bash
# Generate migration from entity changes
yarn migration:generate MigrationName

# Run all pending migrations
yarn migration:run

# Revert last migration
yarn migration:revert
```

### Seeding

```bash
# Seed initial user data
yarn seed
```

### Code Quality

```bash
# Lint and auto-fix
yarn lint

# Format with Prettier
yarn format
```

### Testing

```bash
# Unit tests
yarn test

# Unit tests in watch mode
yarn test:watch

# Coverage report
yarn test:cov

# End-to-end tests
yarn test:e2e
```

---

## Folder Structure

```
nestjs-auth-kit/
├── src/
│   ├── app.module.ts                        # Root module
│   ├── app.controller.ts                    # Root controller
│   ├── app.service.ts                       # Root service
│   ├── main.ts                              # Bootstrap entry point
│   │
│   ├── auth/                                # Auth module
│   │   ├── auth.controller.ts               # Routes: login, refresh, change-password
│   │   ├── auth.module.ts
│   │   ├── constants/                       # Shared constants (token key names)
│   │   ├── decorators/                      # @Auth() custom decorator
│   │   ├── dtos/                            # SignInDto, RefreshTokenDTO, ChangePasswordDto
│   │   ├── enums/                           # AuthType enum (None, Bearer)
│   │   ├── guards/
│   │   │   ├── access-token/                # JWT access token guard
│   │   │   └── authentication/              # Main auth guard (dispatches by AuthType)
│   │   ├── hashing/                         # bcrypt abstraction
│   │   │   └── providers/                   # HashingProvider (abstract) + BcryptService
│   │   ├── interfaces/                      # ActiveUserData interface
│   │   ├── jwt-config/                      # JWT config factory
│   │   └── providers/                       # AuthService, SignInProvider,
│   │                                        # RefreshTokensProvider, ChangePasswordProvider,
│   │                                        # GenerateTokensProvider
│   │
│   ├── users/                               # Users module
│   │   ├── users.controller.ts              # Routes: list users, create user
│   │   ├── users.module.ts
│   │   ├── user.entity.ts                   # TypeORM User entity
│   │   ├── dtos/                            # CreateUserDTO
│   │   └── providers/                       # UsersService, CreateUserProvider,
│   │                                        # FindOneUserByEmailProvider, UpdateUserProvider
│   │
│   ├── config/
│   │   └── database.config.ts               # TypeORM config via @nestjs/config
│   │
│   └── database/
│       ├── data-source.ts                   # TypeORM DataSource (used by CLI)
│       ├── migrations/                      # TypeORM migration files
│       └── seeds/                           # DB seed scripts
│
├── test/                                    # E2E tests
├── .env.development                         # Dev environment variables
├── .env.production                          # Prod environment variables
├── nest-cli.json
├── tsconfig.json
└── package.json
```

---

## API Reference

Base URL: `http://localhost:3000`

### Authentication Header

All protected routes require:
```
Authorization: Bearer <access_token>
```

Public routes are marked with `@Auth(AuthType.None)`. Default: all routes protected.

---

### Auth APIs

#### `POST /auth/login`
Public. Returns access + refresh tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response `200`:**
```json
{
  "accessToken": "eyJhbGci...",
  "refreshToken": "eyJhbGci..."
}
```

---

#### `POST /auth/refresh-tokens`
Public. Rotate expired access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGci..."
}
```

**Response `200`:**
```json
{
  "accessToken": "eyJhbGci...",
  "refreshToken": "eyJhbGci..."
}
```

---

#### `POST /auth/change-password`
Protected (Bearer token required). Changes password for the authenticated user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "password": "currentPassword",
  "newPassword": "newPassword123"
}
```

**Response `200`:** Success message

---

### User APIs

#### `GET /users`
Protected. Returns all registered users.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response `200`:**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNo": "01700000000",
    "isActive": true,
    "createdAt": "2025-02-25T10:00:00.000Z",
    "updatedAt": "2025-02-25T10:00:00.000Z"
  }
]
```

---

#### `POST /users/create`
Protected. Register a new user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response `201`:** Created user object

---

## API Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/login` | Public | Login, receive tokens |
| POST | `/auth/refresh-tokens` | Public | Rotate access token |
| POST | `/auth/change-password` | Bearer | Change own password |
| GET | `/users` | Bearer | List all users |
| POST | `/users/create` | Bearer | Create new user |

---

## User Entity Schema

| Column | Type | Notes |
|--------|------|-------|
| id | int | Auto PK |
| firstName | varchar(250) | Required |
| lastName | varchar(250) | Optional |
| email | varchar(100) | Unique |
| password | varchar(200) | bcrypt hashed |
| phoneNo | varchar(20) | Optional |
| isActive | boolean | Default: true |
| createdAt | datetime | Auto |
| updatedAt | datetime | Auto |

---

## Auth Flow

```
1. Login
   Client ──POST /auth/login──► SignInProvider
                                  │ verify password (bcrypt)
                                  │ generate access + refresh tokens
                                 ◄┘
                          { accessToken, refreshToken }

2. Protected Request
   Client ──Bearer accessToken──► AuthenticationGuard
                                    │ AccessTokenGuard (JWT verify)
                                    │ decode → ActiveUserData
                                    │ attach to req[REQUEST_USER_KEY]
                                   ◄┘ handler executes

3. Token Refresh
   Client ──POST /auth/refresh-tokens──► RefreshTokensProvider
                                           │ verify refreshToken
                                           │ issue new token pair
                                          ◄┘
                                   { accessToken, refreshToken }
```

---

## Suitable Project Types

This kit is a solid starting point for:

- **REST API Backend** — any backend that needs user authentication from day one
- **SaaS Application** — multi-user apps with login, logout, and token refresh
- **Admin Panel / Dashboard** — backend for React / Vue / Angular admin UIs
- **Mobile App Backend** — token-based auth works with iOS and Android clients
- **Microservice Auth Layer** — deploy as a dedicated auth service
- **Learning Project** — clean NestJS architecture for studying JWT auth patterns
- **API Gateway** — plug the JWT guard into any existing NestJS application

---

## Development Notes

- `ValidationPipe` globally enabled — `whitelist: true`, `forbidNonWhitelisted: true`
- `DB_SYNC=false` — always use migrations, never auto-sync in any environment
- `@Auth(AuthType.None)` — marks route as public; omit for default Bearer protection
- Password hashing abstracted via `HashingProvider` — swap bcrypt with argon2 by changing one binding
- Token TTLs fully configurable via env variables

---

## License

UNLICENSED — private starter kit.
