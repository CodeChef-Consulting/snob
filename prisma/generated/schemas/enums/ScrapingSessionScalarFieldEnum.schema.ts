import * as z from 'zod';

export const ScrapingSessionScalarFieldEnumSchema = z.enum(['id', 'subreddit', 'restaurantId', 'status', 'lastScrapedAt', 'lastPostTimestamp', 'postsScraped', 'commentsScraped', 'errorMessage', 'metadata', 'createdAt', 'updatedAt'])

export type ScrapingSessionScalarFieldEnum = z.infer<typeof ScrapingSessionScalarFieldEnumSchema>;