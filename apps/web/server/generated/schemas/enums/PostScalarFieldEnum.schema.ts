import * as z from 'zod';

export const PostScalarFieldEnumSchema = z.enum(['id', 'externalId', 'subreddit', 'author', 'title', 'body', 'score', 'ups', 'downs', 'upvoteRatio', 'numComments', 'gilded', 'permalink', 'createdUtc', 'createdAt', 'updatedAt', 'scrapingSessionId', 'commentsLastScrapedAt', 'commentsFullyScraped'])

export type PostScalarFieldEnum = z.infer<typeof PostScalarFieldEnumSchema>;