import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  rawScore: z.literal(true).optional(),
  normalizedScore: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const RestaurantGroupMaxAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantGroupMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupMaxAggregateInputType>;
export const RestaurantGroupMaxAggregateInputObjectZodSchema = makeSchema();
