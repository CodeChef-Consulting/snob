import { PrismaClient, Prisma } from '@repo/db';
import Fuse from 'fuse.js';

export interface PotentialRestaurant {
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  latitude: number | null;
  longitude: number | null;
  source: string;
  googlePlaceId: string | null;
  lookupAliases?: string[];
  metadata?: any;
}

export interface IngestionResult {
  groupId: number;
  locationId: number;
  wasNewGroup: boolean;
  wasNewLocation: boolean;
  matchPhase:
    | 'exact-location'
    | 'phase1-chain'
    | 'phase2-fuzzy'
    | 'phase3-word'
    | 'phase4-new';
}

// Normalize restaurant name for matching (same as migrateToRestaurantGroups.ts)
function normalizeRestaurantName(name: string): string {
  const normalized = name
    .toLowerCase()
    .trim()
    .replace(/['']/g, '') // Remove apostrophes early (dave's -> daves)
    .replace(/&/g, 'and'); // Normalize ampersands

  // Don't remove trailing numbers for restaurants where numbers are part of brand identity
  const hasNumberBrand = /\b(tacos?|ph[oở]|number)\b.*\d+$|^\d+\s+\w+/.test(
    normalized
  );

  let result = normalized;

  // Remove store numbers with hash (e.g., "Starbucks #123") BEFORE checking for number brands
  result = result.replace(/\s+#\d+/, '');

  // Remove business entity suffixes (must be at end with word boundary)
  result = result.replace(
    /\s+(inc\.?|llc\.?|corp\.?|corporation|ltd\.?|limited|co\.?)$/i,
    ''
  );

  if (!hasNumberBrand) {
    result = result.replace(/\s+\d+$/, ''); // Remove trailing numbers only if not a number-branded restaurant
  }

  result = result.replace(/\s+/g, ' '); // Normalize spacing

  return result;
}

/**
 * Find or create RestaurantGroup and RestaurantLocation for a single potential restaurant
 *
 * This follows the same 4-phase matching strategy as migrateToRestaurantGroups.ts:
 * - Phase 0: Check if exact location already exists (name + address)
 * - Phase 1: Check against known chains (if chain mappings provided)
 * - Phase 2: Fuzzy match by normalized name against existing groups
 * - Phase 3: Word-based matching (3-word then 2-word prefixes)
 * - Phase 4: Create new single-location group
 *
 * @param potentialRestaurant - Single restaurant data to ingest
 * @param prisma - Prisma client instance
 * @param chainMappings - Optional chain mappings from LA_CHAIN_RESTAURANTS.md
 * @returns IngestionResult with group and location IDs
 */
export async function ingestRestaurantGroupAndLocations(
  potentialRestaurant: PotentialRestaurant,
  prisma: PrismaClient | Prisma.TransactionClient,
  chainMappings?: Array<{ canonical: string; variations: string[] }>
): Promise<IngestionResult> {
  const {
    name,
    address,
    city,
    state,
    zipCode,
    latitude,
    longitude,
    source,
    googlePlaceId,
    lookupAliases,
    metadata,
  } = potentialRestaurant;

  // PHASE 0: Check if this exact location already exists (by name + address)
  const existingLocation = await prisma.restaurantLocation.findFirst({
    where: {
      name,
      address,
    },
    include: {
      group: true,
    },
  });

  if (existingLocation) {
    return {
      groupId: existingLocation.groupId,
      locationId: existingLocation.id,
      wasNewGroup: false,
      wasNewLocation: false,
      matchPhase: 'exact-location',
    };
  }

  // PHASE 1: Check against known chains (if provided)
  if (chainMappings) {
    for (const chain of chainMappings) {
      const normalizedVariations = chain.variations.map((v) =>
        normalizeRestaurantName(v)
      );
      const normalizedName = normalizeRestaurantName(name);

      // Check if name matches any variation
      const matches = normalizedVariations.some(
        (nv) => normalizedName.includes(nv) || nv.includes(normalizedName)
      );

      if (matches) {
        // Find or create the chain group
        let group = await prisma.restaurantGroup.findUnique({
          where: { name: chain.canonical },
        });

        if (!group) {
          group = await prisma.restaurantGroup.create({
            data: {
              name: chain.canonical,
              rawScore: null,
              normalizedScore: null,
            },
          });
        }

        // Create location
        const location = await prisma.restaurantLocation.create({
          data: {
            name,
            address,
            city,
            state,
            zipCode,
            latitude,
            longitude,
            source,
            googlePlaceId,
            lookupAliases: lookupAliases || [],
            metadata: metadata || {},
            groupId: group.id,
          },
        });

        return {
          groupId: group.id,
          locationId: location.id,
          wasNewGroup: !existingLocation,
          wasNewLocation: true,
          matchPhase: 'phase1-chain',
        };
      }
    }
  }

  // PHASE 2: Fuzzy match by normalized name against existing locations
  const normalized = normalizeRestaurantName(name);

  // Get all existing locations for fuzzy matching
  const existingLocations = await prisma.restaurantLocation.findMany();

  // Build Fuse index for fuzzy matching on normalized names
  const normalizedLocations = existingLocations.map((loc) => ({
    id: loc.id,
    groupId: loc.groupId,
    normalizedName: normalizeRestaurantName(loc.name),
  }));

  const fuse = new Fuse(normalizedLocations, {
    keys: ['normalizedName'],
    threshold: 0.3, // 0 is exact match, 1 is match anything
    includeScore: true,
  });

  const fuzzyMatches = fuse.search(normalized);

  if (
    fuzzyMatches.length > 0 &&
    fuzzyMatches[0].score !== undefined &&
    fuzzyMatches[0].score < 0.3
  ) {
    const matchedLocation = fuzzyMatches[0].item;

    const location = await prisma.restaurantLocation.create({
      data: {
        name,
        address,
        city,
        state,
        zipCode,
        latitude,
        longitude,
        source,
        googlePlaceId,
        lookupAliases: lookupAliases || [],
        metadata: metadata || {},
        groupId: matchedLocation.groupId,
      },
    });

    return {
      groupId: matchedLocation.groupId,
      locationId: location.id,
      wasNewGroup: false,
      wasNewLocation: true,
      matchPhase: 'phase2-fuzzy',
    };
  }

  // PHASE 3: Word-based matching (3-word then 2-word)
  const words = name.toLowerCase().trim().split(/\s+/);
  const twoWordBlacklist = new Set([
    'tacos',
    'taco',
    'pho',
    'el',
    'la',
    'los',
    'las',
    'angeles',
    'l',
    'a',
    'the',
    'de',
    'del',
    'my',
    'best',
    'good',
    'great',
    'new',
    'old',
    'original',
    'famous',
    'authentic',
    'fresh',
    'hot',
    'spicy',
    'of',
    'catch',
  ]);

  // Try 3-word match first
  for (const wordCount of [3]) {
    if (words.length >= wordCount) {
      const wordKey = words.slice(0, wordCount).join(' ');

      // Skip blacklisted 2-word prefixes
      if (wordCount === 2 && twoWordBlacklist.has(words[0])) {
        continue;
      }

      // Find locations that start with the same words
      for (const existingLoc of existingLocations) {
        const locWords = existingLoc.name.toLowerCase().trim().split(/\s+/);
        if (locWords.length >= wordCount) {
          const locWordKey = locWords.slice(0, wordCount).join(' ');
          if (locWordKey === wordKey) {
            const location = await prisma.restaurantLocation.create({
              data: {
                name,
                address,
                city,
                state,
                zipCode,
                latitude,
                longitude,
                source,
                googlePlaceId,
                lookupAliases: lookupAliases || [],
                metadata: metadata || {},
                groupId: existingLoc.groupId,
              },
            });

            return {
              groupId: existingLoc.groupId,
              locationId: location.id,
              wasNewGroup: false,
              wasNewLocation: true,
              matchPhase: 'phase3-word',
            };
          }
        }
      }
    }
  }

  // PHASE 4: Create new single-location group
  const group = await prisma.restaurantGroup.create({
    data: {
      name,
      rawScore: null,
      normalizedScore: null,
    },
  });

  const location = await prisma.restaurantLocation.create({
    data: {
      name,
      address,
      city,
      state,
      zipCode,
      latitude,
      longitude,
      source,
      googlePlaceId,
      lookupAliases: lookupAliases || [],
      metadata: metadata || {},
      groupId: group.id,
    },
  });

  return {
    groupId: group.id,
    locationId: location.id,
    wasNewGroup: true,
    wasNewLocation: true,
    matchPhase: 'phase4-new',
  };
}

/**
 * Link posts and comments that mention old Restaurant IDs to the new RestaurantGroup
 * This is used during migration from the old Restaurant model
 *
 * @param groupId - The RestaurantGroup ID to link to
 * @param oldRestaurantIds - Array of old Restaurant IDs to migrate from
 * @param prisma - Prisma client instance
 */
export async function linkOldRestaurantMentionsToGroup(
  groupId: number,
  oldRestaurantIds: number[],
  prisma: PrismaClient | Prisma.TransactionClient
): Promise<void> {
  if (oldRestaurantIds.length === 0) return;

  // Link all posts that mention any of these old restaurants to the group
  await prisma.$executeRaw`
    INSERT INTO "_PostToRestaurantGroup" ("A", "B")
    SELECT DISTINCT p.id, ${groupId}::int
    FROM "Post" p
    JOIN "_PostToRestaurant" pr ON pr."A" = p.id
    WHERE pr."B" = ANY(${Prisma.raw(`ARRAY[${oldRestaurantIds.join(',')}]`)})
    ON CONFLICT DO NOTHING
  `;

  // Link all comments that mention any of these old restaurants to the group
  await prisma.$executeRaw`
    INSERT INTO "_CommentToRestaurantGroup" ("A", "B")
    SELECT DISTINCT c.id, ${groupId}::int
    FROM "Comment" c
    JOIN "_CommentToRestaurant" cr ON cr."A" = c.id
    WHERE cr."B" = ANY(${Prisma.raw(`ARRAY[${oldRestaurantIds.join(',')}]`)})
    ON CONFLICT DO NOTHING
  `;
}
