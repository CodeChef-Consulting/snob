import * as z from 'zod';

export const RestaurantExtractionScalarFieldEnumSchema = z.enum(['id', 'postId', 'commentId', 'restaurantsMentioned', 'primaryRestaurant', 'dishesMentioned', 'isSubjective', 'attemptedLinkToRestaurantsMentioned', 'extractedAt', 'model', 'createdAt', 'updatedAt'])

export type RestaurantExtractionScalarFieldEnum = z.infer<typeof RestaurantExtractionScalarFieldEnumSchema>;