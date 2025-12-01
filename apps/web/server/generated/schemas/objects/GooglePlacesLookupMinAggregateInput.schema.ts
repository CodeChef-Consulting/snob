import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  year: z.literal(true).optional(),
  month: z.literal(true).optional(),
  googleSKU: z.literal(true).optional(),
  count: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const GooglePlacesLookupMinAggregateInputObjectSchema: z.ZodType<Prisma.GooglePlacesLookupMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GooglePlacesLookupMinAggregateInputType>;
export const GooglePlacesLookupMinAggregateInputObjectZodSchema = makeSchema();
