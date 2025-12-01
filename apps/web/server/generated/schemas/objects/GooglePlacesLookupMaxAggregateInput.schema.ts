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
export const GooglePlacesLookupMaxAggregateInputObjectSchema: z.ZodType<Prisma.GooglePlacesLookupMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GooglePlacesLookupMaxAggregateInputType>;
export const GooglePlacesLookupMaxAggregateInputObjectZodSchema = makeSchema();
