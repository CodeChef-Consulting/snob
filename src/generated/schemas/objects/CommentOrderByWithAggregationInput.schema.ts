import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CommentCountOrderByAggregateInputObjectSchema as CommentCountOrderByAggregateInputObjectSchema } from './CommentCountOrderByAggregateInput.schema';
import { CommentAvgOrderByAggregateInputObjectSchema as CommentAvgOrderByAggregateInputObjectSchema } from './CommentAvgOrderByAggregateInput.schema';
import { CommentMaxOrderByAggregateInputObjectSchema as CommentMaxOrderByAggregateInputObjectSchema } from './CommentMaxOrderByAggregateInput.schema';
import { CommentMinOrderByAggregateInputObjectSchema as CommentMinOrderByAggregateInputObjectSchema } from './CommentMinOrderByAggregateInput.schema';
import { CommentSumOrderByAggregateInputObjectSchema as CommentSumOrderByAggregateInputObjectSchema } from './CommentSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  externalId: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  parentCommentId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  author: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  body: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  score: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdUtc: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CommentCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CommentAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CommentMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CommentMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CommentSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CommentOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentOrderByWithAggregationInput>;
export const CommentOrderByWithAggregationInputObjectZodSchema = makeSchema();
