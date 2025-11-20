# Restaurant Group Migration Plan

## Overview

Migrate from single `Restaurant` model to a two-tier system (`RestaurantGroup` + `RestaurantLocation`) to properly handle chain restaurants and multi-location establishments.

**Problem**: Currently, a Reddit post mentioning "In-N-Out Burger" creates links to 20+ individual location records, fragmenting the sentiment score across all locations.

**Solution**: Group locations under a canonical `RestaurantGroup`, compute scores at the group level, preserve individual location data for geographic queries.

---

## New Schema Design

### RestaurantGroup
Represents a restaurant brand/concept (whether single-location or chain).

```prisma
model RestaurantGroup {
  id              Int      @id @default(autoincrement())
  name            String   @unique // Canonical name: "In-N-Out Burger", "Guisados", "Clark Street Diner"
  rawScore        Float?   // Raw mathematical score from sentiment analysis (unbounded, typically -20 to +20)
  normalizedScore Float?   // Normalized score 0-10, centered at 7 (computed from rawScore distribution)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  locations     RestaurantLocation[]
  posts         Post[]
  comments      Comment[]

  @@index([rawScore])
  @@index([normalizedScore])
  @@index([name])
}
```

### RestaurantLocation
Represents a physical location (address, coordinates, metadata).

```prisma
model RestaurantLocation {
  id              Int              @id @default(autoincrement())
  name            String           // Original name from data source
  address         String?
  city            String?
  state           String?
  zipCode         String?
  latitude        Float?
  longitude       Float?
  source          String           @default("Open Data Portal") // "Open Data Portal" or "Google Places API"
  googlePlaceId   String?          @unique // Google Places ID for API lookups
  lookupAliases   String[]         @default([]) // Array of alternative names for exact matching
  metadata        Json?            // Phone, website, rating, priceLevel, types, etc.
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  group           RestaurantGroup  @relation(fields: [groupId], references: [id])
  groupId         Int              // Every location belongs to exactly one group

  @@index([source])
  @@index([googlePlaceId])
  @@index([groupId])
  @@index([latitude, longitude])
}
```

### Updated Relations

**Replace:**
```prisma
model Post {
  restaurantsMentioned Restaurant[]
}

model Comment {
  restaurantsMentioned Restaurant[]
}
```

**With:**
```prisma
model Post {
  restaurantGroupsMentioned RestaurantGroup[]
}

model Comment {
  restaurantGroupsMentioned RestaurantGroup[]
}
```

---

## Migration Steps

### Phase 1: Schema Changes
1. **Add new models** to `prisma/schema.prisma`
   - Add `RestaurantGroup` model
   - Add `RestaurantLocation` model
   - Add `_PostToRestaurantGroup` relation
   - Add `_CommentToRestaurantGroup` relation

2. **Keep old `Restaurant` model temporarily** for safe migration
   - Don't delete old relations yet
   - Run `npm run db:push` to create new tables

### Phase 2: Data Migration (Smart Grouping Strategy)

**Goal**: Create RestaurantGroups intelligently, prioritizing multi-location chains before single-location restaurants.

#### Step 1: Process Known Chains (LA_CHAIN_RESTAURANTS.md)
Use the canonical chain mapping from `LA_CHAIN_RESTAURANTS.md`:

```typescript
// For each chain in LA_CHAIN_RESTAURANTS.md:
// 1. Create ONE RestaurantGroup with canonical name
// 2. Find all matching Restaurant records (using variations list)
// 3. Create RestaurantLocation for each match, linked to the group
// 4. Copy scores to the group (initially preserve best score from locations)
```

**Example**:
- Canonical: `McDonald's`
- Variations: "Mcdonalds", "Mc Donalds", "McDonald's", "Mcdonalds Restaurant"
- Result: 1 RestaurantGroup + 83 RestaurantLocations

#### Step 2: Fuzzy Match Remaining Multi-Location Restaurants
Use PostgreSQL trigram similarity (pg_trgm) to find similar restaurant names:

```sql
-- Find potential chains not in LA_CHAIN_RESTAURANTS.md
SELECT
  normalized_name,
  COUNT(*) as location_count,
  array_agg(id) as restaurant_ids
FROM (
  SELECT
    id,
    LOWER(TRIM(REGEXP_REPLACE(name, '\s+\d+$', ''))) as normalized_name
  FROM "Restaurant"
  WHERE id NOT IN (SELECT id FROM already_grouped_restaurants)
) normalized
GROUP BY normalized_name
HAVING COUNT(*) >= 3  -- Only consider 3+ locations
ORDER BY COUNT(*) DESC;
```

**Validation**:
- Manual review of fuzzy matches (similarity threshold: 0.85)
- Generate review report: `potential_chains_review.json`
- Apply approved consolidations

#### Step 3: Create Single-Location Groups
For all remaining ungrouped restaurants:

```typescript
// For each remaining Restaurant:
// 1. Create RestaurantGroup with same name
// 2. Create RestaurantLocation linked to that group
// 3. This is a 1:1 mapping (restaurant = group)
```

**Note**: Even single-location restaurants get a RestaurantGroup for consistency.

#### Step 4: Verify Data Integrity
```sql
-- Every location should have a group
SELECT COUNT(*) FROM "RestaurantLocation" WHERE "groupId" IS NULL;
-- Should return 0

-- Check group distribution
SELECT
  COUNT(*) as total_locations,
  COUNT(DISTINCT "groupId") as total_groups,
  SUM(CASE WHEN location_count > 1 THEN 1 ELSE 0 END) as multi_location_groups,
  SUM(CASE WHEN location_count = 1 THEN 1 ELSE 0 END) as single_location_groups
FROM (
  SELECT "groupId", COUNT(*) as location_count
  FROM "RestaurantLocation"
  GROUP BY "groupId"
) grouped;

-- Verify known chains are grouped correctly
SELECT rg.name, COUNT(rl.id) as locations
FROM "RestaurantGroup" rg
JOIN "RestaurantLocation" rl ON rl."groupId" = rg.id
WHERE rg.name IN ('McDonald''s', 'Subway', 'In-N-Out Burger')
GROUP BY rg.name;
```

### Phase 3: Migrate Relations
1. **Copy post/comment links to new tables**
   ```sql
   -- Migrate posts
   INSERT INTO "_PostToRestaurantGroup" ("A", "B")
   SELECT p."A", rl."groupId"
   FROM "_PostToRestaurant" p
   JOIN "RestaurantLocation" rl ON rl.id = /* map old Restaurant.id to new RestaurantLocation.id */
   ON CONFLICT DO NOTHING;

   -- Migrate comments (same pattern)
   INSERT INTO "_CommentToRestaurantGroup" ("A", "B")
   SELECT c."A", rl."groupId"
   FROM "_CommentToRestaurant" c
   JOIN "RestaurantLocation" rl ON rl.id = /* mapping */
   ON CONFLICT DO NOTHING;
   ```

2. **Verify relation counts**
   ```sql
   -- Old vs new counts should match (or new should be lower due to consolidation)
   SELECT COUNT(*) FROM "_PostToRestaurant";
   SELECT COUNT(*) FROM "_PostToRestaurantGroup";
   ```

### Phase 4: Update Application Code

#### 4.1 Update Linking Script
File: `src/scripts/linkCommentsAndPostsToRestaurants.ts`

**New linking algorithm:**
```typescript
async function linkToRestaurantGroup(mentionedName: string): Promise<number | null> {
  // 1. Try exact match on RestaurantGroup.name
  const group = await prisma.restaurantGroup.findFirst({
    where: { name: { equals: mentionedName, mode: 'insensitive' } }
  });
  if (group) return group.id;

  // 2. Try fuzzy match on RestaurantLocation.name
  const location = await fuzzyMatchLocation(mentionedName);
  if (location?.groupId) return location.groupId;

  // 3. Try fuzzy match on RestaurantLocation.lookupAliases
  const aliasMatch = await fuzzyMatchAliases(mentionedName);
  if (aliasMatch?.groupId) return aliasMatch.groupId;

  return null;
}
```

**Changes needed:**
- Replace `Restaurant` with `RestaurantGroup` in all queries
- Update many-to-many relation from `restaurantsMentioned` to `restaurantGroupsMentioned`
- Linking still searches locations for fuzzy matches, but returns `groupId`

#### 4.2 Update Scoring Engine
File: `src/scoring/dataLoader.ts`

**Changes:**
```typescript
// OLD
export const loadRestaurantItems = async (restaurantId: number): Promise<RedditItem[]>

// NEW
export const loadRestaurantGroupItems = async (groupId: number): Promise<RedditItem[]>
```

**Load posts/comments by group:**
```typescript
const posts = await prisma.post.findMany({
  where: {
    restaurantGroupsMentioned: { some: { id: groupId } }
  },
  include: { sentimentExtraction: true }
});

const comments = await prisma.comment.findMany({
  where: {
    restaurantGroupsMentioned: { some: { id: groupId } }
  },
  include: { sentimentExtraction: true }
});
```

File: `src/scripts/computeScores.ts`

**Changes:**
- Query `RestaurantGroup` instead of `Restaurant`
- Update `rawScore` on `RestaurantGroup` table
- Group logic remains the same

#### 4.3 Update tRPC Routers
Files: `src/myRouters/*.ts`

**Changes needed:**
- Replace `Restaurant` queries with `RestaurantGroup`
- Update filters to use `restaurantGroupsMentioned`
- Add location-based queries if needed (filter by city/state via `locations` relation)

**Example - Post router:**
```typescript
// OLD
posts: {
  where: { restaurantsMentioned: { some: { id: restaurantId } } }
}

// NEW
posts: {
  where: { restaurantGroupsMentioned: { some: { id: groupId } } }
}
```

### Phase 5: Cleanup
1. **Run updated scoring on all groups**
   ```bash
   npm run compute-scores
   ```

2. **Verify scores match expectations**
   - Check known chains have consolidated scores
   - Single-location restaurants unchanged

3. **Drop old models** (once confident)
   - Remove `Restaurant` model from schema
   - Remove `_PostToRestaurant` and `_CommentToRestaurant` relations
   - Run `npm run db:push`

---

## Key Benefits

### Before (Current System)
- Post: "In-N-Out is amazing!"
- Links to: 20 individual `Restaurant` records
- Each location gets: 1/20th of the sentiment weight
- Score fragmentation: Each location has weak score

### After (New System)
- Post: "In-N-Out is amazing!"
- Links to: 1 `RestaurantGroup` ("In-N-Out Burger")
- All 20 locations share: Full sentiment weight
- Consolidated scoring: Group has strong score
- Location data preserved: Can still query by city/address

---

## Edge Cases & Considerations

### Single-Location Restaurants
- Every restaurant gets a `RestaurantGroup` (even if 1 location)
- `RestaurantGroup.name` = `RestaurantLocation.name`
- No special handling needed - scoring works the same

### Chain Consolidation Strategy
**Tier 1: Obvious Chains** (automatic)
- Pattern: name with trailing numbers ("In N Out Burger 102")
- Strip numbers, normalize spacing/capitalization
- Examples: Subway, McDonald's, Starbucks

**Tier 2: Fuzzy Matching** (review required)
- "Mcdonalds" vs "Mc Donalds" vs "Mcdonalds Restaurant"
- Use string similarity (>85% threshold)
- Generate report for manual review

**Tier 3: Manual** (user-provided)
- Local chains (Guisados, Tender Greens)
- Edge cases
- Allowlist of canonical names

### Lookup Aliases
- Preserved in `RestaurantLocation.lookupAliases`
- Used during fuzzy matching
- Example: "Clark St Diner" in aliases matches "clark street diner" mention

### Google Places Data
- `googlePlaceId` remains unique per location
- Can still look up individual location details
- Grouping happens at application level

---

## Scripts to Create

### `src/scripts/migrateToRestaurantGroups.ts`
Main migration orchestrator with three phases:

**Phase 1: Process Known Chains**
- Parse `LA_CHAIN_RESTAURANTS.md` for canonical names and variations
- Create RestaurantGroups for each chain
- Match existing Restaurants to variations
- Create RestaurantLocations linked to groups
- Track processed restaurant IDs

**Phase 2: Fuzzy Match Remaining Multi-Location**
- Query for normalized name duplicates (3+ locations)
- Use pg_trgm similarity (threshold: 0.85)
- Generate `potential_chains_review.json` for manual approval
- Apply approved matches
- Create groups and locations

**Phase 3: Single-Location Groups**
- For all remaining ungrouped Restaurants
- Create 1:1 RestaurantGroup + RestaurantLocation mapping
- Preserve all fields (name, address, scores, metadata)

### `src/scripts/consolidateChains.ts` (Optional Enhancement)
- Interactive CLI for reviewing fuzzy matches
- Approve/reject potential chain consolidations
- Update `potential_chains_review.json` with decisions
- Re-run migration with approved changes

### `src/scripts/verifyMigration.ts`
- Data integrity checks (all locations have groups)
- Count comparisons (Restaurant vs RestaurantLocation)
- Score validation (groups have scores from locations)
- Chain verification (known chains grouped correctly)
- Generate migration report with statistics

---

## Rollback Plan

If migration fails:
1. New tables (`RestaurantGroup`, `RestaurantLocation`) are additive - don't delete old `Restaurant` table
2. Application code can be reverted to use old relations
3. Drop new tables if needed: `DROP TABLE "_PostToRestaurantGroup"; DROP TABLE "RestaurantGroup"; DROP TABLE "RestaurantLocation";`

---

## Timeline Estimate

- **Phase 1** (Schema): 15 minutes
- **Phase 2** (Data Migration): 1-2 hours (depends on consolidation complexity)
- **Phase 3** (Relations): 30 minutes
- **Phase 4** (Code Updates): 2-3 hours
- **Phase 5** (Cleanup): 30 minutes

**Total**: ~5-7 hours for complete migration
