import * as z from 'zod';

// prettier-ignore
export const RestaurantLocationModelSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    address: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipCode: z.string().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    source: z.string(),
    googlePlaceId: z.string().nullable(),
    lookupAliases: z.array(z.string()),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    group: z.unknown(),
    groupId: z.number().int()
}).strict();

export type RestaurantLocationModelType = z.infer<typeof RestaurantLocationModelSchema>;
