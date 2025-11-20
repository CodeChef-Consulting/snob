import * as z from 'zod';
export const RestaurantGroupFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  name: z.string(),
  rawScore: z.number().optional(),
  normalizedScore: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  locations: z.array(z.unknown()),
  posts: z.array(z.unknown()),
  comments: z.array(z.unknown())
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