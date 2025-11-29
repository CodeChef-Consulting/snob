import * as z from 'zod';

// prettier-ignore
export const RestaurantGroupModelSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    rawScore: z.number().nullable(),
    normalizedScore: z.number().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    locations: z.array(z.unknown()),
    posts: z.array(z.unknown()),
    comments: z.array(z.unknown())
}).strict();

export type RestaurantGroupModelType = z.infer<typeof RestaurantGroupModelSchema>;
