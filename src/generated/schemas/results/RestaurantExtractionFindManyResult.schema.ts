import * as z from 'zod';
export const RestaurantExtractionFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  post: z.unknown().optional(),
  postId: z.number().int().optional(),
  comment: z.unknown().optional(),
  commentId: z.number().int().optional(),
  restaurantsMentioned: z.string(),
  primaryRestaurant: z.string(),
  dishesMentioned: z.string(),
  isSubjective: z.boolean(),
  extractedAt: z.date(),
  model: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});