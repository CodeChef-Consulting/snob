import { PlacesClient, protos } from '@googlemaps/places';
import { PrismaClient } from '@prisma/client';
import Fuse from 'fuse.js';
import _ from 'lodash';

// Lazy initialization for Places API client
let placesClient: PlacesClient | null = null;

export function getPlacesClient(): PlacesClient | null {
  if (!placesClient) {
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.warn(
        '⚠️  GOOGLE_API_KEY not set - skipping Google Places lookups'
      );
      return null;
    }

    placesClient = new PlacesClient({
      apiKey,
    });
  }

  return placesClient;
}

/**
 * Query Google Places API to find a restaurant
 */
export async function findPlaceByName(
  restaurantName: string,
  location: string = 'Los Angeles, CA'
): Promise<protos.google.maps.places.v1.IPlace | null> {
  const client = getPlacesClient();

  if (!client) {
    return null;
  }

  try {
    const request: protos.google.maps.places.v1.ISearchTextRequest = {
      textQuery: `${restaurantName} food drink ${location}`,
      locationBias: {
        circle: {
          center: {
            latitude: 34.0522,
            longitude: -118.2437,
          },
          radius: 50000, // 50km radius around LA
        },
      },
    };

    const [response] = await client.searchText(request, {
      otherArgs: {
        headers: {
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.formattedAddress,places.addressComponents,places.rating,places.priceLevel,places.types,places.nationalPhoneNumber,places.websiteUri',
        },
      },
    });

    if (response.places && response.places.length > 0) {
      return response.places[0];
    }

    return null;
  } catch (error) {
    console.error(`   ⚠️  Google Places API error:`, error);
    throw error;
  }
}

/**
 * Extract address components from Google Places addressComponents
 */
export function extractAddressComponents(
  addressComponents?: protos.google.maps.places.v1.Place.IAddressComponent[]
) {
  if (!addressComponents || addressComponents.length === 0) {
    return { address: null, city: null, state: null, zipCode: null };
  }

  let streetNumber = '';
  let route = '';
  let city = null;
  let state = null;
  let zipCode = null;

  for (const component of addressComponents) {
    const types = component.types || [];

    if (types.includes('street_number')) {
      streetNumber = component.longText || '';
    } else if (types.includes('route')) {
      route = component.longText || '';
    } else if (types.includes('locality')) {
      city = component.longText || null;
    } else if (types.includes('administrative_area_level_1')) {
      state = component.shortText || null;
    } else if (types.includes('postal_code')) {
      zipCode = component.longText || null;
    }
  }

  const address = [streetNumber, route].filter(Boolean).join(' ') || null;

  return { address, city, state, zipCode };
}

export interface GooglePlacesStats {
  googlePlacesLookups: number;
  googlePlacesAdded: number;
  googlePlacesFailed: number;
}

export interface GooglePlacesResult {
  restaurantId: number | null;
  hadError: boolean;
}

/**
 * Attempt to add restaurant via Google Places API
 * Updates Fuse index with newly added restaurants
 * Checks lookupAliases for exact matches before making API calls
 * Checks address-based fuzzy match first to prevent duplicates
 * Returns { restaurantId, hadError } to distinguish API errors from not found
 */
export async function lookupAndAddRestaurant(
  restaurantName: string,
  prisma: PrismaClient,
  stats: GooglePlacesStats,
  fuse: Fuse<{ id: number; name: string }>,
  restaurants: { id: number; name: string }[],
  addressFuse: Fuse<{ id: number; address: string }> | null = null
): Promise<GooglePlacesResult> {
  // Check if any Google Places restaurant has this as a lookupAlias (exact match)
  const normalizedName = restaurantName.trim().toLowerCase();

  stats.googlePlacesLookups++;

  try {
    const place = await findPlaceByName(restaurantName);

    if (!place) {
      stats.googlePlacesFailed++;
      return { restaurantId: null, hadError: false }; // Not found, but no error
    }

    // Extract place ID from the resource name (format: "places/{place_id}")
    const placeId = place.id || place.name?.split('/').pop() || '';

    if (!placeId) {
      stats.googlePlacesFailed++;
      console.log(`   ⚠️  No place ID found in response`);
      return { restaurantId: null, hadError: false };
    }

    // Check if we already have this place_id
    const existing = await prisma.restaurant.findUnique({
      where: { googlePlaceId: placeId },
      select: { id: true, name: true, lookupAliases: true },
    });

    if (existing) {
      console.log(
        `   ℹ️  Found via Google (already in DB): "${existing.name}"`
      );

      // If this is a new alias for an existing restaurant, add it
      const existingAliases = existing.lookupAliases
        ? existing.lookupAliases.split(',')
        : [];

      // Add new alias if it's different from the canonical name
      if (
        normalizedName !== existing.name.trim().toLowerCase() &&
        !existingAliases.some((a) => a === normalizedName)
      ) {
        const updatedAliases = [...existingAliases, normalizedName].join(',');

        await prisma.restaurant.update({
          where: { id: existing.id },
          data: { lookupAliases: updatedAliases },
        });

        console.log(
          `   ✨ Added new alias "${normalizedName}" to "${existing.name}"`
        );
      }

      return { restaurantId: existing.id, hadError: false };
    }

    // Extract data from the new API response format
    const displayName = place.displayName?.text || restaurantName;
    const formattedAddress = place.formattedAddress || '';
    const rating = place.rating;
    const priceLevel = place.priceLevel;
    const types = place.types || [];
    const nationalPhoneNumber = place.nationalPhoneNumber;
    const websiteUri = place.websiteUri;

    // Create new restaurant from Google Places data
    const { address, city, state, zipCode } = extractAddressComponents(
      place.addressComponents || []
    );

    // If the searched name differs from the canonical name, add it as a lookup alias
    const canonicalNameNormalized = displayName.trim().toLowerCase();
    const lookupAliases =
      normalizedName !== canonicalNameNormalized ? normalizedName : null;

    // Check if a non-Google Places restaurant exists with similar address
    if (addressFuse && formattedAddress) {
      const addressResults = addressFuse.search(formattedAddress);
      if (
        addressResults.length > 0 &&
        addressResults[0].score !== undefined &&
        addressResults[0].score < 0.3
      ) {
        const existingRestaurant = await prisma.restaurant.findUnique({
          where: { id: addressResults[0].item.id },
          select: { id: true, name: true, source: true },
        });

        if (existingRestaurant) {
          console.log(
            `   🔗 Address match found: "${restaurantName}" → existing "${existingRestaurant.name}" (source: ${existingRestaurant.source}, address score: ${addressResults[0].score.toFixed(3)})`
          );
          return { restaurantId: existingRestaurant.id, hadError: false };
        }
      }
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name: displayName,
        address,
        city,
        state,
        zipCode,
        source: 'Google Places API',
        googlePlaceId: placeId,
        lookupAliases,
        metadata: {
          rating,
          priceLevel,
          types,
          formattedAddress,
          nationalPhoneNumber,
          websiteUri,
        },
      },
    });

    stats.googlePlacesAdded++;
    console.log(
      `   🌐 Added via Google Places: "${displayName}" at ${formattedAddress}`
    );

    // Add new restaurant to the array and update Fuse index
    const newRestaurant = { id: restaurant.id, name: displayName };
    restaurants.push(newRestaurant);
    fuse.setCollection(restaurants);
    console.log(
      `   ✨ Updated Fuse index with new restaurant (total: ${restaurants.length})`
    );

    // Rate limiting: Wait 500ms between API calls
    await new Promise((resolve) => setTimeout(resolve, 500));

    return { restaurantId: restaurant.id, hadError: false };
  } catch (error) {
    stats.googlePlacesFailed++;
    console.error(`   ⚠️  Google Places error for "${restaurantName}":`, error);
    return { restaurantId: null, hadError: true }; // Error occurred
  }
}
