import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CommentWhereInputObjectSchema).optional(),
  some: z.lazy(() => CommentWhereInputObjectSchema).optional(),
  none: z.lazy(() => CommentWhereInputObjectSchema).optional()
}).strict();
export const CommentListRelationFilterObjectSchema: z.ZodType<Prisma.CommentListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CommentListRelationFilter>;
export const CommentListRelationFilterObjectZodSchema = makeSchema();
