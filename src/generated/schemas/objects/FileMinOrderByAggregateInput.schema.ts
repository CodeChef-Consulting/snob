import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  commentId: SortOrderSchema.optional(),
  fileUrl: SortOrderSchema.optional(),
  fileType: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const FileMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FileMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FileMinOrderByAggregateInput>;
export const FileMinOrderByAggregateInputObjectZodSchema = makeSchema();
