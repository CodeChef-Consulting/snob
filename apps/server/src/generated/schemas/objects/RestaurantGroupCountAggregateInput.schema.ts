import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  rawScore: z.literal(true).optional(),
  normalizedScore: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const RestaurantGroupCountAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantGroupCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupCountAggregateInputType>;
export const RestaurantGroupCountAggregateInputObjectZodSchema = makeSchema();
