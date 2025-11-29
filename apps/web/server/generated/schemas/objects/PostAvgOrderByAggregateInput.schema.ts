import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  score: SortOrderSchema.optional(),
  ups: SortOrderSchema.optional(),
  downs: SortOrderSchema.optional(),
  upvoteRatio: SortOrderSchema.optional(),
  numComments: SortOrderSchema.optional(),
  gilded: SortOrderSchema.optional(),
  scrapingSessionId: SortOrderSchema.optional()
}).strict();
export const PostAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PostAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PostAvgOrderByAggregateInput>;
export const PostAvgOrderByAggregateInputObjectZodSchema = makeSchema();
