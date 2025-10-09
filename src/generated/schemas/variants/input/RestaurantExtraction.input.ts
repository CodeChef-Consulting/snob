import * as z from 'zod';

// prettier-ignore
export const RestaurantExtractionInputSchema = z.object({
    id: z.number().int(),
    post: z.unknown().optional().nullable(),
    postId: z.number().int().optional().nullable(),
    comment: z.unknown().optional().nullable(),
    commentId: z.number().int().optional().nullable(),
    restaurantsMentioned: z.string(),
    primaryRestaurant: z.string(),
    dishesMentioned: z.string(),
    isSubjective: z.boolean(),
    extractedAt: z.date(),
    model: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type RestaurantExtractionInputType = z.infer<typeof RestaurantExtractionInputSchema>;
