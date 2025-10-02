import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateManyParentCommentInputObjectSchema } from './CommentCreateManyParentCommentInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CommentCreateManyParentCommentInputObjectSchema), z.lazy(() => CommentCreateManyParentCommentInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CommentCreateManyParentCommentInputEnvelopeObjectSchema: z.ZodType<Prisma.CommentCreateManyParentCommentInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateManyParentCommentInputEnvelope>;
export const CommentCreateManyParentCommentInputEnvelopeObjectZodSchema = makeSchema();
