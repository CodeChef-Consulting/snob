import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentCreateWithoutRestaurantExtractionInputObjectSchema as CommentCreateWithoutRestaurantExtractionInputObjectSchema } from './CommentCreateWithoutRestaurantExtractionInput.schema';
import { CommentUncheckedCreateWithoutRestaurantExtractionInputObjectSchema as CommentUncheckedCreateWithoutRestaurantExtractionInputObjectSchema } from './CommentUncheckedCreateWithoutRestaurantExtractionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CommentCreateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRestaurantExtractionInputObjectSchema)])
}).strict();
export const CommentCreateOrConnectWithoutRestaurantExtractionInputObjectSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutRestaurantExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateOrConnectWithoutRestaurantExtractionInput>;
export const CommentCreateOrConnectWithoutRestaurantExtractionInputObjectZodSchema = makeSchema();
