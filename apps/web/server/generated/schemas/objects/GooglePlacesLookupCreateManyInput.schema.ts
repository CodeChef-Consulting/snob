import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  year: z.number().int(),
  month: z.number().int(),
  googleSKU: z.string(),
  count: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const GooglePlacesLookupCreateManyInputObjectSchema: z.ZodType<Prisma.GooglePlacesLookupCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.GooglePlacesLookupCreateManyInput>;
export const GooglePlacesLookupCreateManyInputObjectZodSchema = makeSchema();
