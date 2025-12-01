import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  year: z.number().int(),
  month: z.number().int(),
  googleSKU: z.string(),
  count: z.number().int().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const GooglePlacesLookupUncheckedCreateInputObjectSchema: z.ZodType<Prisma.GooglePlacesLookupUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.GooglePlacesLookupUncheckedCreateInput>;
export const GooglePlacesLookupUncheckedCreateInputObjectZodSchema = makeSchema();
