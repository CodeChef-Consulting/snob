import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionUpdateWithoutCommentInputObjectSchema as RestaurantExtractionUpdateWithoutCommentInputObjectSchema } from './RestaurantExtractionUpdateWithoutCommentInput.schema';
import { RestaurantExtractionUncheckedUpdateWithoutCommentInputObjectSchema as RestaurantExtractionUncheckedUpdateWithoutCommentInputObjectSchema } from './RestaurantExtractionUncheckedUpdateWithoutCommentInput.schema';
import { RestaurantExtractionCreateWithoutCommentInputObjectSchema as RestaurantExtractionCreateWithoutCommentInputObjectSchema } from './RestaurantExtractionCreateWithoutCommentInput.schema';
import { RestaurantExtractionUncheckedCreateWithoutCommentInputObjectSchema as RestaurantExtractionUncheckedCreateWithoutCommentInputObjectSchema } from './RestaurantExtractionUncheckedCreateWithoutCommentInput.schema';
import { RestaurantExtractionWhereInputObjectSchema as RestaurantExtractionWhereInputObjectSchema } from './RestaurantExtractionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => RestaurantExtractionUpdateWithoutCommentInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedUpdateWithoutCommentInputObjectSchema)]),
  create: z.union([z.lazy(() => RestaurantExtractionCreateWithoutCommentInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedCreateWithoutCommentInputObjectSchema)]),
  where: z.lazy(() => RestaurantExtractionWhereInputObjectSchema).optional()
}).strict();
export const RestaurantExtractionUpsertWithoutCommentInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUpsertWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUpsertWithoutCommentInput>;
export const RestaurantExtractionUpsertWithoutCommentInputObjectZodSchema = makeSchema();
