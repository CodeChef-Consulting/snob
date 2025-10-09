import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionWhereInputObjectSchema as RestaurantExtractionWhereInputObjectSchema } from './RestaurantExtractionWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => RestaurantExtractionWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => RestaurantExtractionWhereInputObjectSchema).optional().nullable()
}).strict();
export const RestaurantExtractionNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.RestaurantExtractionNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionNullableScalarRelationFilter>;
export const RestaurantExtractionNullableScalarRelationFilterObjectZodSchema = makeSchema();
