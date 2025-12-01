import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  year: z.boolean().optional(),
  month: z.boolean().optional(),
  googleSKU: z.boolean().optional(),
  count: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const GooglePlacesLookupSelectObjectSchema: z.ZodType<Prisma.GooglePlacesLookupSelect> = makeSchema() as unknown as z.ZodType<Prisma.GooglePlacesLookupSelect>;
export const GooglePlacesLookupSelectObjectZodSchema = makeSchema();
