import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  year: SortOrderSchema.optional(),
  month: SortOrderSchema.optional(),
  googleSKU: SortOrderSchema.optional(),
  count: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const GooglePlacesLookupOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.GooglePlacesLookupOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.GooglePlacesLookupOrderByWithRelationInput>;
export const GooglePlacesLookupOrderByWithRelationInputObjectZodSchema = makeSchema();
