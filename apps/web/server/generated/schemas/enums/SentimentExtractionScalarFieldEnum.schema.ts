import * as z from 'zod';

export const SentimentExtractionScalarFieldEnumSchema = z.enum(['id', 'postId', 'commentId', 'rawAiScore', 'extractedAt', 'model', 'createdAt', 'updatedAt'])

export type SentimentExtractionScalarFieldEnum = z.infer<typeof SentimentExtractionScalarFieldEnumSchema>;