import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupWhereInputObjectSchema as RestaurantGroupWhereInputObjectSchema } from './RestaurantGroupWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => RestaurantGroupWhereInputObjectSchema).optional(),
  some: z.lazy(() => RestaurantGroupWhereInputObjectSchema).optional(),
  none: z.lazy(() => RestaurantGroupWhereInputObjectSchema).optional()
}).strict();
export const RestaurantGroupListRelationFilterObjectSchema: z.ZodType<Prisma.RestaurantGroupListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupListRelationFilter>;
export const RestaurantGroupListRelationFilterObjectZodSchema = makeSchema();
