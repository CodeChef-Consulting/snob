import { PlacesClient, protos } from '@googlemaps/places';
import { PrismaClient } from '@repo/db';
import Fuse from 'fuse.js';
import _ from 'lodash';
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
      return response.places[0] || null;
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

export interface GooglePlacesGroupResult {
  groupId: number | null;
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
      const existingAliases = existing.lookupAliases || [];

      // Add new alias if it's different from the canonical name
      if (
        normalizedName !== existing.name.trim().toLowerCase() &&
        !existingAliases.some((a) => a === normalizedName)
      ) {
        const updatedAliases = [...existingAliases, normalizedName];

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
    const latitude = place.location?.latitude;
    const longitude = place.location?.longitude;

    // Create new restaurant from Google Places data
    const { address, city, state, zipCode } = extractAddressComponents(
      place.addressComponents || []
    );

    // If the searched name differs from the canonical name, add it as a lookup alias
    const canonicalNameNormalized = displayName.trim().toLowerCase();
    const lookupAliases =
      normalizedName !== canonicalNameNormalized ? [normalizedName] : [];

    // Check if a similar restaurant exists using pg_trgm
    if (formattedAddress) {
      const candidates = await prisma.$queryRaw<
        Array<{
          id: number;
          name: string;
          address: string | null;
          source: string;
          googlePlaceId: string | null;
          lookupAliases: string[];
          metadata: any;
          createdAt: Date;
          latitude: number | null;
          longitude: number | null;
          name_sim: number;
          addr_sim: number | null;
        }>
      >`
        SELECT
          r.*,
          similarity(r.name, ${displayName}) as name_sim,
          CASE
            WHEN r.address IS NOT NULL
            THEN similarity(r.address, ${formattedAddress})
            ELSE NULL
          END as addr_sim
        FROM "Restaurant" r
        WHERE similarity(r.name, ${displayName}) > 0.85
        LIMIT 5
      `;

      // Find best match with avg similarity > 91%
      for (const candidate of candidates) {
        const nameSim = candidate.name_sim;
        const addrSim = candidate.addr_sim;

        // Calculate average similarity
        const avgSim = addrSim !== null ? (nameSim + addrSim) / 2 : nameSim;

        if (avgSim > 0.91) {
          console.log(
            `   🔗 High similarity match found: "${displayName}" → existing "${candidate.name}" (source: ${candidate.source}, name: ${(nameSim * 100).toFixed(1)}%, addr: ${addrSim ? (addrSim * 100).toFixed(1) : 'N/A'}%, avg: ${(avgSim * 100).toFixed(1)}%)`
          );

          // Determine final values using merge strategy
          const finalName =
            candidate.source === 'Open Data Portal'
              ? displayName // Use Google Place name if merging into Open Data Portal
              : candidate.name;

          const finalGooglePlaceId = candidate.googlePlaceId || placeId;

          // Merge aliases
          const existingAliases = candidate.lookupAliases || [];
          const finalAliases = _.compact(
            _.uniq([...existingAliases, ...lookupAliases])
          );

          // Merge metadata (new data takes priority for new keys)
          const newMetadata = {
            rating,
            priceLevel,
            types,
            nationalPhoneNumber,
            websiteUri,
          };
          const finalMetadata = _.merge(
            {},
            candidate.metadata || {},
            newMetadata
          );

          // Update existing restaurant
          await prisma.restaurant.update({
            where: { id: candidate.id },
            data: {
              name: finalName,
              googlePlaceId: finalGooglePlaceId,
              lookupAliases: finalAliases,
              metadata: finalMetadata,
              // Update coordinates if they didn't exist
              ...((!candidate.latitude || !candidate.longitude) &&
              latitude &&
              longitude
                ? { latitude, longitude }
                : {}),
            },
          });

          console.log(
            `   ✨ Merged Google Place data into existing restaurant ID ${candidate.id}`
          );

          return { restaurantId: candidate.id, hadError: false };
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
          latitude,
          longitude,
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
  prisma: PrismaClient,
  stats: GooglePlacesStats,
  restaurantLocationNameFuse: Fuse<{
    id: number;
    name: string;
    groupId: number;
  }>,
  restaurantLocations: { id: number; name: string; groupId: number }[]
): Promise<GooglePlacesGroupResult> {
  const normalizedName = restaurantName.trim().toLowerCase();
  stats.googlePlacesLookups++;

  try {
    const place = await findPlaceByName(restaurantName);

    if (!place) {
      stats.googlePlacesFailed++;
      return { groupId: null, hadError: false }; // Not found, but no error
    }

    // Extract place ID from the resource name (format: "places/{place_id}")
    const placeId = place.id || place.name?.split('/').pop() || '';

    if (!placeId) {
      stats.googlePlacesFailed++;
      console.log(`   ⚠️  No place ID found in response`);
      return { groupId: null, hadError: false };
    }

    // Check if we already have this place_id as a RestaurantLocation
    const existingLocation = await prisma.restaurantLocation.findUnique({
      where: { googlePlaceId: placeId },
      select: { id: true, name: true, lookupAliases: true, groupId: true },
    });

    if (existingLocation) {
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

    // Extract data from Google Places response
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

    // If the searched name differs from the canonical name, add it as a lookup alias
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
              metadata: {
                rating,
                priceLevel,
                types,
                formattedAddress,
                nationalPhoneNumber,
                websiteUri,
              },
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
        metadata: {
          rating,
          priceLevel,
          types,
          formattedAddress,
          nationalPhoneNumber,
          websiteUri,
        },
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
        restaurantLocations.push(newLocation);
        restaurantLocationNameFuse.setCollection(restaurantLocations);
        console.log(
          `   ✨ Updated Fuse index with new location (total: ${restaurantLocations.length})`
        );
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
