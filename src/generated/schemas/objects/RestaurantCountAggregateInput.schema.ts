import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  address: z.literal(true).optional(),
  city: z.literal(true).optional(),
  state: z.literal(true).optional(),
  zipCode: z.literal(true).optional(),
  source: z.literal(true).optional(),
  googlePlaceId: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const RestaurantCountAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantCountAggregateInputType>;
export const RestaurantCountAggregateInputObjectZodSchema = makeSchema();
