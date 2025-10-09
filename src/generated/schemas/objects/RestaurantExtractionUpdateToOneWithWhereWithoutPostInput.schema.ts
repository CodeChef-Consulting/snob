import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionWhereInputObjectSchema as RestaurantExtractionWhereInputObjectSchema } from './RestaurantExtractionWhereInput.schema';
import { RestaurantExtractionUpdateWithoutPostInputObjectSchema as RestaurantExtractionUpdateWithoutPostInputObjectSchema } from './RestaurantExtractionUpdateWithoutPostInput.schema';
import { RestaurantExtractionUncheckedUpdateWithoutPostInputObjectSchema as RestaurantExtractionUncheckedUpdateWithoutPostInputObjectSchema } from './RestaurantExtractionUncheckedUpdateWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantExtractionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => RestaurantExtractionUpdateWithoutPostInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedUpdateWithoutPostInputObjectSchema)])
}).strict();
export const RestaurantExtractionUpdateToOneWithWhereWithoutPostInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUpdateToOneWithWhereWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUpdateToOneWithWhereWithoutPostInput>;
export const RestaurantExtractionUpdateToOneWithWhereWithoutPostInputObjectZodSchema = makeSchema();
