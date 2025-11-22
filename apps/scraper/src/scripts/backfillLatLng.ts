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
      console.error(
        `  ✗ Mapbox error ${response.status}: ${text.substring(0, 200)}`
      );
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

  // Get all restaurantLocations without lat/lng or where lat equals lng
  const allLocations = await prisma.restaurantLocation.findMany({
    where: {
      OR: [
        { latitude: null },
        { longitude: null },
        // Get all locations with both lat/lng to check if they're equal
        {
          AND: [{ latitude: { not: null } }, { longitude: { not: null } }],
        },
      ],
    },
    orderBy: { id: 'asc' },
  });

  // Filter out locations where latitude incorrectly equals longitude
  const restaurantLocations = allLocations.filter(
    (loc) =>
      loc.latitude === null ||
      loc.longitude === null ||
      loc.latitude === loc.longitude
  );

  console.log(
    `Found ${restaurantLocations.length} restaurantLocations needing geocoding\n`
  );

  let fromMetadata = 0;
  let fromGeocoding = 0;
  let failed = 0;

  for (let i = 0; i < restaurantLocations.length; i++) {
    const restaurantLocation = restaurantLocations[i]!;
    console.log(
      `[${i + 1}/${restaurantLocations.length}] Processing: ${restaurantLocation.name}`
    );

    let lat: number | null = null;
    let lng: number | null = null;

    // Try to extract from metadata first
    if (
      restaurantLocation.metadata &&
      typeof restaurantLocation.metadata === 'object'
    ) {
      const metadata = restaurantLocation.metadata as any;

      // Open Data Portal format
      if (
        metadata.coordinates?.latitude &&
        metadata.coordinates?.longitude &&
        metadata.coordinates.latitude !== metadata.coordinates.longitude
      ) {
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
      if (
        restaurantLocation.address &&
        restaurantLocation.city &&
        restaurantLocation.state
      ) {
        const address = `${restaurantLocation.address}, ${restaurantLocation.city}, ${restaurantLocation.state}${restaurantLocation.zipCode ? ' ' + restaurantLocation.zipCode : ''}`;
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

    // Update restaurantLocation with lat/lng
    if (lat !== null && lng !== null) {
      await prisma.restaurantLocation.update({
        where: { id: restaurantLocation.id },
        data: { latitude: lat, longitude: lng },
      });
    }

    console.log('');
  }

  console.log('\n=== Backfill Complete ===');
  console.log(`From metadata: ${fromMetadata}`);
  console.log(`From geocoding: ${fromGeocoding}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total processed: ${restaurantLocations.length}`);
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
