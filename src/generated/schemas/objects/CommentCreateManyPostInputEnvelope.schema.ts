import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCommentCreateManyPostInputObjectSchema as CommentCreateManyPostInputObjectSchema } from './CommentCreateManyPostInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CommentCreateManyPostInputObjectSchema), z.lazy(() => CommentCreateManyPostInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CommentCreateManyPostInputEnvelopeObjectSchema: z.ZodType<Prisma.CommentCreateManyPostInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateManyPostInputEnvelope>;
export const CommentCreateManyPostInputEnvelopeObjectZodSchema = makeSchema();
