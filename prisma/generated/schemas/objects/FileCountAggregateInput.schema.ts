import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  postId: z.literal(true).optional(),
  commentId: z.literal(true).optional(),
  fileUrl: z.literal(true).optional(),
  fileType: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const FileCountAggregateInputObjectSchema: z.ZodType<Prisma.FileCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FileCountAggregateInputType>;
export const FileCountAggregateInputObjectZodSchema = makeSchema();
