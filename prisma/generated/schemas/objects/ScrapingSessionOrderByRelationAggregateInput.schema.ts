import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ScrapingSessionOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ScrapingSessionOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionOrderByRelationAggregateInput>;
export const ScrapingSessionOrderByRelationAggregateInputObjectZodSchema = makeSchema();
