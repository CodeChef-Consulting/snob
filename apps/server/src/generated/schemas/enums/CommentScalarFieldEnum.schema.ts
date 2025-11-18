import * as z from 'zod';

export const CommentScalarFieldEnumSchema = z.enum(['id', 'externalId', 'postId', 'parentCommentId', 'author', 'body', 'score', 'ups', 'depth', 'controversiality', 'isSubmitter', 'scoreHidden', 'permalink', 'createdUtc', 'createdAt', 'updatedAt', 'scrapingSessionId'])

export type CommentScalarFieldEnum = z.infer<typeof CommentScalarFieldEnumSchema>;