import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentUpdateWithoutRestaurantExtractionInputObjectSchema as CommentUpdateWithoutRestaurantExtractionInputObjectSchema } from './CommentUpdateWithoutRestaurantExtractionInput.schema';
import { CommentUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema as CommentUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema } from './CommentUncheckedUpdateWithoutRestaurantExtractionInput.schema';
import { CommentCreateWithoutRestaurantExtractionInputObjectSchema as CommentCreateWithoutRestaurantExtractionInputObjectSchema } from './CommentCreateWithoutRestaurantExtractionInput.schema';
import { CommentUncheckedCreateWithoutRestaurantExtractionInputObjectSchema as CommentUncheckedCreateWithoutRestaurantExtractionInputObjectSchema } from './CommentUncheckedCreateWithoutRestaurantExtractionInput.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CommentUpdateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema)]),
  create: z.union([z.lazy(() => CommentCreateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRestaurantExtractionInputObjectSchema)]),
  where: z.lazy(() => CommentWhereInputObjectSchema).optional()
}).strict();
export const CommentUpsertWithoutRestaurantExtractionInputObjectSchema: z.ZodType<Prisma.CommentUpsertWithoutRestaurantExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpsertWithoutRestaurantExtractionInput>;
export const CommentUpsertWithoutRestaurantExtractionInputObjectZodSchema = makeSchema();
