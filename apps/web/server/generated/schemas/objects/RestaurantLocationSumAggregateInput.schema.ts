import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  latitude: z.literal(true).optional(),
  longitude: z.literal(true).optional(),
  groupId: z.literal(true).optional()
}).strict();
export const RestaurantLocationSumAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantLocationSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationSumAggregateInputType>;
export const RestaurantLocationSumAggregateInputObjectZodSchema = makeSchema();
