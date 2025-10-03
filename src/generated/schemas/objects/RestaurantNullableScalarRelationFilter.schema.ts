import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantWhereInputObjectSchema as RestaurantWhereInputObjectSchema } from './RestaurantWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => RestaurantWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => RestaurantWhereInputObjectSchema).optional().nullable()
}).strict();
export const RestaurantNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.RestaurantNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantNullableScalarRelationFilter>;
export const RestaurantNullableScalarRelationFilterObjectZodSchema = makeSchema();
