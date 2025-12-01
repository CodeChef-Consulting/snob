import * as z from 'zod';
export const GooglePlacesLookupFindFirstResultSchema = z.nullable(z.object({
  id: z.number().int(),
  year: z.number().int(),
  month: z.number().int(),
  googleSKU: z.string(),
  count: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date()
}));