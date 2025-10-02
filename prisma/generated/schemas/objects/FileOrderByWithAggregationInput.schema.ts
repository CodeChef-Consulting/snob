import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { FileCountOrderByAggregateInputObjectSchema } from './FileCountOrderByAggregateInput.schema';
import { FileAvgOrderByAggregateInputObjectSchema } from './FileAvgOrderByAggregateInput.schema';
import { FileMaxOrderByAggregateInputObjectSchema } from './FileMaxOrderByAggregateInput.schema';
import { FileMinOrderByAggregateInputObjectSchema } from './FileMinOrderByAggregateInput.schema';
import { FileSumOrderByAggregateInputObjectSchema } from './FileSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  commentId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fileUrl: SortOrderSchema.optional(),
  fileType: SortOrderSchema.optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => FileCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => FileAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => FileMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => FileMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => FileSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const FileOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.FileOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.FileOrderByWithAggregationInput>;
export const FileOrderByWithAggregationInputObjectZodSchema = makeSchema();
