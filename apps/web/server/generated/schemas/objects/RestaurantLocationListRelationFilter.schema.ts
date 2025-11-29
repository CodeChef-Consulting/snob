import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationWhereInputObjectSchema as RestaurantLocationWhereInputObjectSchema } from './RestaurantLocationWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => RestaurantLocationWhereInputObjectSchema).optional(),
  some: z.lazy(() => RestaurantLocationWhereInputObjectSchema).optional(),
  none: z.lazy(() => RestaurantLocationWhereInputObjectSchema).optional()
}).strict();
export const RestaurantLocationListRelationFilterObjectSchema: z.ZodType<Prisma.RestaurantLocationListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationListRelationFilter>;
export const RestaurantLocationListRelationFilterObjectZodSchema = makeSchema();
