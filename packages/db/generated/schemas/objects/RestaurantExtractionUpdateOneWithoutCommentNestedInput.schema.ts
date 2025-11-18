import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionCreateWithoutCommentInputObjectSchema as RestaurantExtractionCreateWithoutCommentInputObjectSchema } from './RestaurantExtractionCreateWithoutCommentInput.schema';
import { RestaurantExtractionUncheckedCreateWithoutCommentInputObjectSchema as RestaurantExtractionUncheckedCreateWithoutCommentInputObjectSchema } from './RestaurantExtractionUncheckedCreateWithoutCommentInput.schema';
import { RestaurantExtractionCreateOrConnectWithoutCommentInputObjectSchema as RestaurantExtractionCreateOrConnectWithoutCommentInputObjectSchema } from './RestaurantExtractionCreateOrConnectWithoutCommentInput.schema';
import { RestaurantExtractionUpsertWithoutCommentInputObjectSchema as RestaurantExtractionUpsertWithoutCommentInputObjectSchema } from './RestaurantExtractionUpsertWithoutCommentInput.schema';
import { RestaurantExtractionWhereInputObjectSchema as RestaurantExtractionWhereInputObjectSchema } from './RestaurantExtractionWhereInput.schema';
import { RestaurantExtractionWhereUniqueInputObjectSchema as RestaurantExtractionWhereUniqueInputObjectSchema } from './RestaurantExtractionWhereUniqueInput.schema';
import { RestaurantExtractionUpdateToOneWithWhereWithoutCommentInputObjectSchema as RestaurantExtractionUpdateToOneWithWhereWithoutCommentInputObjectSchema } from './RestaurantExtractionUpdateToOneWithWhereWithoutCommentInput.schema';
import { RestaurantExtractionUpdateWithoutCommentInputObjectSchema as RestaurantExtractionUpdateWithoutCommentInputObjectSchema } from './RestaurantExtractionUpdateWithoutCommentInput.schema';
import { RestaurantExtractionUncheckedUpdateWithoutCommentInputObjectSchema as RestaurantExtractionUncheckedUpdateWithoutCommentInputObjectSchema } from './RestaurantExtractionUncheckedUpdateWithoutCommentInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantExtractionCreateWithoutCommentInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedCreateWithoutCommentInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RestaurantExtractionCreateOrConnectWithoutCommentInputObjectSchema).optional(),
  upsert: z.lazy(() => RestaurantExtractionUpsertWithoutCommentInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => RestaurantExtractionWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => RestaurantExtractionWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => RestaurantExtractionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => RestaurantExtractionUpdateToOneWithWhereWithoutCommentInputObjectSchema), z.lazy(() => RestaurantExtractionUpdateWithoutCommentInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedUpdateWithoutCommentInputObjectSchema)]).optional()
}).strict();
export const RestaurantExtractionUpdateOneWithoutCommentNestedInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUpdateOneWithoutCommentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUpdateOneWithoutCommentNestedInput>;
export const RestaurantExtractionUpdateOneWithoutCommentNestedInputObjectZodSchema = makeSchema();
