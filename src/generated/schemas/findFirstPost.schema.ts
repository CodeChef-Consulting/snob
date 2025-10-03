import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PostIncludeObjectSchema as PostIncludeObjectSchema } from './objects/PostInclude.schema';
import { PostOrderByWithRelationInputObjectSchema as PostOrderByWithRelationInputObjectSchema } from './objects/PostOrderByWithRelationInput.schema';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './objects/PostWhereInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './objects/PostWhereUniqueInput.schema';
import { PostScalarFieldEnumSchema } from './enums/PostScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PostFindFirstSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    subreddit: z.boolean().optional(),
    author: z.boolean().optional(),
    title: z.boolean().optional(),
    body: z.boolean().optional(),
    score: z.boolean().optional(),
    upvoteRatio: z.boolean().optional(),
    numComments: z.boolean().optional(),
    url: z.boolean().optional(),
    createdUtc: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    restaurant: z.boolean().optional(),
    restaurantId: z.boolean().optional(),
    comments: z.boolean().optional(),
    files: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PostSelect>;

export const PostFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    subreddit: z.boolean().optional(),
    author: z.boolean().optional(),
    title: z.boolean().optional(),
    body: z.boolean().optional(),
    score: z.boolean().optional(),
    upvoteRatio: z.boolean().optional(),
    numComments: z.boolean().optional(),
    url: z.boolean().optional(),
    createdUtc: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    restaurant: z.boolean().optional(),
    restaurantId: z.boolean().optional(),
    comments: z.boolean().optional(),
    files: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const PostFindFirstSchema: z.ZodType<Prisma.PostFindFirstArgs> = z.object({ select: PostFindFirstSelectSchema.optional(), include: z.lazy(() => PostIncludeObjectSchema.optional()), orderBy: z.union([PostOrderByWithRelationInputObjectSchema, PostOrderByWithRelationInputObjectSchema.array()]).optional(), where: PostWhereInputObjectSchema.optional(), cursor: PostWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PostFindFirstArgs>;

export const PostFindFirstZodSchema = z.object({ select: PostFindFirstSelectSchema.optional(), include: z.lazy(() => PostIncludeObjectSchema.optional()), orderBy: z.union([PostOrderByWithRelationInputObjectSchema, PostOrderByWithRelationInputObjectSchema.array()]).optional(), where: PostWhereInputObjectSchema.optional(), cursor: PostWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()]).optional() }).strict();