import * as z from 'zod';

export const ScrapingSessionScalarFieldEnumSchema = z.enum(['id', 'subreddit', 'lastPostId', 'lastPostTimestamp', 'createdAt', 'updatedAt'])

export type ScrapingSessionScalarFieldEnum = z.infer<typeof ScrapingSessionScalarFieldEnumSchema>;