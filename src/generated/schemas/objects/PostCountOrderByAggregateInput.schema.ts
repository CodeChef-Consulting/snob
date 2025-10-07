import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  externalId: SortOrderSchema.optional(),
  subreddit: SortOrderSchema.optional(),
  author: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  body: SortOrderSchema.optional(),
  score: SortOrderSchema.optional(),
  ups: SortOrderSchema.optional(),
  downs: SortOrderSchema.optional(),
  upvoteRatio: SortOrderSchema.optional(),
  numComments: SortOrderSchema.optional(),
  gilded: SortOrderSchema.optional(),
  permalink: SortOrderSchema.optional(),
  createdUtc: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  scrapingSessionId: SortOrderSchema.optional()
}).strict();
export const PostCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCountOrderByAggregateInput>;
export const PostCountOrderByAggregateInputObjectZodSchema = makeSchema();
