import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentSelectObjectSchema as CommentSelectObjectSchema } from './CommentSelect.schema';
import { CommentIncludeObjectSchema as CommentIncludeObjectSchema } from './CommentInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CommentSelectObjectSchema).optional(),
  include: z.lazy(() => CommentIncludeObjectSchema).optional()
}).strict();
export const CommentArgsObjectSchema = makeSchema();
export const CommentArgsObjectZodSchema = makeSchema();
