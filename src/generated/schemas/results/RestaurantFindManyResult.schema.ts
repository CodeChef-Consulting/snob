import * as z from 'zod';
export const RestaurantFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  cuisine: z.string().optional(),
  priceRange: z.string().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  posts: z.array(z.unknown())
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