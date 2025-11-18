import * as z from 'zod';

export const ScrapingSessionScalarFieldEnumSchema = z.enum(['id', 'subreddit', 'mode', 'timeframe', 'searchQuery', 'lastPostId', 'lastPostTimestamp', 'postsScraped', 'completed', 'createdAt', 'updatedAt'])

export type ScrapingSessionScalarFieldEnum = z.infer<typeof ScrapingSessionScalarFieldEnumSchema>;