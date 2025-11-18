import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  rawScore: z.literal(true).optional()
}).strict();
export const RestaurantAvgAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantAvgAggregateInputType>;
export const RestaurantAvgAggregateInputObjectZodSchema = makeSchema();
