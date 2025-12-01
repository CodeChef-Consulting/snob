import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  year: SortOrderSchema.optional(),
  month: SortOrderSchema.optional(),
  count: SortOrderSchema.optional()
}).strict();
export const GooglePlacesLookupAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GooglePlacesLookupAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GooglePlacesLookupAvgOrderByAggregateInput>;
export const GooglePlacesLookupAvgOrderByAggregateInputObjectZodSchema = makeSchema();
