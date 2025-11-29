import * as z from 'zod';
export const RestaurantLocationCreateResultSchema = z.object({
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
});