import * as z from 'zod';
export const RestaurantFindUniqueResultSchema = z.nullable(z.object({
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
  posts: z.array(z.unknown()),
  comments: z.array(z.unknown())
}));