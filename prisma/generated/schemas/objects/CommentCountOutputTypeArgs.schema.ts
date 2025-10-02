import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCountOutputTypeSelectObjectSchema } from './CommentCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CommentCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const CommentCountOutputTypeArgsObjectSchema = makeSchema();
export const CommentCountOutputTypeArgsObjectZodSchema = makeSchema();
