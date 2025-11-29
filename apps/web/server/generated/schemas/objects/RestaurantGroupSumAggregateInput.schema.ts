import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  rawScore: z.literal(true).optional(),
  normalizedScore: z.literal(true).optional()
}).strict();
export const RestaurantGroupSumAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantGroupSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupSumAggregateInputType>;
export const RestaurantGroupSumAggregateInputObjectZodSchema = makeSchema();
