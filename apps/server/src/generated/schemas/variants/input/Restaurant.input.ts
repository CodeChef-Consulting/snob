import * as z from 'zod';

// prettier-ignore
export const RestaurantInputSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    address: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    state: z.string().optional().nullable(),
    zipCode: z.string().optional().nullable(),
    latitude: z.number().optional().nullable(),
    longitude: z.number().optional().nullable(),
    source: z.string(),
    googlePlaceId: z.string().optional().nullable(),
    lookupAliases: z.string().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    rawScore: z.number().optional().nullable(),
    normalizedScore: z.number().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    posts: z.array(z.unknown()),
    comments: z.array(z.unknown())
}).strict();

export type RestaurantInputType = z.infer<typeof RestaurantInputSchema>;
