import { z } from 'zod';

export const RestaurantScalarFieldEnumSchema = z.enum(['id', 'name', 'address', 'city', 'state', 'zipCode', 'phone', 'website', 'cuisine', 'priceRange', 'metadata', 'createdAt', 'updatedAt'])

export type RestaurantScalarFieldEnum = z.infer<typeof RestaurantScalarFieldEnumSchema>;