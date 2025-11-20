import * as z from 'zod';
export const RestaurantLocationFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  source: z.string(),
  googlePlaceId: z.string().optional(),
  lookupAliases: z.array(z.string()),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  group: z.unknown(),
  groupId: z.number().int()
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