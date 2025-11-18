import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionCreateWithoutCommentInputObjectSchema as RestaurantExtractionCreateWithoutCommentInputObjectSchema } from './RestaurantExtractionCreateWithoutCommentInput.schema';
import { RestaurantExtractionUncheckedCreateWithoutCommentInputObjectSchema as RestaurantExtractionUncheckedCreateWithoutCommentInputObjectSchema } from './RestaurantExtractionUncheckedCreateWithoutCommentInput.schema';
import { RestaurantExtractionCreateOrConnectWithoutCommentInputObjectSchema as RestaurantExtractionCreateOrConnectWithoutCommentInputObjectSchema } from './RestaurantExtractionCreateOrConnectWithoutCommentInput.schema';
import { RestaurantExtractionWhereUniqueInputObjectSchema as RestaurantExtractionWhereUniqueInputObjectSchema } from './RestaurantExtractionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantExtractionCreateWithoutCommentInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedCreateWithoutCommentInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RestaurantExtractionCreateOrConnectWithoutCommentInputObjectSchema).optional(),
  connect: z.lazy(() => RestaurantExtractionWhereUniqueInputObjectSchema).optional()
}).strict();
export const RestaurantExtractionUncheckedCreateNestedOneWithoutCommentInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUncheckedCreateNestedOneWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUncheckedCreateNestedOneWithoutCommentInput>;
export const RestaurantExtractionUncheckedCreateNestedOneWithoutCommentInputObjectZodSchema = makeSchema();
