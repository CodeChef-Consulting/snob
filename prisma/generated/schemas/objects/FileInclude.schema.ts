import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostArgsObjectSchema } from './PostArgs.schema';
import { CommentArgsObjectSchema } from './CommentArgs.schema'

const makeSchema = () => z.object({
  post: z.union([z.boolean(), z.lazy(() => PostArgsObjectSchema)]).optional(),
  comment: z.union([z.boolean(), z.lazy(() => CommentArgsObjectSchema)]).optional()
}).strict();
export const FileIncludeObjectSchema: z.ZodType<Prisma.FileInclude> = makeSchema() as unknown as z.ZodType<Prisma.FileInclude>;
export const FileIncludeObjectZodSchema = makeSchema();
