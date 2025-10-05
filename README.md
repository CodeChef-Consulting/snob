# Reddit Scraper

Reddit restaurant data scraper with Prisma and tRPC.

## Prerequisites

- Node.js 20+
- Docker and Docker Compose
- dotenvx (for environment variable encryption)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

The project uses PostgreSQL running in Docker on port 5434.

```bash
# Start PostgreSQL container
npm run docker:up

# Initialize database schema
npm run db:push

# Or do both in one command
npm run db:setup
```

### 3. Environment Variables

Environment variables are encrypted using dotenvx. The `.env` file contains:

- Reddit API credentials (encrypted)
- Database URL: `postgresql://user:password@localhost:5434/reddit_scraper?schema=public`

## Available Scripts

### Docker Commands

- `npm run docker:up` - Start PostgreSQL container
- `npm run docker:down` - Stop PostgreSQL container
- `npm run docker:logs` - View PostgreSQL logs
- `npm run docker:restart` - Restart PostgreSQL container

### Database Commands

- `npm run db:setup` - Start Docker and initialize database
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client and tRPC routers
- `npm run db:studio` - Open Prisma Studio (database GUI)

### Development

- `npm run dev` - Run development server with hot reload
- `npm run build` - Build TypeScript
- `npm run fetch-comments` - Fetch comments from Reddit

## Database Access

Connect to the database directly:

```bash
psql "postgresql://user:password@localhost:5434/reddit_scraper"
```

Or use Prisma Studio:

```bash
npm run db:studio
```

## Project Structure

```
reddit-scraper/
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
