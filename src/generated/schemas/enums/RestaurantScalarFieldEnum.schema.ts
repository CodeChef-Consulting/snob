import * as z from 'zod';

export const RestaurantScalarFieldEnumSchema = z.enum(['id', 'name', 'address', 'city', 'state', 'zipCode', 'source', 'googlePlaceId', 'metadata', 'createdAt', 'updatedAt'])

export type RestaurantScalarFieldEnum = z.infer<typeof RestaurantScalarFieldEnumSchema>;