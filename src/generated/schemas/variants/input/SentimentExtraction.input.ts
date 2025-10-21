import * as z from 'zod';

// prettier-ignore
export const SentimentExtractionInputSchema = z.object({
    id: z.number().int(),
    post: z.unknown().optional().nullable(),
    postId: z.number().int().optional().nullable(),
    comment: z.unknown().optional().nullable(),
    commentId: z.number().int().optional().nullable(),
    rawAiScore: z.number().optional().nullable(),
    extractedAt: z.date(),
    model: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type SentimentExtractionInputType = z.infer<typeof SentimentExtractionInputSchema>;
