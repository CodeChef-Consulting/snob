import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionUpdateWithoutPostInputObjectSchema as RestaurantExtractionUpdateWithoutPostInputObjectSchema } from './RestaurantExtractionUpdateWithoutPostInput.schema';
import { RestaurantExtractionUncheckedUpdateWithoutPostInputObjectSchema as RestaurantExtractionUncheckedUpdateWithoutPostInputObjectSchema } from './RestaurantExtractionUncheckedUpdateWithoutPostInput.schema';
import { RestaurantExtractionCreateWithoutPostInputObjectSchema as RestaurantExtractionCreateWithoutPostInputObjectSchema } from './RestaurantExtractionCreateWithoutPostInput.schema';
import { RestaurantExtractionUncheckedCreateWithoutPostInputObjectSchema as RestaurantExtractionUncheckedCreateWithoutPostInputObjectSchema } from './RestaurantExtractionUncheckedCreateWithoutPostInput.schema';
import { RestaurantExtractionWhereInputObjectSchema as RestaurantExtractionWhereInputObjectSchema } from './RestaurantExtractionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => RestaurantExtractionUpdateWithoutPostInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedUpdateWithoutPostInputObjectSchema)]),
  create: z.union([z.lazy(() => RestaurantExtractionCreateWithoutPostInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedCreateWithoutPostInputObjectSchema)]),
  where: z.lazy(() => RestaurantExtractionWhereInputObjectSchema).optional()
}).strict();
export const RestaurantExtractionUpsertWithoutPostInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUpsertWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUpsertWithoutPostInput>;
export const RestaurantExtractionUpsertWithoutPostInputObjectZodSchema = makeSchema();
