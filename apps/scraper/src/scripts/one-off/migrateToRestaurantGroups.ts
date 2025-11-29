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
  const normalized = name
    .toLowerCase()
    .trim()
    .replace(/['']/g, '') // Remove apostrophes early (dave's -> daves)
    .replace(/&/g, 'and'); // Normalize ampersands

  // Don't remove trailing numbers for restaurants where numbers are part of brand identity
  // (e.g., "Tacos #1", "Pho 79", "Phở 54", "Number 1 Chinese")
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
              metadata: restaurant.metadata ?? undefined,
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

  // Use the shortest name as canonical (likely without business suffix)
  const canonicalName =
    _.minBy(restaurants, (r: any) => r.name.length)?.name || sorted[0].name;
  console.log(`\n👑 PROPOSED CANONICAL NAME: "${canonicalName}"`);

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

// Prompt user for approval (Enter defaults to 'y')
function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      const trimmed = answer.trim().toLowerCase();
      // Empty string (just Enter) defaults to 'y'
      resolve(trimmed === '' ? 'y' : trimmed);
    });
  });
}

// Helper: Find restaurants that haven't been migrated to RestaurantLocation yet
async function findRestaurantsNotMigrated(): Promise<void> {
  // Get IDs of restaurants already in groups by matching name+address
  const existingLocations = await prisma.restaurantLocation.findMany({
    select: {
      name: true,
      address: true,
    },
  });

  // Process in batches to avoid "too many bind variables" error
  const batchSize = 1000;
  for (let i = 0; i < existingLocations.length; i += batchSize) {
    const batch = existingLocations.slice(i, i + batchSize);
    const alreadyInGroups = await prisma.restaurant.findMany({
      where: {
        OR: batch.map((loc) => ({
          AND: [{ name: loc.name }, { address: loc.address }],
        })),
      },
      select: { id: true },
    });

    alreadyInGroups.forEach((r) => processedRestaurantIds.add(r.id));
  }
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

  // Mark already-migrated restaurants as processed
  await findRestaurantsNotMigrated();

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

  // Find groups with 2+ locations
  const potentialChains = Array.from(nameGroups.entries())
    //TODO: change back to >= 2
    .filter(([_, restaurants]) => restaurants.length === 2)
    .sort((a, b) => b[1].length - a[1].length);

  console.log(
    `🔗 Found ${potentialChains.length} potential chains (2+ locations)`
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

    // Use the shortest name as canonical (likely without business suffix)
    // or the first one if they're all the same length
    const canonicalName =
      _.minBy(restaurants, (r: any) => r.name.length)?.name || sorted[0].name;

    // Interactive approval
    if (interactive && !dryRun && sorted.length > 2) {
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
              metadata: restaurant.metadata ?? undefined,
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

// Phase 3: Word-based matching (3-word then 2-word)
async function wordBasedMatching(
  dryRun: boolean = false,
  interactive: boolean = false,
  skip3Word: boolean = false
) {
  console.log('\n🔤 PHASE 3: Word-Based Matching');
  console.log('================================');

  if (interactive && !dryRun) {
    console.log('⚙️  INTERACTIVE MODE - You will review each potential chain');
  }

  if (skip3Word) {
    console.log('⚠️  Skipping 3-word matches, only running 2-word matches');
  }

  // Mark already-migrated restaurants as processed
  await findRestaurantsNotMigrated();

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

  let groupsCreated = 0;
  let locationsCreated = 0;
  let chainsSkipped = 0;

  // Blacklist for 2-word matching - common words that shouldn't be used for grouping
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

  // Try 3-word matches first, then 2-word matches
  const wordCounts = skip3Word ? [2] : [3, 2];
  for (const wordCount of wordCounts) {
    console.log(`\n🔍 Looking for ${wordCount}-word matches...`);

    const wordGroups = new Map<string, typeof remainingRestaurants>();

    // Get current remaining restaurants (excluding those processed in this phase)
    const currentRemaining = remainingRestaurants.filter(
      (r) => !processedRestaurantIds.has(r.id)
    );

    for (const restaurant of currentRemaining) {
      const words = restaurant.name.toLowerCase().trim().split(/\s+/);
      if (words.length >= wordCount) {
        const wordKey = words.slice(0, wordCount).join(' ');

        // For 2-word matches, skip if first word is in blacklist
        if (wordCount === 2 && twoWordBlacklist.has(words[0])) {
          continue;
        }

        if (!wordGroups.has(wordKey)) {
          wordGroups.set(wordKey, []);
        }
        wordGroups.get(wordKey)!.push(restaurant);
      }
    }

    // Find groups with 2+ locations
    const potentialChains = Array.from(wordGroups.entries())
      //TODO: change back to >= 2
      .filter(([_, restaurants]) => restaurants.length === 2)
      .sort((a, b) => b[1].length - a[1].length);

    console.log(
      `🔗 Found ${potentialChains.length} potential chains (3+ locations)`
    );

    for (let i = 0; i < potentialChains.length; i++) {
      const [wordKey, restaurants] = potentialChains[i];
      const sorted = _.sortBy(restaurants, [
        (r: any) => (r.source === 'Open Data Portal' ? 0 : 1),
        (r: any) => r.createdAt.getTime(),
      ]);

      // Use the shortest name as canonical
      const canonicalName =
        _.minBy(restaurants, (r: any) => r.name.length)?.name || sorted[0].name;

      // Interactive approval
      if (interactive && !dryRun && wordCount < 3) {
        await displayPotentialChain(
          `${wordCount}-word: ${wordKey}`,
          restaurants,
          i,
          potentialChains.length
        );
        const answer = await promptUser(
          '\nGroup these together? (y/n/q to quit): '
        );

        if (answer === 'q') {
          console.log(`\n⏸️  Stopping ${wordCount}-word matching`);
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
        const restaurantIds = restaurants.map((r: any) => r.id);

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
                metadata: restaurant.metadata ?? undefined,
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
  }

  console.log(`\n📊 Phase 3 Summary:`);
  console.log(`   Groups created: ${groupsCreated}`);
  console.log(`   Locations created: ${locationsCreated}`);
  if (interactive) {
    console.log(`   Chains skipped: ${chainsSkipped}`);
  }
  console.log(`   Total restaurants processed: ${processedRestaurantIds.size}`);
}

// Phase 4: Create single-location groups for remaining restaurants
async function createSingleLocationGroups(
  dryRun: boolean = false,
  interactive: boolean = false
) {
  console.log('\n🏪 PHASE 4: Create Single-Location Groups');
  console.log('=========================================');

  // Mark already-migrated restaurants as processed
  await findRestaurantsNotMigrated();

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
      try {
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
              metadata: restaurant.metadata ?? undefined,
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
      } catch (error: any) {
        // Check if it's a unique constraint violation on the group name
        if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
          console.log(
            `\n⚠️  Conflict: Group "${restaurant.name}" already exists`
          );

          // Find the existing group
          const existingGroup = await prisma.restaurantGroup.findUnique({
            where: { name: restaurant.name },
            include: { locations: true },
          });

          if (existingGroup) {
            console.log(
              `\n📍 Existing group has ${existingGroup.locations.length} location(s):`
            );
            existingGroup.locations.forEach((loc, i) => {
              console.log(`   ${i + 1}. ${loc.name}`);
              if (loc.address) {
                console.log(`      ${loc.address}, ${loc.city}, ${loc.state}`);
              }
            });

            console.log(`\n🆕 New restaurant:`);
            console.log(`   ${restaurant.name}`);
            if (restaurant.address) {
              console.log(
                `   ${restaurant.address}, ${restaurant.city}, ${restaurant.state}`
              );
            }

            if (interactive) {
              const answer = await promptUser(
                '\nAdd this restaurant to the existing group? (y/n): '
              );

              if (answer === 'y') {
                // Add location to existing group
                await prisma.$transaction(async (tx) => {
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
                      metadata: restaurant.metadata ?? undefined,
                      groupId: existingGroup.id,
                    },
                  });

                  // Link posts and comments
                  await tx.$executeRaw`
                    INSERT INTO "_PostToRestaurantGroup" ("A", "B")
                    SELECT DISTINCT p.id, ${existingGroup.id}::int
                    FROM "Post" p
                    JOIN "_PostToRestaurant" pr ON pr."A" = p.id
                    WHERE pr."B" = ${restaurant.id}
                    ON CONFLICT DO NOTHING
                  `;

                  await tx.$executeRaw`
                    INSERT INTO "_CommentToRestaurantGroup" ("A", "B")
                    SELECT DISTINCT c.id, ${existingGroup.id}::int
                    FROM "Comment" c
                    JOIN "_CommentToRestaurant" cr ON cr."A" = c.id
                    WHERE cr."B" = ${restaurant.id}
                    ON CONFLICT DO NOTHING
                  `;
                });

                console.log(
                  `✅ Added location to existing group "${existingGroup.name}"`
                );
                locationsCreated++;
                processedRestaurantIds.add(restaurant.id);
              } else {
                console.log(`⏭️  Skipped restaurant "${restaurant.name}"`);
              }
            } else {
              console.log(`⏭️  Skipping - non-interactive mode`);
            }
          }
        } else {
          // Re-throw if it's a different error
          throw error;
        }
      }
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
  const skip3Word = args.includes('--skip-3-word');

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

    // Phase 1: Process known chains
    if (interactive && !dryRun) {
      const phase1Answer = await promptUser(
        '\n▶️  Run Phase 1 (Process Known Chains)? (y/n): '
      );
      if (phase1Answer !== 'y') {
        console.log('⏭️  Skipping Phase 1');
      } else {
        await processKnownChains(chains, dryRun);
      }
    } else {
      await processKnownChains(chains, dryRun);
    }

    // Phase 2: Fuzzy match multi-location
    if (interactive && !dryRun) {
      const phase2Answer = await promptUser(
        '\n▶️  Run Phase 2 (Fuzzy Match Multi-Location)? (y/n): '
      );
      if (phase2Answer !== 'y') {
        console.log('⏭️  Skipping Phase 2');
      } else {
        await fuzzyMatchMultiLocation(dryRun, interactive);
      }
    } else {
      await fuzzyMatchMultiLocation(dryRun, interactive);
    }

    // Phase 3: Word-based matching
    if (interactive && !dryRun) {
      const phase3Answer = await promptUser(
        '\n▶️  Run Phase 3 (Word-Based Matching)? (y/n): '
      );
      if (phase3Answer !== 'y') {
        console.log('⏭️  Skipping Phase 3');
      } else {
        await wordBasedMatching(dryRun, interactive, skip3Word);
      }
    } else {
      await wordBasedMatching(dryRun, interactive, skip3Word);
    }

    // Phase 4: Single-location groups
    if (interactive && !dryRun) {
      const phase4Answer = await promptUser(
        '\n▶️  Run Phase 4 (Create Single-Location Groups)? (y/n): '
      );
      if (phase4Answer !== 'y') {
        console.log('⏭️  Skipping Phase 4');
      } else {
        await createSingleLocationGroups(dryRun, interactive);
      }
    } else {
      await createSingleLocationGroups(dryRun, interactive);
    }

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
