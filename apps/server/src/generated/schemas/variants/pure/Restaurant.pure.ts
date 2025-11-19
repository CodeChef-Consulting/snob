import * as z from 'zod';

// prettier-ignore
export const RestaurantModelSchema = z.object({
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
    lookupAliases: z.string().nullable(),
    metadata: z.unknown().nullable(),
    rawScore: z.number().nullable(),
    normalizedScore: z.number().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    posts: z.array(z.unknown()),
    comments: z.array(z.unknown())
}).strict();

export type RestaurantModelType = z.infer<typeof RestaurantModelSchema>;
