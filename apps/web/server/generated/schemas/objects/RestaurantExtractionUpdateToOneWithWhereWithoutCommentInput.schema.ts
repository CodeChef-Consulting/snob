import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionWhereInputObjectSchema as RestaurantExtractionWhereInputObjectSchema } from './RestaurantExtractionWhereInput.schema';
import { RestaurantExtractionUpdateWithoutCommentInputObjectSchema as RestaurantExtractionUpdateWithoutCommentInputObjectSchema } from './RestaurantExtractionUpdateWithoutCommentInput.schema';
import { RestaurantExtractionUncheckedUpdateWithoutCommentInputObjectSchema as RestaurantExtractionUncheckedUpdateWithoutCommentInputObjectSchema } from './RestaurantExtractionUncheckedUpdateWithoutCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantExtractionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => RestaurantExtractionUpdateWithoutCommentInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedUpdateWithoutCommentInputObjectSchema)])
}).strict();
export const RestaurantExtractionUpdateToOneWithWhereWithoutCommentInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUpdateToOneWithWhereWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUpdateToOneWithWhereWithoutCommentInput>;
export const RestaurantExtractionUpdateToOneWithWhereWithoutCommentInputObjectZodSchema = makeSchema();
