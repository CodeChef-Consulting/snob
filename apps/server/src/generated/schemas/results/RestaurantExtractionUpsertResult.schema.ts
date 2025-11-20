import * as z from 'zod';
export const RestaurantExtractionUpsertResultSchema = z.object({
  id: z.number().int(),
  post: z.unknown().optional(),
  postId: z.number().int().optional(),
  comment: z.unknown().optional(),
  commentId: z.number().int().optional(),
  restaurantsMentioned: z.string().optional(),
  primaryRestaurant: z.string().optional(),
  dishesMentioned: z.array(z.string()),
  isSubjective: z.boolean(),
  attemptedLinkToRestaurantsMentioned: z.boolean(),
  extractedAt: z.date(),
  model: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});