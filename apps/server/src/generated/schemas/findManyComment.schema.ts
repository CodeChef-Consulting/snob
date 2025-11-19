import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CommentIncludeObjectSchema as CommentIncludeObjectSchema } from './objects/CommentInclude.schema';
import { CommentOrderByWithRelationInputObjectSchema as CommentOrderByWithRelationInputObjectSchema } from './objects/CommentOrderByWithRelationInput.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './objects/CommentWhereInput.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './objects/CommentWhereUniqueInput.schema';
import { CommentScalarFieldEnumSchema } from './enums/CommentScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CommentFindManySelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    post: z.boolean().optional(),
    postId: z.boolean().optional(),
    parentComment: z.boolean().optional(),
    parentCommentId: z.boolean().optional(),
    parentExternalId: z.boolean().optional(),
    replies: z.boolean().optional(),
    author: z.boolean().optional(),
    body: z.boolean().optional(),
    score: z.boolean().optional(),
    ups: z.boolean().optional(),
    depth: z.boolean().optional(),
    controversiality: z.boolean().optional(),
    isSubmitter: z.boolean().optional(),
    scoreHidden: z.boolean().optional(),
    permalink: z.boolean().optional(),
    createdUtc: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    scrapingSession: z.boolean().optional(),
    scrapingSessionId: z.boolean().optional(),
    files: z.boolean().optional(),
    restaurantsMentioned: z.boolean().optional(),
    restaurantExtraction: z.boolean().optional(),
    sentimentExtraction: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CommentSelect>;

export const CommentFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    post: z.boolean().optional(),
    postId: z.boolean().optional(),
    parentComment: z.boolean().optional(),
    parentCommentId: z.boolean().optional(),
    parentExternalId: z.boolean().optional(),
    replies: z.boolean().optional(),
    author: z.boolean().optional(),
    body: z.boolean().optional(),
    score: z.boolean().optional(),
    ups: z.boolean().optional(),
    depth: z.boolean().optional(),
    controversiality: z.boolean().optional(),
    isSubmitter: z.boolean().optional(),
    scoreHidden: z.boolean().optional(),
    permalink: z.boolean().optional(),
    createdUtc: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    scrapingSession: z.boolean().optional(),
    scrapingSessionId: z.boolean().optional(),
    files: z.boolean().optional(),
    restaurantsMentioned: z.boolean().optional(),
    restaurantExtraction: z.boolean().optional(),
    sentimentExtraction: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const CommentFindManySchema: z.ZodType<Prisma.CommentFindManyArgs> = z.object({ select: CommentFindManySelectSchema.optional(), include: z.lazy(() => CommentIncludeObjectSchema.optional()), orderBy: z.union([CommentOrderByWithRelationInputObjectSchema, CommentOrderByWithRelationInputObjectSchema.array()]).optional(), where: CommentWhereInputObjectSchema.optional(), cursor: CommentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CommentScalarFieldEnumSchema, CommentScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CommentFindManyArgs>;

export const CommentFindManyZodSchema = z.object({ select: CommentFindManySelectSchema.optional(), include: z.lazy(() => CommentIncludeObjectSchema.optional()), orderBy: z.union([CommentOrderByWithRelationInputObjectSchema, CommentOrderByWithRelationInputObjectSchema.array()]).optional(), where: CommentWhereInputObjectSchema.optional(), cursor: CommentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CommentScalarFieldEnumSchema, CommentScalarFieldEnumSchema.array()]).optional() }).strict();