# Snob

Reddit restaurant data scraper with Prisma and tRPC.

## Prerequisites

- Node.js 20+
- Docker and Docker Compose
- dotenvx (for environment variable encryption)

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Database Setup

The project uses PostgreSQL running in Docker on port 5434.

```bash
# Start PostgreSQL container
pnpm docker:up

# Initialize database schema
pnpm db:push

# Or do both in one command
pnpm db:setup
```

### 3. Environment Variables

Environment variables are encrypted using dotenvx. The `.env` file contains:

- Reddit API credentials (encrypted)
- Database URL: `postgresql://user:password@localhost:5434/snob?schema=public`

## Available Scripts

### Docker Commands

- `pnpm docker:up` - Start PostgreSQL container
- `pnpm docker:down` - Stop PostgreSQL container
- `pnpm docker:logs` - View PostgreSQL logs
- `pnpm docker:restart` - Restart PostgreSQL container

### Database Commands

- `pnpm db:setup` - Start Docker and initialize database
- `pnpm db:push` - Push schema changes to database
- `pnpm db:migrate` - Run database migrations
- `pnpm db:generate` - Generate Prisma client and tRPC routers
- `pnpm db:studio` - Open Prisma Studio (database GUI)

### Development

- `pnpm dev` - Run development server with hot reload
- `pnpm build` - Build TypeScript
- `pnpm fetch-comments` - Fetch comments from Reddit

## Database Access

Connect to the database directly:

```bash
psql "postgresql://user:password@localhost:5434/snob"
```

Or use Prisma Studio:

```bash
pnpm db:studio
```

## Project Structure

```
snob/
├── src/
│   ├── generated/      # Auto-generated Prisma and tRPC files
│   └── index.ts        # Main application entry
├── prisma/
│   └── schema.prisma   # Database schema
├── docker-compose.yml  # PostgreSQL container config
└── .env                # Environment variables (encrypted)
```

## Notes

- The PostgreSQL container uses port **5434** to avoid conflicts with local PostgreSQL installations
- All database commands use `dotenvx run --` to decrypt environment variables
- Docker volume `postgres_data` persists database data between container restarts
