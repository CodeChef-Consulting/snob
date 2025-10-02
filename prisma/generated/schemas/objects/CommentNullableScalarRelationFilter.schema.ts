import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereInputObjectSchema } from './CommentWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CommentWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => CommentWhereInputObjectSchema).optional().nullable()
}).strict();
export const CommentNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.CommentNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CommentNullableScalarRelationFilter>;
export const CommentNullableScalarRelationFilterObjectZodSchema = makeSchema();
