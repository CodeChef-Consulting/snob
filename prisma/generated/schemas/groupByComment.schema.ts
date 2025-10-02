import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CommentWhereInputObjectSchema } from './objects/CommentWhereInput.schema';
import { CommentOrderByWithAggregationInputObjectSchema } from './objects/CommentOrderByWithAggregationInput.schema';
import { CommentScalarWhereWithAggregatesInputObjectSchema } from './objects/CommentScalarWhereWithAggregatesInput.schema';
import { CommentScalarFieldEnumSchema } from './enums/CommentScalarFieldEnum.schema';
import { CommentCountAggregateInputObjectSchema } from './objects/CommentCountAggregateInput.schema';
import { CommentMinAggregateInputObjectSchema } from './objects/CommentMinAggregateInput.schema';
import { CommentMaxAggregateInputObjectSchema } from './objects/CommentMaxAggregateInput.schema';
import { CommentAvgAggregateInputObjectSchema } from './objects/CommentAvgAggregateInput.schema';
import { CommentSumAggregateInputObjectSchema } from './objects/CommentSumAggregateInput.schema';

export const CommentGroupBySchema: z.ZodType<Prisma.CommentGroupByArgs> = z.object({ where: CommentWhereInputObjectSchema.optional(), orderBy: z.union([CommentOrderByWithAggregationInputObjectSchema, CommentOrderByWithAggregationInputObjectSchema.array()]).optional(), having: CommentScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(CommentScalarFieldEnumSchema), _count: z.union([ z.literal(true), CommentCountAggregateInputObjectSchema ]).optional(), _min: CommentMinAggregateInputObjectSchema.optional(), _max: CommentMaxAggregateInputObjectSchema.optional(), _avg: CommentAvgAggregateInputObjectSchema.optional(), _sum: CommentSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CommentGroupByArgs>;

export const CommentGroupByZodSchema = z.object({ where: CommentWhereInputObjectSchema.optional(), orderBy: z.union([CommentOrderByWithAggregationInputObjectSchema, CommentOrderByWithAggregationInputObjectSchema.array()]).optional(), having: CommentScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(CommentScalarFieldEnumSchema), _count: z.union([ z.literal(true), CommentCountAggregateInputObjectSchema ]).optional(), _min: CommentMinAggregateInputObjectSchema.optional(), _max: CommentMaxAggregateInputObjectSchema.optional(), _avg: CommentAvgAggregateInputObjectSchema.optional(), _sum: CommentSumAggregateInputObjectSchema.optional() }).strict();