import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionWhereUniqueInputObjectSchema as RestaurantExtractionWhereUniqueInputObjectSchema } from './RestaurantExtractionWhereUniqueInput.schema';
import { RestaurantExtractionCreateWithoutCommentInputObjectSchema as RestaurantExtractionCreateWithoutCommentInputObjectSchema } from './RestaurantExtractionCreateWithoutCommentInput.schema';
import { RestaurantExtractionUncheckedCreateWithoutCommentInputObjectSchema as RestaurantExtractionUncheckedCreateWithoutCommentInputObjectSchema } from './RestaurantExtractionUncheckedCreateWithoutCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantExtractionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RestaurantExtractionCreateWithoutCommentInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedCreateWithoutCommentInputObjectSchema)])
}).strict();
export const RestaurantExtractionCreateOrConnectWithoutCommentInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionCreateOrConnectWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionCreateOrConnectWithoutCommentInput>;
export const RestaurantExtractionCreateOrConnectWithoutCommentInputObjectZodSchema = makeSchema();
