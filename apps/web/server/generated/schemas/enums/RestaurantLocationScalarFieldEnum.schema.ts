import * as z from 'zod';

export const RestaurantLocationScalarFieldEnumSchema = z.enum(['id', 'name', 'address', 'city', 'state', 'zipCode', 'latitude', 'longitude', 'source', 'googlePlaceId', 'lookupAliases', 'metadata', 'createdAt', 'updatedAt', 'groupId'])

export type RestaurantLocationScalarFieldEnum = z.infer<typeof RestaurantLocationScalarFieldEnumSchema>;