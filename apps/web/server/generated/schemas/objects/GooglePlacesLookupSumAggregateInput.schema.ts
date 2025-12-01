import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  year: z.literal(true).optional(),
  month: z.literal(true).optional(),
  count: z.literal(true).optional()
}).strict();
export const GooglePlacesLookupSumAggregateInputObjectSchema: z.ZodType<Prisma.GooglePlacesLookupSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GooglePlacesLookupSumAggregateInputType>;
export const GooglePlacesLookupSumAggregateInputObjectZodSchema = makeSchema();
