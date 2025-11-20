import * as z from 'zod';
export const RestaurantGroupUpdateResultSchema = z.nullable(z.object({
  id: z.number().int(),
  name: z.string(),
  rawScore: z.number().optional(),
  normalizedScore: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  locations: z.array(z.unknown()),
  posts: z.array(z.unknown()),
  comments: z.array(z.unknown())
}));