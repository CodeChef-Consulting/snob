import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CommentOrderByWithRelationInputObjectSchema } from './objects/CommentOrderByWithRelationInput.schema';
import { CommentWhereInputObjectSchema } from './objects/CommentWhereInput.schema';
import { CommentWhereUniqueInputObjectSchema } from './objects/CommentWhereUniqueInput.schema';
import { CommentCountAggregateInputObjectSchema } from './objects/CommentCountAggregateInput.schema';

export const CommentCountSchema: z.ZodType<Prisma.CommentCountArgs> = z.object({ orderBy: z.union([CommentOrderByWithRelationInputObjectSchema, CommentOrderByWithRelationInputObjectSchema.array()]).optional(), where: CommentWhereInputObjectSchema.optional(), cursor: CommentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CommentCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CommentCountArgs>;

export const CommentCountZodSchema = z.object({ orderBy: z.union([CommentOrderByWithRelationInputObjectSchema, CommentOrderByWithRelationInputObjectSchema.array()]).optional(), where: CommentWhereInputObjectSchema.optional(), cursor: CommentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CommentCountAggregateInputObjectSchema ]).optional() }).strict();