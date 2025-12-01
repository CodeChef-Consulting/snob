import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  year: SortOrderSchema.optional(),
  month: SortOrderSchema.optional(),
  count: SortOrderSchema.optional()
}).strict();
export const GooglePlacesLookupSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GooglePlacesLookupSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GooglePlacesLookupSumOrderByAggregateInput>;
export const GooglePlacesLookupSumOrderByAggregateInputObjectZodSchema = makeSchema();
