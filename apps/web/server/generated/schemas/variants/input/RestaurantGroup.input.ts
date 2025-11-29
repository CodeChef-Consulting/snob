import * as z from 'zod';

// prettier-ignore
export const RestaurantGroupInputSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    rawScore: z.number().optional().nullable(),
    normalizedScore: z.number().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    locations: z.array(z.unknown()),
    posts: z.array(z.unknown()),
    comments: z.array(z.unknown())
}).strict();

export type RestaurantGroupInputType = z.infer<typeof RestaurantGroupInputSchema>;
