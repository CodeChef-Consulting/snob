import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PostOrderByWithRelationInputObjectSchema } from './objects/PostOrderByWithRelationInput.schema';
import { PostWhereInputObjectSchema } from './objects/PostWhereInput.schema';
import { PostWhereUniqueInputObjectSchema } from './objects/PostWhereUniqueInput.schema';
import { PostCountAggregateInputObjectSchema } from './objects/PostCountAggregateInput.schema';

export const PostCountSchema: z.ZodType<Prisma.PostCountArgs> = z.object({ orderBy: z.union([PostOrderByWithRelationInputObjectSchema, PostOrderByWithRelationInputObjectSchema.array()]).optional(), where: PostWhereInputObjectSchema.optional(), cursor: PostWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PostCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PostCountArgs>;

export const PostCountZodSchema = z.object({ orderBy: z.union([PostOrderByWithRelationInputObjectSchema, PostOrderByWithRelationInputObjectSchema.array()]).optional(), where: PostWhereInputObjectSchema.optional(), cursor: PostWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PostCountAggregateInputObjectSchema ]).optional() }).strict();