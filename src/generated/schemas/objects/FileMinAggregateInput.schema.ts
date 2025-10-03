import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  postId: z.literal(true).optional(),
  commentId: z.literal(true).optional(),
  fileUrl: z.literal(true).optional(),
  fileType: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const FileMinAggregateInputObjectSchema: z.ZodType<Prisma.FileMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FileMinAggregateInputType>;
export const FileMinAggregateInputObjectZodSchema = makeSchema();
