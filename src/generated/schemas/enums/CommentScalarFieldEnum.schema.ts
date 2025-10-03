import * as z from 'zod';

export const CommentScalarFieldEnumSchema = z.enum(['id', 'externalId', 'postId', 'parentCommentId', 'author', 'body', 'score', 'restaurantsMentioned', 'createdUtc', 'createdAt', 'updatedAt'])

export type CommentScalarFieldEnum = z.infer<typeof CommentScalarFieldEnumSchema>;