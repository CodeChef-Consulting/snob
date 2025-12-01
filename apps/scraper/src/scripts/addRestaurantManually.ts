import { PrismaClient, Prisma } from '@repo/db';
import {
  findPlaceByName,
  extractAddressComponents,
  checkExistingLocationByPlaceId,
} from '../utils/googlePlaces';
import {
  ingestRestaurantGroupAndLocations,
  type PotentialRestaurant,
} from '../utils/restaurantGroupIngestion';
import { haversineDistanceSQL } from '../utils/haversineQuery';
import {
  sortByWinnerPriority,
  calculateMergedData,
} from '../utils/restaurantLocationMerge';
import * as readline from 'readline';
import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

const prisma = new PrismaClient();

type NearbyLocation = {
  id: number;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  latitude: number | null;
  longitude: number | null;
  googlePlaceId: string | null;
  source: string;
  lookupAliases: string[];
  metadata: any;
  groupId: number;
  createdAt: Date;
  updatedAt: Date;
  group_name: string;
  distance_meters: number;
};

async function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/**
 * Merge new location data into an existing location
 * Uses winner priority logic: Open Data Portal > Google Places API by created date
 */
async function mergeIntoExistingLocation(
  existingLocation: NearbyLocation,
  newLocationData: PotentialRestaurant
): Promise<void> {
  // Create synthetic location objects for merge calculation
  const existingAsLocation = {
    id: existingLocation.id,
    name: existingLocation.name,
    source: existingLocation.source,
    googlePlaceId: existingLocation.googlePlaceId,
    lookupAliases: existingLocation.lookupAliases,
    metadata: existingLocation.metadata,
    createdAt: existingLocation.createdAt,
  };

  const newAsLocation = {
    id: -1, // Temporary ID
    name: newLocationData.name,
    source: newLocationData.source,
    googlePlaceId: newLocationData.googlePlaceId,
    lookupAliases: newLocationData.lookupAliases || [],
    metadata: newLocationData.metadata || {},
    createdAt: new Date(), // New location would be created now
  };

  const locations = [existingAsLocation, newAsLocation];
  const sorted = sortByWinnerPriority(locations);
  const winner = sorted[0];

  const { finalName, finalGooglePlaceId, finalAliases, finalMetadata } =
    calculateMergedData(locations);

  console.log(`\n📋 Merge Preview:`);
  console.log(`   Winner: ${winner.source} (${winner.source === existingLocation.source ? 'existing' : 'new'})`);
  console.log(`   Final Name: ${finalName}`);
  console.log(`   Final Google Place ID: ${finalGooglePlaceId || 'null'}`);
  console.log(
    `   Final Aliases: ${finalAliases.length > 0 ? finalAliases.join(', ') : 'none'}`
  );
  console.log(`   Metadata keys: ${Object.keys(finalMetadata).join(', ') || 'none'}`);

  // Update the existing location with merged data
  await prisma.restaurantLocation.update({
    where: { id: existingLocation.id },
    data: {
      name: finalName,
      googlePlaceId: finalGooglePlaceId,
      lookupAliases: finalAliases,
      metadata: finalMetadata,
      // Update coordinates if new data has them and existing doesn't
      latitude:
        newLocationData.latitude && !existingLocation.latitude
          ? newLocationData.latitude
          : existingLocation.latitude,
      longitude:
        newLocationData.longitude && !existingLocation.longitude
          ? newLocationData.longitude
          : existingLocation.longitude,
      // Update address fields if new data has them and existing doesn't
      address:
        newLocationData.address && !existingLocation.address
          ? newLocationData.address
          : existingLocation.address,
      city:
        newLocationData.city && !existingLocation.city
          ? newLocationData.city
          : existingLocation.city,
      state:
        newLocationData.state && !existingLocation.state
          ? newLocationData.state
          : existingLocation.state,
      zipCode:
        newLocationData.zipCode && !existingLocation.zipCode
          ? newLocationData.zipCode
          : existingLocation.zipCode,
    },
  });

  console.log(`\n✅ Successfully merged into existing location!`);
  console.log(`   Location ID: ${existingLocation.id}`);
  console.log(`   Group: ${existingLocation.group_name} (ID: ${existingLocation.groupId})`);
}
async function addRestaurantLocationAndGroupManually() {
  try {
    // Get restaurant name from command line arguments
    const restaurantName = process.argv[2];

    if (!restaurantName) {
      console.error('Error: Please provide a restaurant name');
      console.log(
        '\nUsage: tsx src/scripts/addRestaurantManually.ts "Restaurant Name"'
      );
      console.log(
        'Example: tsx src/scripts/addRestaurantManually.ts "Guelaguetza Restaurant"'
      );
      process.exit(1);
    }

    console.log(`\n🔍 Searching Google Places for: "${restaurantName}"\n`);

    // Search Google Places (using same field mask as findPlaceById)
    const place = await findPlaceByName(
      restaurantName,
      'places.id,places.displayName,places.addressComponents,places.location'
    );

    if (!place) {
      console.error(
        `❌ Restaurant "${restaurantName}" not found in Google Places`
      );
      process.exit(1);
    }

    // Extract place ID
    const placeId = place.id || place.name?.split('/').pop() || '';

    if (!placeId) {
      console.error('❌ No place ID found in Google Places response');
      process.exit(1);
    }

    // Check if already exists
    const existing = await checkExistingLocationByPlaceId(
      placeId,
      restaurantName,
      prisma
    );

    if (existing) {
      console.log(`\n✅ Restaurant location already exists in database:`);
      console.log(`   Group ID: ${existing.groupId}`);
      process.exit(0);
    }

    // Extract data from Google Places
    const displayName = place.displayName?.text || restaurantName;
    const latitude = place.location?.latitude;
    const longitude = place.location?.longitude;

    const { address, city, state, zipCode } = extractAddressComponents(
      place.addressComponents || []
    );

    // Display information
    console.log(`\n📋 Restaurant Information:`);
    console.log(`   Name: ${displayName}`);
    console.log(`   Street: ${address || 'N/A'}`);
    console.log(`   City: ${city || 'N/A'}`);
    console.log(`   State: ${state || 'N/A'}`);
    console.log(`   Zip: ${zipCode || 'N/A'}`);
    console.log(`   Latitude: ${latitude || 'N/A'}`);
    console.log(`   Longitude: ${longitude || 'N/A'}`);
    console.log(`   Place ID: ${placeId}`);

    // Check for nearby duplicates with similar names (within 100m)
    let nearbyLocations: NearbyLocation[] = [];
    if (latitude && longitude) {
      const distanceSQL = haversineDistanceSQL(
        latitude,
        longitude,
        'rl.latitude',
        'rl.longitude'
      );

      nearbyLocations = await prisma.$queryRaw<NearbyLocation[]>`
        SELECT
          rl.*,
          rg.name as group_name,
          ${Prisma.raw(distanceSQL)} as distance_meters
        FROM "RestaurantLocation" rl
        JOIN "RestaurantGroup" rg ON rl."groupId" = rg.id
        WHERE rl.latitude IS NOT NULL
          AND rl.longitude IS NOT NULL
          AND ${Prisma.raw(distanceSQL)} < 100
          AND similarity(rl.name, ${displayName}) > 0.5
        ORDER BY distance_meters ASC
        LIMIT 5
      `;

      if (nearbyLocations.length > 0) {
        console.log(
          `\n⚠️  Found ${nearbyLocations.length} nearby locations with similar names:`
        );
        nearbyLocations.forEach((loc, idx) => {
          console.log(
            `\n   ${idx + 1}. ${loc.name} (${loc.source}) - ${Math.round(loc.distance_meters)}m away`
          );
          console.log(`      Group: ${loc.group_name}`);
          console.log(`      Address: ${loc.address || 'N/A'}`);
          if (loc.googlePlaceId) {
            console.log(`      Google Place ID: ${loc.googlePlaceId}`);
          }
        });

        // Ask user if they want to merge with an existing location
        const answer = await promptUser(
          `\n❓ Is this the same as any of the above locations? Enter number (1-${nearbyLocations.length}) or 'n' to add as new: `
        );

        if (answer.toLowerCase() !== 'n' && answer !== '') {
          const selectedIndex = parseInt(answer, 10) - 1;

          if (
            selectedIndex >= 0 &&
            selectedIndex < nearbyLocations.length &&
            !isNaN(selectedIndex)
          ) {
            const selectedLocation = nearbyLocations[selectedIndex];
            console.log(
              `\n✅ Merging with existing location: ${selectedLocation.name} (ID: ${selectedLocation.id})`
            );

            // Perform merge
            await mergeIntoExistingLocation(
              selectedLocation,
              {
                name: displayName,
                address,
                city,
                state,
                zipCode,
                latitude: latitude || null,
                longitude: longitude || null,
                source: 'Google Places API',
                googlePlaceId: placeId,
                lookupAliases:
                  restaurantName !== displayName ? [restaurantName] : [],
                metadata: {},
              }
            );

            return;
          } else {
            console.log(`\n⚠️  Invalid selection, adding as new location...`);
          }
        } else {
          console.log(`\n➡️  Adding as new location...`);
        }
      }
    }

    // Prepare potential restaurant data
    const potentialRestaurant: PotentialRestaurant = {
      name: displayName,
      address,
      city,
      state,
      zipCode,
      latitude: latitude || null,
      longitude: longitude || null,
      source: 'Google Places API',
      googlePlaceId: placeId,
      lookupAliases: restaurantName !== displayName ? [restaurantName] : [],
      metadata: {},
    };

    // Ingest using the group ingestion logic
    console.log(`\n🔄 Processing with group ingestion logic...`);
    const result = await ingestRestaurantGroupAndLocations(
      potentialRestaurant,
      prisma
    );

    console.log(`\n✅ Restaurant added successfully!`);
    console.log(`   Location ID: ${result.locationId}`);
    console.log(`   Group ID: ${result.groupId}`);
    console.log(`   Match Phase: ${result.matchPhase}`);
    console.log(`   New Group: ${result.wasNewGroup}`);
    console.log(`   New Location: ${result.wasNewLocation}`);

    // Fetch and display the created/updated records
    const location = await prisma.restaurantLocation.findUnique({
      where: { id: result.locationId },
      include: { group: true },
    });

    if (location) {
      console.log(`\n📍 Location Details:`);
      console.log(`   Name: ${location.name}`);
      console.log(`   Group: ${location.group.name}`);
    }
  } catch (error) {
    console.error('\n❌ Error adding restaurant:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Help text
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Usage: tsx src/scripts/addRestaurantManually.ts "Restaurant Name"

Description:
  Manually add a restaurant location and group to the database using Google Places API.
  Searches for the restaurant and intelligently groups it with existing locations using
  4-phase matching logic (exact location, chain mapping, fuzzy match, word-based, new group).

Arguments:
  Restaurant Name    The name of the restaurant to add (required)

Options:
  -h, --help        Show this help message

Examples:
  # Add a restaurant by name
  tsx src/scripts/addRestaurantManually.ts "Guelaguetza Restaurant"

  # Add a restaurant with location for disambiguation
  tsx src/scripts/addRestaurantManually.ts "The Original Pantry Cafe"

Notes:
  - Restaurant must exist in Google Places
  - Automatically checks for duplicates by Google Place ID
  - Uses intelligent grouping to match with existing restaurant chains
  - If already exists, shows existing location and group info
  - Adds with source: "Google Places API"
  `);
  process.exit(0);
}

addRestaurantLocationAndGroupManually()
  .then(() => {
    console.log('\n✨ Done!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to add restaurant:', error);
    process.exit(1);
  });
