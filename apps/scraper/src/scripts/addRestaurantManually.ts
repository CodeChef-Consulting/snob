import { PrismaClient } from '@repo/db';
import {
  findPlaceByName,
  extractAddressComponents,
} from '../utils/googlePlaces';
import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

const prisma = new PrismaClient();

async function addRestaurantManually() {
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

    // Search Google Places
    const place = await findPlaceByName(restaurantName);

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
    const existing = await prisma.restaurant.findUnique({
      where: { googlePlaceId: placeId },
    });

    if (existing) {
      console.log(`\n✅ Restaurant already exists in database:`);
      console.log(`   ID: ${existing.id}`);
      console.log(`   Name: ${existing.name}`);
      console.log(
        `   Address: ${existing.address}, ${existing.city}, ${existing.state} ${existing.zipCode}`
      );
      console.log(`   Source: ${existing.source}`);
      process.exit(0);
    }

    // Extract data from Google Places
    const displayName = place.displayName?.text || restaurantName;
    const formattedAddress = place.formattedAddress || '';
    const rating = place.rating;
    const priceLevel = place.priceLevel;
    const types = place.types || [];
    const nationalPhoneNumber = place.nationalPhoneNumber;
    const websiteUri = place.websiteUri;
    const latitude = place.location?.latitude;
    const longitude = place.location?.longitude;

    const { address, city, state, zipCode } = extractAddressComponents(
      place.addressComponents || []
    );

    // Display information
    console.log(`\n📋 Restaurant Information:`);
    console.log(`   Name: ${displayName}`);
    console.log(`   Address: ${formattedAddress}`);
    console.log(`   Street: ${address || 'N/A'}`);
    console.log(`   City: ${city || 'N/A'}`);
    console.log(`   State: ${state || 'N/A'}`);
    console.log(`   Zip: ${zipCode || 'N/A'}`);
    console.log(`   Rating: ${rating || 'N/A'}`);
    console.log(`   Price Level: ${priceLevel || 'N/A'}`);
    console.log(`   Phone: ${nationalPhoneNumber || 'N/A'}`);
    console.log(`   Website: ${websiteUri || 'N/A'}`);
    console.log(`   Types: ${types.join(', ') || 'N/A'}`);
    console.log(`   Place ID: ${placeId}`);

    // Create restaurant
    const restaurant = await prisma.restaurant.create({
      data: {
        name: displayName,
        address,
        city,
        state,
        zipCode,
        source: 'Google Places API',
        googlePlaceId: placeId,
        metadata: {
          rating,
          priceLevel,
          types,
          formattedAddress,
          nationalPhoneNumber,
          websiteUri,
          latitude,
          longitude,
        },
      },
    });

    console.log(`\n✅ Restaurant added successfully!`);
    console.log(`   Database ID: ${restaurant.id}`);
    console.log(`   Name: ${restaurant.name}`);
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
  Manually add a restaurant to the database using Google Places API.
  Searches for the restaurant and adds it with complete metadata.

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
  - If already exists, shows existing restaurant info
  - Adds with source: "Google Places API"
  `);
  process.exit(0);
}

addRestaurantManually()
  .then(() => {
    console.log('\n✨ Done!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to add restaurant:', error);
    process.exit(1);
  });
