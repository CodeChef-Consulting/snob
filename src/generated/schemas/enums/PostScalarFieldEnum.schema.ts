import { z } from 'zod';

export const PostScalarFieldEnumSchema = z.enum(['id', 'externalId', 'subreddit', 'author', 'title', 'body', 'score', 'upvoteRatio', 'numComments', 'url', 'createdUtc', 'createdAt', 'updatedAt', 'restaurantId'])

export type PostScalarFieldEnum = z.infer<typeof PostScalarFieldEnumSchema>;