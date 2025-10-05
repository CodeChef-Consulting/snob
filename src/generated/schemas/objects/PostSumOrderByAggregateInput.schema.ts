import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  score: SortOrderSchema.optional(),
  upvoteRatio: SortOrderSchema.optional(),
  numComments: SortOrderSchema.optional()
}).strict();
export const PostSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PostSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PostSumOrderByAggregateInput>;
export const PostSumOrderByAggregateInputObjectZodSchema = makeSchema();
