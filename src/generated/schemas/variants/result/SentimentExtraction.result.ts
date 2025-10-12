import * as z from 'zod';

// prettier-ignore
export const SentimentExtractionResultSchema = z.object({
    id: z.number().int(),
    post: z.unknown().nullable(),
    postId: z.number().int().nullable(),
    comment: z.unknown().nullable(),
    commentId: z.number().int().nullable(),
    rawAiScore: z.number(),
    extractedAt: z.date(),
    model: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type SentimentExtractionResultType = z.infer<typeof SentimentExtractionResultSchema>;
