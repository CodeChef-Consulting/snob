import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  commentId: SortOrderSchema.optional(),
  fileUrl: SortOrderSchema.optional(),
  fileType: SortOrderSchema.optional(),
  metadata: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const FileCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FileCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FileCountOrderByAggregateInput>;
export const FileCountOrderByAggregateInputObjectZodSchema = makeSchema();
