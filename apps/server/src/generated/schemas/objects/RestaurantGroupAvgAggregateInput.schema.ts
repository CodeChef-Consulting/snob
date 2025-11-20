import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  rawScore: z.literal(true).optional(),
  normalizedScore: z.literal(true).optional()
}).strict();
export const RestaurantGroupAvgAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantGroupAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupAvgAggregateInputType>;
export const RestaurantGroupAvgAggregateInputObjectZodSchema = makeSchema();
