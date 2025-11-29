import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantWhereInputObjectSchema as RestaurantWhereInputObjectSchema } from './RestaurantWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => RestaurantWhereInputObjectSchema).optional(),
  some: z.lazy(() => RestaurantWhereInputObjectSchema).optional(),
  none: z.lazy(() => RestaurantWhereInputObjectSchema).optional()
}).strict();
export const RestaurantListRelationFilterObjectSchema: z.ZodType<Prisma.RestaurantListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantListRelationFilter>;
export const RestaurantListRelationFilterObjectZodSchema = makeSchema();
