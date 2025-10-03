import * as z from 'zod';

// prettier-ignore
export const RestaurantInputSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    address: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    state: z.string().optional().nullable(),
    zipCode: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    website: z.string().optional().nullable(),
    cuisine: z.string().optional().nullable(),
    priceRange: z.string().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    posts: z.array(z.unknown())
}).strict();

export type RestaurantInputType = z.infer<typeof RestaurantInputSchema>;
