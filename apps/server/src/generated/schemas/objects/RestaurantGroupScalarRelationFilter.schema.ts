import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupWhereInputObjectSchema as RestaurantGroupWhereInputObjectSchema } from './RestaurantGroupWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => RestaurantGroupWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => RestaurantGroupWhereInputObjectSchema).optional()
}).strict();
export const RestaurantGroupScalarRelationFilterObjectSchema: z.ZodType<Prisma.RestaurantGroupScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupScalarRelationFilter>;
export const RestaurantGroupScalarRelationFilterObjectZodSchema = makeSchema();
