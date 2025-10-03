import * as z from 'zod';

export const FileScalarFieldEnumSchema = z.enum(['id', 'postId', 'commentId', 'fileUrl', 'fileType', 'metadata', 'createdAt'])

export type FileScalarFieldEnum = z.infer<typeof FileScalarFieldEnumSchema>;