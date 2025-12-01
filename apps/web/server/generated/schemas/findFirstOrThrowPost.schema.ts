import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PostIncludeObjectSchema as PostIncludeObjectSchema } from './objects/PostInclude.schema';
import { PostOrderByWithRelationInputObjectSchema as PostOrderByWithRelationInputObjectSchema } from './objects/PostOrderByWithRelationInput.schema';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './objects/PostWhereInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './objects/PostWhereUniqueInput.schema';
import { PostScalarFieldEnumSchema } from './enums/PostScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PostFindFirstOrThrowSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    subreddit: z.boolean().optional(),
    author: z.boolean().optional(),
    title: z.boolean().optional(),
    body: z.boolean().optional(),
    score: z.boolean().optional(),
    ups: z.boolean().optional(),
    downs: z.boolean().optional(),
    upvoteRatio: z.boolean().optional(),
    numComments: z.boolean().optional(),
    gilded: z.boolean().optional(),
    permalink: z.boolean().optional(),
    createdUtc: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    scrapingSession: z.boolean().optional(),
    scrapingSessionId: z.boolean().optional(),
    commentsLastScrapedAt: z.boolean().optional(),
    commentsFullyScraped: z.boolean().optional(),
    comments: z.boolean().optional(),
    files: z.boolean().optional(),
    restaurantGroupsMentioned: z.boolean().optional(),
    restaurantExtraction: z.boolean().optional(),
    sentimentExtraction: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PostSelect>;

export const PostFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    subreddit: z.boolean().optional(),
    author: z.boolean().optional(),
    title: z.boolean().optional(),
    body: z.boolean().optional(),
    score: z.boolean().optional(),
    ups: z.boolean().optional(),
    downs: z.boolean().optional(),
    upvoteRatio: z.boolean().optional(),
    numComments: z.boolean().optional(),
    gilded: z.boolean().optional(),
    permalink: z.boolean().optional(),
    createdUtc: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    scrapingSession: z.boolean().optional(),
    scrapingSessionId: z.boolean().optional(),
    commentsLastScrapedAt: z.boolean().optional(),
    commentsFullyScraped: z.boolean().optional(),
    comments: z.boolean().optional(),
    files: z.boolean().optional(),
    restaurantGroupsMentioned: z.boolean().optional(),
    restaurantExtraction: z.boolean().optional(),
    sentimentExtraction: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const PostFindFirstOrThrowSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> = z.object({ select: PostFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => PostIncludeObjectSchema.optional()), orderBy: z.union([PostOrderByWithRelationInputObjectSchema, PostOrderByWithRelationInputObjectSchema.array()]).optional(), where: PostWhereInputObjectSchema.optional(), cursor: PostWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PostFindFirstOrThrowArgs>;

export const PostFindFirstOrThrowZodSchema = z.object({ select: PostFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => PostIncludeObjectSchema.optional()), orderBy: z.union([PostOrderByWithRelationInputObjectSchema, PostOrderByWithRelationInputObjectSchema.array()]).optional(), where: PostWhereInputObjectSchema.optional(), cursor: PostWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()]).optional() }).strict();