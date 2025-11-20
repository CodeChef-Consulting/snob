import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  address: z.literal(true).optional(),
  city: z.literal(true).optional(),
  state: z.literal(true).optional(),
  zipCode: z.literal(true).optional(),
  latitude: z.literal(true).optional(),
  longitude: z.literal(true).optional(),
  source: z.literal(true).optional(),
  googlePlaceId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  groupId: z.literal(true).optional()
}).strict();
export const RestaurantLocationMinAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantLocationMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationMinAggregateInputType>;
export const RestaurantLocationMinAggregateInputObjectZodSchema = makeSchema();
