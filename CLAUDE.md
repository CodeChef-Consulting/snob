# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Database Management
```bash
# Start PostgreSQL container (runs on port 5434 to avoid conflicts)
npm run docker:up

# Push schema changes to database
npm run db:push

# Generate Prisma client and tRPC routers (includes post-generation fix script)
npm run db:generate

# Open Prisma Studio GUI
npm run db:studio

# Complete setup (start Docker + initialize database)
npm run db:setup
```

### Running Scripts
```bash
# Development mode with hot reload
npm run dev

# Fetch Reddit posts (multiple modes supported)
tsx src/scripts/fetchPosts.ts [mode] [searchQuery] [timeframe]
# Modes: new (default), top, controversial, search
# Example: tsx src/scripts/fetchPosts.ts search "tacos" month

# Fetch comments for posts
npm run fetch-comments

# Other utility scripts
npm run count-posts
npm run backfill-sessions
```

### Environment Setup
- Uses **dotenvx** for encrypted environment variables
- All `db:*` commands automatically run with `dotenvx run --`
- Database URL: `postgresql://user:password@localhost:5434/snob?schema=public`

### Database Backup
To create a backup of the database:
```bash
# Find the container running on port 5434
CONTAINER_ID=$(docker ps --filter "publish=5434" --format "{{.ID}}")

# Create backup with timestamp
BACKUP_FILE="backups/snob_backup_$(date +%Y%m%d_%H%M%S).dump"
docker exec $CONTAINER_ID pg_dump -U user -d snob --format=custom -f /tmp/backup.dump
docker cp $CONTAINER_ID:/tmp/backup.dump "$BACKUP_FILE"
```

To restore from a backup:
```bash
CONTAINER_ID=$(docker ps --filter "publish=5434" --format "{{.ID}}")
docker cp backups/snob_backup_YYYYMMDD_HHMMSS.dump $CONTAINER_ID:/tmp/restore.dump
docker exec $CONTAINER_ID pg_restore -U user -d snob --clean /tmp/restore.dump
```

## Architecture Overview

### Two-Phase Scraping System
The application uses a **separated post/comment scraping** architecture to optimize Reddit API usage:

1. **Phase 1 - Post Scraping** ([fetchPosts.ts](src/scripts/fetchPosts.ts)):
   - Fetches posts in batches of 100, up to 1000 total
   - Processes post metadata and media files
   - Creates `ScrapingSession` records to track what's been scraped
   - **Does NOT fetch comments** (sets `commentsFullyScraped: false`)
   - Supports multiple modes: `new`, `top`, `controversial`, `search`
   - Skip logic: Won't re-scrape if a completed session exists for the same mode/timeframe/query

2. **Phase 2 - Comment Scraping** ([fetchComments.ts](src/scripts/fetchComments.ts)):
   - Re-fetches posts with full comment trees (1 API call per post)
   - Recursively collects all nested replies
   - Updates posts with `commentsFullyScraped: true`
   - Processes comment media from body text
   - Uses 2-second delays between posts to avoid rate limiting

**Why separated?** This allows fetching many posts quickly, then selectively fetching comments for interesting posts without hitting API limits.

### Code Generation Pipeline
The project uses **three generators** that work together:

1. **Prisma Client** - Standard database client
2. **prisma-trpc-generator** - Auto-generates tRPC routers from schema
3. **prisma-zod-generator** - Auto-generates Zod validation schemas

**Post-Generation Fix**: [scripts/fix-generated-code.js](scripts/fix-generated-code.js) runs automatically after `db:generate` to add compatibility aliases between zod and trpc generators (specifically for upsert schemas).

### Router Architecture
- **Generated routers**: [src/generated/routers/](src/generated/routers/) - Auto-created CRUD operations for all models
- **Custom routers**: [src/myRouters/](src/myRouters/) - Hand-written routers with specialized logic
  - `post.ts`: Pagination, filtering by subreddit, comment counts
  - `comment.ts`: Nested replies, filtering by post
  - `file.ts`: Media file operations
- **Merged router**: [src/myRouters/index.ts](src/myRouters/index.ts) combines both generated and custom routers using `t.mergeRouters()`

### Database Schema Key Points
- **ScrapingSession**: Tracks post scraping progress with `mode`, `timeframe`, `searchQuery`
  - `completed`: Marks when all posts are scraped
  - `postsScraped`: Count of posts processed
  - Does NOT track comment scraping (comments tracked per-post)

- **Post**:
  - `commentsLastScrapedAt`: When comments were fetched
  - `commentsFullyScraped`: Boolean indicating all nested comments collected
  - `scrapingSessionId`: Links to the session that fetched this post

- **Comment**:
  - Self-referential `parentCommentId` for nested replies
  - `depth`: How deep in the reply chain
  - Both post and comment can have many-to-many `restaurantsMentioned`

- **File**:
  - Stores media URLs from posts and comments
  - Unique constraints on `(postId, fileUrl)` and `(commentId, fileUrl)`
  - Contains `metadata` JSON field for source-specific data

### Media Extraction
[src/utils/reddit.ts](src/utils/reddit.ts) provides specialized extractors:
- `extractMediaUrls(post)`: Handles galleries, videos, images, preview images
- `extractMediaFromCommentBody(body)`: Regex-based URL extraction from markdown

## Important Patterns

### Batch Operations
Scripts use aggressive batching to minimize database round-trips:
- `createMany()` with `skipDuplicates: true` for new records
- Parallel `Promise.all()` for updates
- Pre-fetch existing records to separate new vs. update operations

### Session-Based Deduplication
Scripts check for existing completed sessions before scraping to avoid duplicate API calls:
```typescript
const existingSession = await prisma.scrapingSession.findFirst({
  where: { subreddit, mode, timeframe, searchQuery, completed: true },
  orderBy: { createdAt: 'desc' },
});
```

### Error Resilience
- API errors break pagination loop gracefully
- Database operations use upserts and `skipDuplicates`
- Rate limiting handled with configurable delays
