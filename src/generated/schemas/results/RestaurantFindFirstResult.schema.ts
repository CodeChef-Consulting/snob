import * as z from 'zod';
export const RestaurantFindFirstResultSchema = z.nullable(z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  source: z.string(),
  googlePlaceId: z.string().optional(),
  lookupAliases: z.string().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  posts: z.array(z.unknown()),
  comments: z.array(z.unknown())
}));