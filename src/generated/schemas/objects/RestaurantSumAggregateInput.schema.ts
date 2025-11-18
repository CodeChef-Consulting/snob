import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  rawScore: z.literal(true).optional()
}).strict();
export const RestaurantSumAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantSumAggregateInputType>;
export const RestaurantSumAggregateInputObjectZodSchema = makeSchema();
