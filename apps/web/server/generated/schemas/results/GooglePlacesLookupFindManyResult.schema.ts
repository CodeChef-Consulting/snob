import * as z from 'zod';
export const GooglePlacesLookupFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  year: z.number().int(),
  month: z.number().int(),
  googleSKU: z.string(),
  count: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});