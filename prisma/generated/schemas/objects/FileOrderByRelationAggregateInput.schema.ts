import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const FileOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.FileOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FileOrderByRelationAggregateInput>;
export const FileOrderByRelationAggregateInputObjectZodSchema = makeSchema();
