import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  postId: z.literal(true).optional(),
  commentId: z.literal(true).optional(),
  restaurantsMentioned: z.literal(true).optional(),
  primaryRestaurant: z.literal(true).optional(),
  dishesMentioned: z.literal(true).optional(),
  isSubjective: z.literal(true).optional(),
  attemptedLinkToRestaurantsMentioned: z.literal(true).optional(),
  extractedAt: z.literal(true).optional(),
  model: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const RestaurantExtractionCountAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionCountAggregateInputType>;
export const RestaurantExtractionCountAggregateInputObjectZodSchema = makeSchema();
