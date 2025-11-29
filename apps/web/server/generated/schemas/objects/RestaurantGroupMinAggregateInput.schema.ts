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
export const RestaurantGroupMinAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantGroupMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupMinAggregateInputType>;
export const RestaurantGroupMinAggregateInputObjectZodSchema = makeSchema();
