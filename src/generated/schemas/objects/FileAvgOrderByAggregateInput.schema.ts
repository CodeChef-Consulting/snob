import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  commentId: SortOrderSchema.optional()
}).strict();
export const FileAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FileAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FileAvgOrderByAggregateInput>;
export const FileAvgOrderByAggregateInputObjectZodSchema = makeSchema();
