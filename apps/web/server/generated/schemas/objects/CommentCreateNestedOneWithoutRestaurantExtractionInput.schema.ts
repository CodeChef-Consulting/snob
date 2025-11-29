import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutRestaurantExtractionInputObjectSchema as CommentCreateWithoutRestaurantExtractionInputObjectSchema } from './CommentCreateWithoutRestaurantExtractionInput.schema';
import { CommentUncheckedCreateWithoutRestaurantExtractionInputObjectSchema as CommentUncheckedCreateWithoutRestaurantExtractionInputObjectSchema } from './CommentUncheckedCreateWithoutRestaurantExtractionInput.schema';
import { CommentCreateOrConnectWithoutRestaurantExtractionInputObjectSchema as CommentCreateOrConnectWithoutRestaurantExtractionInputObjectSchema } from './CommentCreateOrConnectWithoutRestaurantExtractionInput.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRestaurantExtractionInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutRestaurantExtractionInputObjectSchema).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputObjectSchema).optional()
}).strict();
export const CommentCreateNestedOneWithoutRestaurantExtractionInputObjectSchema: z.ZodType<Prisma.CommentCreateNestedOneWithoutRestaurantExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateNestedOneWithoutRestaurantExtractionInput>;
export const CommentCreateNestedOneWithoutRestaurantExtractionInputObjectZodSchema = makeSchema();
