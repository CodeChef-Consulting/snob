#!/bin/bash
set -e

echo "🚀 Starting migration to Supabase..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Push schema to Supabase
echo -e "\n${BLUE}Step 1: Pushing Prisma schema to Supabase...${NC}"
cd packages/db
dotenvx run -f ../../.env.production -f ../../.env.keys -- npx prisma db push
cd ../..

echo -e "${GREEN}✓ Schema pushed to Supabase${NC}"

# Step 2: Create temporary dump file
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DUMP_FILE="tmp/migration_to_supabase_${TIMESTAMP}.dump"

echo -e "\n${BLUE}Step 2: Creating backup of local database...${NC}"
mkdir -p tmp

# Get the container ID for the database running on port 5434
CONTAINER_ID=$(docker ps --filter "publish=5434" --format "{{.ID}}")

if [ -z "$CONTAINER_ID" ]; then
    echo -e "${RED}Error: No Docker container found on port 5434${NC}"
    echo "Please start your local database with: npm run docker:up"
    exit 1
fi

echo "Found container: $CONTAINER_ID"

# Create dump inside container
docker exec $CONTAINER_ID pg_dump -U user -d snob --format=custom -f /tmp/migration.dump

# Copy dump to local filesystem
docker cp $CONTAINER_ID:/tmp/migration.dump "$DUMP_FILE"

echo -e "${GREEN}✓ Local database backed up to $DUMP_FILE${NC}"

# Step 3: Restore to Supabase
echo -e "\n${BLUE}Step 3: Restoring data to Supabase...${NC}"
echo "This may take a few minutes depending on data size..."

# Use DIRECT_URL for pg_restore (requires direct connection, not pooler)
dotenvx run -f .env.production -f .env.keys -- sh -c '
    # Use DIRECT_URL for restore operations (not pooled connection)
    CONN_STRING="${DIRECT_URL}"

    # Use pg_restore with the full connection string
    PGPASSWORD=$(echo $CONN_STRING | sed -n "s/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p") \
    pg_restore \
        --clean \
        --if-exists \
        --no-owner \
        --no-acl \
        -d "$CONN_STRING" \
        "'"$DUMP_FILE"'"
'

echo -e "${GREEN}✓ Data restored to Supabase${NC}"

# Step 4: Verify migration
echo -e "\n${BLUE}Step 4: Verifying migration...${NC}"

dotenvx run -f .env.production -f .env.keys -- sh -c '
    # Use DATABASE_URL (pooled connection) for queries
    CONN_STRING="${DATABASE_URL}"

    echo "Counting records in Supabase:"
    PGPASSWORD=$(echo $CONN_STRING | sed -n "s/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p") \
    psql "$CONN_STRING" -c "
        SELECT
            '\''Post'\'' as table_name, COUNT(*) as count FROM \"Post\"
        UNION ALL
        SELECT '\''Comment'\'', COUNT(*) FROM \"Comment\"
        UNION ALL
        SELECT '\''File'\'', COUNT(*) FROM \"File\"
        UNION ALL
        SELECT '\''ScrapingSession'\'', COUNT(*) FROM \"ScrapingSession\"
        UNION ALL
        SELECT '\''Restaurant'\'', COUNT(*) FROM \"Restaurant\"
        ORDER BY table_name;
    "
'

echo -e "\n${GREEN}✅ Migration completed successfully!${NC}"
echo -e "${BLUE}Backup saved at: $DUMP_FILE${NC}"
echo -e "${BLUE}You can now use production database with: npm run <command>:prod${NC}"
