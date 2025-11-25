import { PlacesClient, protos } from '@googlemaps/places';
import { PrismaClient } from '@repo/db';
import Fuse from 'fuse.js';
import { calculateDistance } from './haversineQuery';
import {
  ingestRestaurantGroupAndLocations,
  type PotentialRestaurant,
} from './restaurantGroupIngestion';
import { calculateMergedData } from './restaurantLocationMerge';

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
 * @param fieldMask Optional field mask to control which fields are returned (default: full details)
 */
export async function findPlaceByName(
  restaurantName: string,
  location: string = 'Los Angeles, CA',
  fieldMask: string = 'places.id,places.displayName,places.addressComponents,places.location'
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
          'X-Goog-FieldMask': fieldMask,
        },
      },
    });

    if (response.places && response.places.length > 0) {
      return response.places[0] || null;
    }

    return null;
  } catch (error) {
    console.error(`   ⚠️  Google Places API error:`, error);
    throw error;
  }
}

//find place by id
export async function findPlaceById(
  placeId: string
): Promise<protos.google.maps.places.v1.IPlace | null> {
  const client = getPlacesClient();
  if (!client) {
    return null;
  }
  try {
    const request: protos.google.maps.places.v1.IGetPlaceRequest = {
      name: `places/${placeId}`,
    };
    const [response] = await client.getPlace(request);
    return response || null;
  } catch (error) {
    console.error(
      `   ⚠️  Google Places API error for place ID "${placeId}":`,
      error
    );
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

export interface GooglePlacesGroupResult {
  groupId: number | null;
  hadError: boolean;
}

/**
 * Check if a restaurant location already exists in DB by Google Place ID
 * If found and restaurantName is a new alias, adds it to lookupAliases
 *
 * @returns Object with groupId if found, null if not found
 */
export async function checkExistingLocationByPlaceId(
  placeId: string,
  restaurantName: string,
  prisma: PrismaClient
): Promise<GooglePlacesGroupResult> {
  const normalizedName = restaurantName.trim().toLowerCase();

  const existingLocation = await prisma.restaurantLocation.findUnique({
    where: { googlePlaceId: placeId },
    select: { id: true, name: true, lookupAliases: true, groupId: true },
  });

  if (!existingLocation) {
    return { groupId: null, hadError: false };
  }

  console.log(
    `   ℹ️  Found via Google (already in DB): "${existingLocation.name}" (Group ID: ${existingLocation.groupId})`
  );

  // If this is a new alias for an existing location, add it
  const existingAliases = existingLocation.lookupAliases || [];

  if (
    normalizedName !== existingLocation.name.trim().toLowerCase() &&
    !existingAliases.some((a) => a === normalizedName)
  ) {
    const updatedAliases = [...existingAliases, normalizedName];

    await prisma.restaurantLocation.update({
      where: { id: existingLocation.id },
      data: { lookupAliases: updatedAliases },
    });

    console.log(
      `   ✨ Added new alias "${normalizedName}" to location "${existingLocation.name}"`
    );
  }

  return { groupId: existingLocation.groupId, hadError: false };
}

/**
 * Lookup and add a restaurant location with Google Places API
 * Creates a RestaurantLocation, tries to find matching RestaurantGroup via fuzzy matching,
 * and creates both if no group exists
 *
 * @param restaurantName Name extracted from post/comment
 * @param prisma Prisma client
 * @param stats Google Places statistics tracker
 * @param restaurantLocationNameFuse Fuse instance for finding matching groups by location name
 * @param restaurantLocations Array of locations to update with new location
 * @returns Object with groupId if successful, null if failed/not found
 */
export async function lookupAndAddRestaurantLocationAndGroup(
  restaurantName: string,
  placeId: string,

  prisma: PrismaClient,
  stats: GooglePlacesStats,
  restaurantLocationNameFuse: Fuse<{
    id: number;
    name: string;
    groupId: number;
  }>
): Promise<GooglePlacesGroupResult> {
  stats.googlePlacesLookups++;

  try {
    // Not in DB - fetch full details with second API call
    const place = await findPlaceById(placeId);

    if (!place) {
      stats.googlePlacesFailed++;
      return { groupId: null, hadError: false };
    }

    if (!place.location?.latitude || !place.location?.longitude) {
      stats.googlePlacesFailed++;
      console.log(`   ⚠️  No latitude or longitude found in response`);
      console.log(`   ⚠️  Google Places response:`, place);
      return { groupId: null, hadError: true };
    }

    // Extract data from Google Places response (only fields in field mask)
    const displayName = place.displayName?.text || restaurantName;
    const latitude = place.location?.latitude;
    const longitude = place.location?.longitude;

    const { address, city, state, zipCode } = extractAddressComponents(
      place.addressComponents || []
    );

    // If the searched name differs from the canonical name, add it as a lookup alias
    const normalizedName = restaurantName.trim().toLowerCase();
    const canonicalNameNormalized = displayName.trim().toLowerCase();
    const lookupAliases =
      normalizedName !== canonicalNameNormalized ? [normalizedName] : [];

    // Try to find a matching RestaurantGroup using fuzzy name matching + lat/lng distance
    const locationMatches = restaurantLocationNameFuse.search(displayName);
    let groupId: number | null = null;

    // If we have coordinates, check distance for fuzzy matches
    if (
      latitude &&
      longitude &&
      locationMatches.length > 0 &&
      locationMatches[0].score !== undefined &&
      locationMatches[0].score < 0.3
    ) {
      // Get the full location data with coordinates
      const candidateLocation = await prisma.restaurantLocation.findUnique({
        where: { id: locationMatches[0].item.id },
        select: {
          id: true,
          name: true,
          latitude: true,
          longitude: true,
          groupId: true,
        },
      });

      if (candidateLocation?.latitude && candidateLocation?.longitude) {
        // Calculate Haversine distance
        const distanceMeters = await calculateDistance(
          prisma,
          latitude,
          longitude,
          candidateLocation.latitude,
          candidateLocation.longitude
        );

        // Accept if name matches AND distance is reasonable (< 100m)
        if (distanceMeters < 100) {
          groupId = candidateLocation.groupId;
          console.log(
            `   🔗 Matched to existing location: "${candidateLocation.name}" (ID: ${candidateLocation.id}, distance: ${distanceMeters.toFixed(1)}m)`
          );

          // Update existing location with Google Places data using merge strategy
          const existingLocation = await prisma.restaurantLocation.findUnique({
            where: { id: candidateLocation.id },
          });

          if (existingLocation) {
            // Create a virtual "Google Places" location to merge with existing
            const googlePlaceLocation = {
              id: -1, // Dummy ID
              name: displayName,
              source: 'Google Places API',
              googlePlaceId: placeId,
              lookupAliases,
              metadata: {},
              createdAt: new Date(), // New, so will be loser
            };

            // Use the same merge logic as mergeDuplicateRestaurantLocations
            const {
              finalName,
              finalGooglePlaceId,
              finalAliases,
              finalMetadata,
            } = calculateMergedData([existingLocation, googlePlaceLocation]);

            await prisma.restaurantLocation.update({
              where: { id: candidateLocation.id },
              data: {
                name: finalName,
                googlePlaceId: finalGooglePlaceId,
                lookupAliases: finalAliases,
                metadata: finalMetadata,
              },
            });

            console.log(
              `   ✨ Updated existing location "${existingLocation.name}" → "${finalName}" (aliases: ${finalAliases.length})`
            );

            stats.googlePlacesAdded++;
            return { groupId, hadError: false };
          }
        } else {
          console.log(
            `   ⚠️  Name match but too far: "${candidateLocation.name}" (distance: ${distanceMeters.toFixed(0)}m > 100m threshold)`
          );
        }
      }
    }

    // If no distance match, use the 4-phase gauntlet to find/create group
    if (groupId === null) {
      const potentialRestaurant: PotentialRestaurant = {
        name: displayName,
        address,
        city,
        state,
        zipCode,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        source: 'Google Places API',
        googlePlaceId: placeId,
        lookupAliases,
        metadata: {},
      };

      // Use the 4-phase gauntlet (Phase 0: exact, Phase 1: chains, Phase 2: fuzzy, Phase 3: word-based, Phase 4: new)
      const ingestionResult = await ingestRestaurantGroupAndLocations(
        potentialRestaurant,
        prisma,
        undefined // No chain mappings for Google Places lookups
      );

      groupId = ingestionResult.groupId;
      const location = await prisma.restaurantLocation.findUnique({
        where: { id: ingestionResult.locationId },
      });

      console.log(
        `   🎯 Used 4-phase gauntlet: ${ingestionResult.matchPhase}, Group ID: ${groupId}, ${ingestionResult.wasNewGroup ? 'NEW' : 'EXISTING'} group, ${ingestionResult.wasNewLocation ? 'NEW' : 'EXISTING'} location`
      );

      stats.googlePlacesAdded++;

      // Update array and Fuse index with new location
      if (location) {
        const newLocation = {
          id: location.id,
          name: location.name,
          groupId: location.groupId,
        };
        restaurantLocationNameFuse.add(newLocation);
        console.log(`   ✨ Updated Fuse index with new Location`);
      }

      // Rate limiting: Wait 500ms between API calls
      await new Promise((resolve) => setTimeout(resolve, 500));

      return { groupId, hadError: false };
    }

    // If we found a group via distance match, we already updated the location above
    // Rate limiting and return
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { groupId, hadError: false };
  } catch (error) {
    stats.googlePlacesFailed++;
    console.error(`   ⚠️  Google Places error for "${restaurantName}":`, error);
    return { groupId: null, hadError: true }; // Error occurred
  }
}
