import * as z from 'zod';

// prettier-ignore
export const RestaurantExtractionResultSchema = z.object({
    id: z.number().int(),
    post: z.unknown().nullable(),
    postId: z.number().int().nullable(),
    comment: z.unknown().nullable(),
    commentId: z.number().int().nullable(),
    restaurantsMentioned: z.string(),
    primaryRestaurant: z.string(),
    dishesMentioned: z.string(),
    isSubjective: z.boolean(),
    attemptedLinkToRestaurantsMentioned: z.boolean(),
    extractedAt: z.date(),
    model: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type RestaurantExtractionResultType = z.infer<typeof RestaurantExtractionResultSchema>;
