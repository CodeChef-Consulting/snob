import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema';
import { CommentUpdateWithoutRestaurantExtractionInputObjectSchema as CommentUpdateWithoutRestaurantExtractionInputObjectSchema } from './CommentUpdateWithoutRestaurantExtractionInput.schema';
import { CommentUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema as CommentUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema } from './CommentUncheckedUpdateWithoutRestaurantExtractionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CommentUpdateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema)])
}).strict();
export const CommentUpdateToOneWithWhereWithoutRestaurantExtractionInputObjectSchema: z.ZodType<Prisma.CommentUpdateToOneWithWhereWithoutRestaurantExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateToOneWithWhereWithoutRestaurantExtractionInput>;
export const CommentUpdateToOneWithWhereWithoutRestaurantExtractionInputObjectZodSchema = makeSchema();
