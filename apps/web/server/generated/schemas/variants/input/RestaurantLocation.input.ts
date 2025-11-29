import * as z from 'zod';

// prettier-ignore
export const RestaurantLocationInputSchema = z.object({
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
    lookupAliases: z.array(z.string()),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    group: z.unknown(),
    groupId: z.number().int()
}).strict();

export type RestaurantLocationInputType = z.infer<typeof RestaurantLocationInputSchema>;
