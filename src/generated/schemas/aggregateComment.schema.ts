import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CommentOrderByWithRelationInputObjectSchema as CommentOrderByWithRelationInputObjectSchema } from './objects/CommentOrderByWithRelationInput.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './objects/CommentWhereInput.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './objects/CommentWhereUniqueInput.schema';
import { CommentCountAggregateInputObjectSchema as CommentCountAggregateInputObjectSchema } from './objects/CommentCountAggregateInput.schema';
import { CommentMinAggregateInputObjectSchema as CommentMinAggregateInputObjectSchema } from './objects/CommentMinAggregateInput.schema';
import { CommentMaxAggregateInputObjectSchema as CommentMaxAggregateInputObjectSchema } from './objects/CommentMaxAggregateInput.schema';
import { CommentAvgAggregateInputObjectSchema as CommentAvgAggregateInputObjectSchema } from './objects/CommentAvgAggregateInput.schema';
import { CommentSumAggregateInputObjectSchema as CommentSumAggregateInputObjectSchema } from './objects/CommentSumAggregateInput.schema';

export const CommentAggregateSchema: z.ZodType<Prisma.CommentAggregateArgs> = z.object({ orderBy: z.union([CommentOrderByWithRelationInputObjectSchema, CommentOrderByWithRelationInputObjectSchema.array()]).optional(), where: CommentWhereInputObjectSchema.optional(), cursor: CommentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), CommentCountAggregateInputObjectSchema ]).optional(), _min: CommentMinAggregateInputObjectSchema.optional(), _max: CommentMaxAggregateInputObjectSchema.optional(), _avg: CommentAvgAggregateInputObjectSchema.optional(), _sum: CommentSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CommentAggregateArgs>;

export const CommentAggregateZodSchema = z.object({ orderBy: z.union([CommentOrderByWithRelationInputObjectSchema, CommentOrderByWithRelationInputObjectSchema.array()]).optional(), where: CommentWhereInputObjectSchema.optional(), cursor: CommentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), CommentCountAggregateInputObjectSchema ]).optional(), _min: CommentMinAggregateInputObjectSchema.optional(), _max: CommentMaxAggregateInputObjectSchema.optional(), _avg: CommentAvgAggregateInputObjectSchema.optional(), _sum: CommentSumAggregateInputObjectSchema.optional() }).strict();