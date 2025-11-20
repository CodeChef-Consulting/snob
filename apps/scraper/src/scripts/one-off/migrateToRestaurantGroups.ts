import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { PrismaClient, Prisma } from '@repo/db';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import _ from 'lodash';

const prisma = new PrismaClient();

// Track processed restaurant IDs to avoid duplicates
const processedRestaurantIds = new Set<number>();

interface ChainMapping {
  canonical: string;
  variations: string[];
}

// Parse LA_CHAIN_RESTAURANTS.md to extract chain mappings
function parseChainRestaurantsFile(): ChainMapping[] {
  const filePath = path.join(
    __dirname,
    '../../../../../LA_CHAIN_RESTAURANTS.md'
  );
  const content = fs.readFileSync(filePath, 'utf-8');
  const chains: ChainMapping[] = [];

  // Parse each chain section
  const chainBlocks = content.split(/^- \*\*/m).slice(1); // Split by "- **" and skip intro

  for (const block of chainBlocks) {
    const lines = block.split('\n');
    const firstLine = lines[0];

    // Extract canonical name from first line (e.g., "McDonald's** (83 locations...")
    const canonicalMatch = firstLine.match(/^(.+?)\*\*/);
    if (!canonicalMatch) continue;

    const canonical = canonicalMatch[1].trim();
    const variations: string[] = [canonical];

    // Look for variations line
    for (const line of lines) {
      if (line.trim().startsWith('- Variations:')) {
        const variationsText = line.replace('- Variations:', '').trim();
        // Split by comma and clean up quotes
        const variationsList = variationsText
          .split(',')
          .map((v) => v.trim().replace(/^["']|["']$/g, ''))
          .filter((v) => v.length > 0);
        variations.push(...variationsList);
      }
    }

    chains.push({ canonical, variations });
  }

  console.log(`📋 Parsed ${chains.length} chains from LA_CHAIN_RESTAURANTS.md`);
  return chains;
}

// Normalize restaurant name for matching
function normalizeRestaurantName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+\d+$/, '') // Remove trailing numbers
    .replace(/\s+#\d+/, '') // Remove store numbers with hash
    .replace(/\s+/g, ' ') // Normalize spacing
    .replace(/['']/g, "'") // Normalize apostrophes
    .replace(/&/g, 'and'); // Normalize ampersands
}

// Phase 1: Process known chains from LA_CHAIN_RESTAURANTS.md
async function processKnownChains(
  chains: ChainMapping[],
  dryRun: boolean = false
) {
  console.log('\n🔗 PHASE 1: Processing Known Chains');
  console.log('====================================');

  let groupsCreated = 0;
  let locationsCreated = 0;
  let groupsSkipped = 0;

  for (const chain of chains) {
    const { canonical, variations } = chain;

    // Check if this chain group already exists
    const existingGroup = await prisma.restaurantGroup.findUnique({
      where: { name: canonical },
      include: { locations: true },
    });

    if (existingGroup) {
      console.log(
        `⏭️  ${canonical}: Already exists with ${existingGroup.locations.length} locations (skipping)`
      );
      // Mark these restaurant IDs as processed
      const restaurantIds = await prisma.restaurant.findMany({
        where: {
          OR: variations.map((variation) => ({
            name: {
              contains: variation,
              mode: 'insensitive' as const,
            },
          })),
        },
        select: { id: true },
      });
      restaurantIds.forEach((r) => processedRestaurantIds.add(r.id));
      groupsSkipped++;
      continue;
    }

    // Find all restaurants matching any variation
    const normalizedVariations = variations.map((v) =>
      normalizeRestaurantName(v)
    );

    const matchingRestaurants = await prisma.restaurant.findMany({
      where: {
        OR: variations.map((variation) => ({
          name: {
            contains: variation,
            mode: 'insensitive' as const,
          },
        })),
      },
    });

    // Also check normalized names for better matching
    const additionalMatches = matchingRestaurants.filter((r) => {
      const normalized = normalizeRestaurantName(r.name);
      return normalizedVariations.some(
        (nv) => normalized.includes(nv) || nv.includes(normalized)
      );
    });

    // Combine and deduplicate
    const allMatches = Array.from(
      new Map(
        [...matchingRestaurants, ...additionalMatches].map((r) => [r.id, r])
      ).values()
    );

    if (allMatches.length === 0) {
      console.log(`⚠️  ${canonical}: No matches found`);
      continue;
    }

    console.log(`\n📍 ${canonical}: Found ${allMatches.length} locations`);

    if (!dryRun) {
      // Collect all restaurant IDs for this group
      const restaurantIds = allMatches.map((r) => r.id);

      // Wrap in transaction so everything rolls back on failure
      await prisma.$transaction(async (tx) => {
        // Create RestaurantGroup
        const group = await tx.restaurantGroup.create({
          data: {
            name: canonical,
            rawScore: null, // Will be computed later
            normalizedScore: null,
          },
        });

        // Create RestaurantLocation for each match
        for (const restaurant of allMatches) {
          await tx.restaurantLocation.create({
            data: {
              name: restaurant.name,
              address: restaurant.address,
              city: restaurant.city,
              state: restaurant.state,
              zipCode: restaurant.zipCode,
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
              source: restaurant.source,
              googlePlaceId: restaurant.googlePlaceId,
              lookupAliases: restaurant.lookupAliases,
              metadata: restaurant.metadata,
              groupId: group.id,
            },
          });
        }

        // Link all posts that mention any of these restaurants to the group (bulk insert)
        await tx.$executeRaw`
          INSERT INTO "_PostToRestaurantGroup" ("A", "B")
          SELECT DISTINCT p.id, ${group.id}::int
          FROM "Post" p
          JOIN "_PostToRestaurant" pr ON pr."A" = p.id
          WHERE pr."B" = ANY(${Prisma.raw(`ARRAY[${restaurantIds.join(',')}]`)})
          ON CONFLICT DO NOTHING
        `;

        // Link all comments that mention any of these restaurants to the group (bulk insert)
        await tx.$executeRaw`
          INSERT INTO "_CommentToRestaurantGroup" ("A", "B")
          SELECT DISTINCT c.id, ${group.id}::int
          FROM "Comment" c
          JOIN "_CommentToRestaurant" cr ON cr."A" = c.id
          WHERE cr."B" = ANY(${Prisma.raw(`ARRAY[${restaurantIds.join(',')}]`)})
          ON CONFLICT DO NOTHING
        `;
      });

      // Only update counters and tracking after successful transaction
      groupsCreated++;
      allMatches.forEach((r) => processedRestaurantIds.add(r.id));
      locationsCreated += allMatches.length;

      console.log(
        `✅ Created group "${canonical}" with ${allMatches.length} locations`
      );
    } else {
      console.log(
        `   [DRY RUN] Would create group with ${allMatches.length} locations`
      );
      allMatches.forEach((r) => processedRestaurantIds.add(r.id));
    }
  }

  console.log(`\n📊 Phase 1 Summary:`);
  console.log(`   Groups created: ${groupsCreated}`);
  console.log(`   Groups skipped (already exist): ${groupsSkipped}`);
  console.log(`   Locations created: ${locationsCreated}`);
  console.log(`   Restaurants processed: ${processedRestaurantIds.size}`);
}

// Display a potential chain group for review
async function displayPotentialChain(
  normalizedName: string,
  restaurants: any[],
  index: number,
  total: number
) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(
    `POTENTIAL CHAIN ${index + 1}/${total} (${restaurants.length} locations)`
  );
  console.log(`Normalized Name: "${normalizedName}"`);
  console.log(`${'='.repeat(80)}`);

  // Sort by source (Open Data Portal first), then by createdAt
  const sorted = _.sortBy(restaurants, [
    (r: any) => (r.source === 'Open Data Portal' ? 0 : 1),
    (r: any) => r.createdAt.getTime(),
  ]);

  const proposed = sorted[0];
  console.log(`\n👑 PROPOSED CANONICAL NAME: "${proposed.name}"`);

  sorted.forEach((r: any, i: number) => {
    console.log(`\n  ${i + 1}. [ID: ${r.id}] ${r.name}`);
    console.log(`     Source: ${r.source}`);
    console.log(`     Created: ${r.createdAt.toISOString().split('T')[0]}`);
    if (r.address) {
      console.log(
        `     Address: ${r.address}, ${r.city}, ${r.state} ${r.zipCode}`
      );
    }
    if (r.googlePlaceId) {
      console.log(`     Google Place ID: ${r.googlePlaceId}`);
    }
  });
}

// Prompt user for approval
function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

// Phase 2: Fuzzy match remaining multi-location restaurants
async function fuzzyMatchMultiLocation(
  dryRun: boolean = false,
  interactive: boolean = false
) {
  console.log('\n🔍 PHASE 2: Fuzzy Match Multi-Location Restaurants');
  console.log('==================================================');

  if (interactive && !dryRun) {
    console.log('⚙️  INTERACTIVE MODE - You will review each potential chain');
  }

  // Get IDs of restaurants already in groups
  const existingLocationRestaurantIds =
    await prisma.restaurantLocation.findMany({
      select: {
        // We need to find the original restaurant ID somehow
        // For now, we'll use the restaurant name to find matches
        name: true,
        address: true,
      },
    });

  // Find restaurants that match existing locations (already processed)
  const alreadyInGroups = await prisma.restaurant.findMany({
    where: {
      OR: existingLocationRestaurantIds.map((loc) => ({
        AND: [{ name: loc.name }, { address: loc.address }],
      })),
    },
    select: { id: true },
  });

  alreadyInGroups.forEach((r) => processedRestaurantIds.add(r.id));

  // Get remaining unprocessed restaurants
  const remainingRestaurants = await prisma.restaurant.findMany({
    where: {
      id: {
        notIn: Array.from(processedRestaurantIds),
      },
    },
  });

  console.log(
    `📋 Analyzing ${remainingRestaurants.length} remaining restaurants`
  );

  // Group by normalized name
  const nameGroups = new Map<string, typeof remainingRestaurants>();

  for (const restaurant of remainingRestaurants) {
    const normalized = normalizeRestaurantName(restaurant.name);
    if (!nameGroups.has(normalized)) {
      nameGroups.set(normalized, []);
    }
    nameGroups.get(normalized)!.push(restaurant);
  }

  // Find groups with 3+ locations
  const potentialChains = Array.from(nameGroups.entries())
    .filter(([_, restaurants]) => restaurants.length >= 3)
    .sort((a, b) => b[1].length - a[1].length);

  console.log(
    `🔗 Found ${potentialChains.length} potential chains (3+ locations)`
  );

  let groupsCreated = 0;
  let locationsCreated = 0;
  let chainsSkipped = 0;

  for (let i = 0; i < potentialChains.length; i++) {
    const [normalizedName, restaurants] = potentialChains[i];
    const sorted = _.sortBy(restaurants, [
      (r: any) => (r.source === 'Open Data Portal' ? 0 : 1),
      (r: any) => r.createdAt.getTime(),
    ]);
    const canonicalName = sorted[0].name;

    // Interactive approval
    if (interactive && !dryRun) {
      await displayPotentialChain(
        normalizedName,
        restaurants,
        i,
        potentialChains.length
      );
      const answer = await promptUser(
        '\nGroup these together? (y/n/q to quit): '
      );

      if (answer === 'q') {
        console.log(
          '\n⏸️  Stopping Phase 2 - remaining potential chains will be skipped'
        );
        break;
      }

      if (answer !== 'y') {
        console.log(`⏭️  Skipped group "${canonicalName}"`);
        chainsSkipped++;
        continue;
      }
    } else {
      console.log(`\n📍 "${canonicalName}": ${restaurants.length} locations`);
    }

    if (!dryRun) {
      // Collect all restaurant IDs for this group
      const restaurantIds = restaurants.map((r: any) => r.id);

      // Wrap in transaction so everything rolls back on failure
      await prisma.$transaction(async (tx) => {
        const group = await tx.restaurantGroup.create({
          data: {
            name: canonicalName,
            rawScore: null,
            normalizedScore: null,
          },
        });

        for (const restaurant of restaurants) {
          await tx.restaurantLocation.create({
            data: {
              name: restaurant.name,
              address: restaurant.address,
              city: restaurant.city,
              state: restaurant.state,
              zipCode: restaurant.zipCode,
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
              source: restaurant.source,
              googlePlaceId: restaurant.googlePlaceId,
              lookupAliases: restaurant.lookupAliases,
              metadata: restaurant.metadata,
              groupId: group.id,
            },
          });
        }

        // Link all posts that mention any of these restaurants to the group (bulk insert)
        await tx.$executeRaw`
          INSERT INTO "_PostToRestaurantGroup" ("A", "B")
          SELECT DISTINCT p.id, ${group.id}::int
          FROM "Post" p
          JOIN "_PostToRestaurant" pr ON pr."A" = p.id
          WHERE pr."B" = ANY(${Prisma.raw(`ARRAY[${restaurantIds.join(',')}]`)})
          ON CONFLICT DO NOTHING
        `;

        // Link all comments that mention any of these restaurants to the group (bulk insert)
        await tx.$executeRaw`
          INSERT INTO "_CommentToRestaurantGroup" ("A", "B")
          SELECT DISTINCT c.id, ${group.id}::int
          FROM "Comment" c
          JOIN "_CommentToRestaurant" cr ON cr."A" = c.id
          WHERE cr."B" = ANY(${Prisma.raw(`ARRAY[${restaurantIds.join(',')}]`)})
          ON CONFLICT DO NOTHING
        `;
      });

      // Only update counters and tracking after successful transaction
      groupsCreated++;
      restaurants.forEach((r: any) => processedRestaurantIds.add(r.id));
      locationsCreated += restaurants.length;

      console.log(
        `✅ Created group "${canonicalName}" with ${restaurants.length} locations`
      );
    } else {
      console.log(
        `   [DRY RUN] Would create group with ${restaurants.length} locations`
      );
      restaurants.forEach((r: any) => processedRestaurantIds.add(r.id));
    }
  }

  console.log(`\n📊 Phase 2 Summary:`);
  console.log(`   Groups created: ${groupsCreated}`);
  console.log(`   Locations created: ${locationsCreated}`);
  if (interactive) {
    console.log(`   Chains skipped: ${chainsSkipped}`);
  }
  console.log(`   Total restaurants processed: ${processedRestaurantIds.size}`);
}

// Phase 3: Create single-location groups for remaining restaurants
async function createSingleLocationGroups(dryRun: boolean = false) {
  console.log('\n🏪 PHASE 3: Create Single-Location Groups');
  console.log('=========================================');

  const remainingRestaurants = await prisma.restaurant.findMany({
    where: {
      id: {
        notIn: Array.from(processedRestaurantIds),
      },
    },
  });

  console.log(
    `📋 Processing ${remainingRestaurants.length} single-location restaurants`
  );

  let groupsCreated = 0;
  let locationsCreated = 0;

  if (!dryRun) {
    for (const restaurant of remainingRestaurants) {
      // Wrap in transaction so everything rolls back on failure
      await prisma.$transaction(async (tx) => {
        const group = await tx.restaurantGroup.create({
          data: {
            name: restaurant.name,
            rawScore: restaurant.rawScore,
            normalizedScore: restaurant.normalizedScore,
          },
        });

        await tx.restaurantLocation.create({
          data: {
            name: restaurant.name,
            address: restaurant.address,
            city: restaurant.city,
            state: restaurant.state,
            zipCode: restaurant.zipCode,
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            source: restaurant.source,
            googlePlaceId: restaurant.googlePlaceId,
            lookupAliases: restaurant.lookupAliases,
            metadata: restaurant.metadata,
            groupId: group.id,
          },
        });

        // Link all posts that mention this restaurant to the group (bulk insert)
        await tx.$executeRaw`
          INSERT INTO "_PostToRestaurantGroup" ("A", "B")
          SELECT DISTINCT p.id, ${group.id}::int
          FROM "Post" p
          JOIN "_PostToRestaurant" pr ON pr."A" = p.id
          WHERE pr."B" = ${restaurant.id}
          ON CONFLICT DO NOTHING
        `;

        // Link all comments that mention this restaurant to the group (bulk insert)
        await tx.$executeRaw`
          INSERT INTO "_CommentToRestaurantGroup" ("A", "B")
          SELECT DISTINCT c.id, ${group.id}::int
          FROM "Comment" c
          JOIN "_CommentToRestaurant" cr ON cr."A" = c.id
          WHERE cr."B" = ${restaurant.id}
          ON CONFLICT DO NOTHING
        `;
      });

      // Only update counters and tracking after successful transaction
      groupsCreated++;
      locationsCreated++;
      processedRestaurantIds.add(restaurant.id);
    }
  } else {
    remainingRestaurants.forEach((r) => processedRestaurantIds.add(r.id));
  }

  console.log(`\n📊 Phase 3 Summary:`);
  console.log(`   Groups created: ${groupsCreated}`);
  console.log(`   Locations created: ${locationsCreated}`);
  console.log(`   Total restaurants processed: ${processedRestaurantIds.size}`);
}

// Main migration function
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const interactive = args.includes('--interactive');
  const resetAll = args.includes('--reset-all');

  console.log('🚀 Restaurant Group Migration');
  console.log('==============================\n');

  if (resetAll) {
    console.log('🗑️  RESET MODE - Clearing all existing data\n');

    const locationCount = await prisma.restaurantLocation.count();
    const groupCount = await prisma.restaurantGroup.count();

    console.log(`Found ${locationCount} locations and ${groupCount} groups`);

    await prisma.restaurantLocation.deleteMany({});
    console.log('✅ Deleted all RestaurantLocations');

    await prisma.restaurantGroup.deleteMany({});
    console.log('✅ Deleted all RestaurantGroups\n');
  }

  if (dryRun) {
    console.log('⚠️  DRY RUN MODE - No changes will be made\n');
  }

  if (interactive && !dryRun) {
    console.log('⚙️  INTERACTIVE MODE - You will approve Phase 2 groupings\n');
  }

  try {
    // Parse chain mappings
    const chains = parseChainRestaurantsFile();

    // Execute three phases
    await processKnownChains(chains, dryRun);
    await fuzzyMatchMultiLocation(dryRun, interactive);
    await createSingleLocationGroups(dryRun);

    // Final summary
    const totalRestaurants = await prisma.restaurant.count();
    console.log('\n✨ MIGRATION COMPLETE');
    console.log('====================');
    console.log(`Total restaurants in database: ${totalRestaurants}`);
    console.log(`Restaurants processed: ${processedRestaurantIds.size}`);

    if (!dryRun) {
      const groupCount = await prisma.restaurantGroup.count();
      const locationCount = await prisma.restaurantLocation.count();
      console.log(`RestaurantGroups created: ${groupCount}`);
      console.log(`RestaurantLocations created: ${locationCount}`);
    }

    if (processedRestaurantIds.size !== totalRestaurants) {
      console.log(
        `\n⚠️  WARNING: ${totalRestaurants - processedRestaurantIds.size} restaurants were not processed!`
      );
    }
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
