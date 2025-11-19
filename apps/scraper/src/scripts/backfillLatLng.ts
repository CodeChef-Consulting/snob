import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

if (!MAPBOX_TOKEN) {
  console.error('❌ MAPBOX_ACCESS_TOKEN environment variable is required');
  console.error('Get a free token at: https://account.mapbox.com/');
  process.exit(1);
}

async function geocodeWithMapbox(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      console.error(`  ✗ Mapbox error ${response.status}: ${text.substring(0, 200)}`);
      return null;
    }

    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      return { lat, lng };
    }
    return null;
  } catch (error) {
    console.error(`  ✗ Geocoding exception:`, error);
    return null;
  }
}

async function backfillLatLng() {
  console.log('Starting lat/lng backfill...\n');

  // Get all restaurants without lat/lng
  const restaurants = await prisma.restaurant.findMany({
    where: {
      OR: [{ latitude: null }, { longitude: null }],
    },
    orderBy: { id: 'asc' },
  });

  console.log(`Found ${restaurants.length} restaurants needing geocoding\n`);

  let fromMetadata = 0;
  let fromGeocoding = 0;
  let failed = 0;

  for (let i = 0; i < restaurants.length; i++) {
    const restaurant = restaurants[i]!;
    console.log(
      `[${i + 1}/${restaurants.length}] Processing: ${restaurant.name}`
    );

    let lat: number | null = null;
    let lng: number | null = null;

    // Try to extract from metadata first
    if (restaurant.metadata && typeof restaurant.metadata === 'object') {
      const metadata = restaurant.metadata as any;

      // Open Data Portal format
      if (metadata.coordinates?.latitude && metadata.coordinates?.longitude) {
        lat = parseFloat(metadata.coordinates.latitude);
        lng = parseFloat(metadata.coordinates.longitude);
        console.log(`  ✓ Found in metadata (Open Data Portal)`);
        fromMetadata++;
      }
      // Google Places format
      else if (metadata.geometry?.location) {
        lat = metadata.geometry.location.lat;
        lng = metadata.geometry.location.lng;
        console.log(`  ✓ Found in metadata (Google Places)`);
        fromMetadata++;
      }
    }

    // If not in metadata, try geocoding with Mapbox
    if (lat === null || lng === null) {
      if (restaurant.address && restaurant.city && restaurant.state) {
        const address = `${restaurant.address}, ${restaurant.city}, ${restaurant.state}${restaurant.zipCode ? ' ' + restaurant.zipCode : ''}`;
        console.log(`  → Geocoding with Mapbox: ${address}`);

        const coords = await geocodeWithMapbox(address);

        if (coords) {
          lat = coords.lat;
          lng = coords.lng;
          console.log(`  ✓ Geocoded successfully: ${lat}, ${lng}`);
          fromGeocoding++;
        } else {
          console.log(`  ✗ Geocoding failed`);
          failed++;
        }
      } else {
        console.log(`  ✗ Missing address data`);
        failed++;
      }
    }

    // Update restaurant with lat/lng
    if (lat !== null && lng !== null) {
      await prisma.restaurant.update({
        where: { id: restaurant.id },
        data: { latitude: lat, longitude: lng },
      });
    }

    console.log('');
  }

  console.log('\n=== Backfill Complete ===');
  console.log(`From metadata: ${fromMetadata}`);
  console.log(`From geocoding: ${fromGeocoding}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total processed: ${restaurants.length}`);
}

backfillLatLng()
  .then(() => {
    console.log('\nDone!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
