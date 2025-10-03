import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CommentOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentOrderByRelationAggregateInput>;
export const CommentOrderByRelationAggregateInputObjectZodSchema = makeSchema();
