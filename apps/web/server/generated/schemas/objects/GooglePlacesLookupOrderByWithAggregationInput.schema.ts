import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { GooglePlacesLookupCountOrderByAggregateInputObjectSchema as GooglePlacesLookupCountOrderByAggregateInputObjectSchema } from './GooglePlacesLookupCountOrderByAggregateInput.schema';
import { GooglePlacesLookupAvgOrderByAggregateInputObjectSchema as GooglePlacesLookupAvgOrderByAggregateInputObjectSchema } from './GooglePlacesLookupAvgOrderByAggregateInput.schema';
import { GooglePlacesLookupMaxOrderByAggregateInputObjectSchema as GooglePlacesLookupMaxOrderByAggregateInputObjectSchema } from './GooglePlacesLookupMaxOrderByAggregateInput.schema';
import { GooglePlacesLookupMinOrderByAggregateInputObjectSchema as GooglePlacesLookupMinOrderByAggregateInputObjectSchema } from './GooglePlacesLookupMinOrderByAggregateInput.schema';
import { GooglePlacesLookupSumOrderByAggregateInputObjectSchema as GooglePlacesLookupSumOrderByAggregateInputObjectSchema } from './GooglePlacesLookupSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  year: SortOrderSchema.optional(),
  month: SortOrderSchema.optional(),
  googleSKU: SortOrderSchema.optional(),
  count: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => GooglePlacesLookupCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => GooglePlacesLookupAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => GooglePlacesLookupMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => GooglePlacesLookupMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => GooglePlacesLookupSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const GooglePlacesLookupOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.GooglePlacesLookupOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.GooglePlacesLookupOrderByWithAggregationInput>;
export const GooglePlacesLookupOrderByWithAggregationInputObjectZodSchema = makeSchema();
