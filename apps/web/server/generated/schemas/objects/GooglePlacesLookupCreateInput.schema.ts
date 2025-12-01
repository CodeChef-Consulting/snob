import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  year: z.number().int(),
  month: z.number().int(),
  googleSKU: z.string(),
  count: z.number().int().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const GooglePlacesLookupCreateInputObjectSchema: z.ZodType<Prisma.GooglePlacesLookupCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.GooglePlacesLookupCreateInput>;
export const GooglePlacesLookupCreateInputObjectZodSchema = makeSchema();
