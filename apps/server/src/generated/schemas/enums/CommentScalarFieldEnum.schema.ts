import * as z from 'zod';

export const CommentScalarFieldEnumSchema = z.enum(['id', 'externalId', 'postId', 'parentCommentId', 'parentExternalId', 'author', 'body', 'score', 'ups', 'depth', 'controversiality', 'isSubmitter', 'scoreHidden', 'permalink', 'createdUtc', 'createdAt', 'updatedAt', 'scrapingSessionId'])

export type CommentScalarFieldEnum = z.infer<typeof CommentScalarFieldEnumSchema>;