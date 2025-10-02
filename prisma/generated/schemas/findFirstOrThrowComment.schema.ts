import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CommentIncludeObjectSchema as CommentIncludeObjectSchema } from './objects/CommentInclude.schema';
import { CommentOrderByWithRelationInputObjectSchema as CommentOrderByWithRelationInputObjectSchema } from './objects/CommentOrderByWithRelationInput.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './objects/CommentWhereInput.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './objects/CommentWhereUniqueInput.schema';
import { CommentScalarFieldEnumSchema } from './enums/CommentScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CommentFindFirstOrThrowSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    post: z.boolean().optional(),
    postId: z.boolean().optional(),
    parentComment: z.boolean().optional(),
    parentCommentId: z.boolean().optional(),
    replies: z.boolean().optional(),
    author: z.boolean().optional(),
    body: z.boolean().optional(),
    score: z.boolean().optional(),
    createdUtc: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    files: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CommentSelect>;

export const CommentFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    post: z.boolean().optional(),
    postId: z.boolean().optional(),
    parentComment: z.boolean().optional(),
    parentCommentId: z.boolean().optional(),
    replies: z.boolean().optional(),
    author: z.boolean().optional(),
    body: z.boolean().optional(),
    score: z.boolean().optional(),
    createdUtc: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    files: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const CommentFindFirstOrThrowSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> = z.object({ select: CommentFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CommentIncludeObjectSchema.optional()), orderBy: z.union([CommentOrderByWithRelationInputObjectSchema, CommentOrderByWithRelationInputObjectSchema.array()]).optional(), where: CommentWhereInputObjectSchema.optional(), cursor: CommentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CommentScalarFieldEnumSchema, CommentScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CommentFindFirstOrThrowArgs>;

export const CommentFindFirstOrThrowZodSchema = z.object({ select: CommentFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CommentIncludeObjectSchema.optional()), orderBy: z.union([CommentOrderByWithRelationInputObjectSchema, CommentOrderByWithRelationInputObjectSchema.array()]).optional(), where: CommentWhereInputObjectSchema.optional(), cursor: CommentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CommentScalarFieldEnumSchema, CommentScalarFieldEnumSchema.array()]).optional() }).strict();