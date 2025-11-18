import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PostOrderByRelationAggregateInputObjectSchema as PostOrderByRelationAggregateInputObjectSchema } from './PostOrderByRelationAggregateInput.schema';
import { CommentOrderByRelationAggregateInputObjectSchema as CommentOrderByRelationAggregateInputObjectSchema } from './CommentOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  subreddit: SortOrderSchema.optional(),
  mode: SortOrderSchema.optional(),
  timeframe: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  searchQuery: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastPostId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastPostTimestamp: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  postsScraped: SortOrderSchema.optional(),
  completed: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputObjectSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ScrapingSessionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ScrapingSessionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionOrderByWithRelationInput>;
export const ScrapingSessionOrderByWithRelationInputObjectZodSchema = makeSchema();
