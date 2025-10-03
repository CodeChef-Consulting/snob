import * as z from 'zod';

// prettier-ignore
export const RestaurantResultSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    address: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipCode: z.string().nullable(),
    phone: z.string().nullable(),
    website: z.string().nullable(),
    cuisine: z.string().nullable(),
    priceRange: z.string().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    posts: z.array(z.unknown())
}).strict();

export type RestaurantResultType = z.infer<typeof RestaurantResultSchema>;
