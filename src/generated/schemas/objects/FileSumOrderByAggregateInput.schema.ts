import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  commentId: SortOrderSchema.optional()
}).strict();
export const FileSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FileSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FileSumOrderByAggregateInput>;
export const FileSumOrderByAggregateInputObjectZodSchema = makeSchema();
