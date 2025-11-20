import * as z from 'zod';

export const RestaurantGroupScalarFieldEnumSchema = z.enum(['id', 'name', 'rawScore', 'normalizedScore', 'createdAt', 'updatedAt'])

export type RestaurantGroupScalarFieldEnum = z.infer<typeof RestaurantGroupScalarFieldEnumSchema>;