import * as z from 'zod';

// prettier-ignore
export const GooglePlacesLookupModelSchema = z.object({
    id: z.number().int(),
    year: z.number().int(),
    month: z.number().int(),
    googleSKU: z.string(),
    count: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type GooglePlacesLookupModelType = z.infer<typeof GooglePlacesLookupModelSchema>;
