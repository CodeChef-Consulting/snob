import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BatchJobOrderByWithRelationInputObjectSchema as BatchJobOrderByWithRelationInputObjectSchema } from './objects/BatchJobOrderByWithRelationInput.schema';
import { BatchJobWhereInputObjectSchema as BatchJobWhereInputObjectSchema } from './objects/BatchJobWhereInput.schema';
import { BatchJobWhereUniqueInputObjectSchema as BatchJobWhereUniqueInputObjectSchema } from './objects/BatchJobWhereUniqueInput.schema';
import { BatchJobCountAggregateInputObjectSchema as BatchJobCountAggregateInputObjectSchema } from './objects/BatchJobCountAggregateInput.schema';

export const BatchJobCountSchema: z.ZodType<Prisma.BatchJobCountArgs> = z.object({ orderBy: z.union([BatchJobOrderByWithRelationInputObjectSchema, BatchJobOrderByWithRelationInputObjectSchema.array()]).optional(), where: BatchJobWhereInputObjectSchema.optional(), cursor: BatchJobWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BatchJobCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.BatchJobCountArgs>;

export const BatchJobCountZodSchema = z.object({ orderBy: z.union([BatchJobOrderByWithRelationInputObjectSchema, BatchJobOrderByWithRelationInputObjectSchema.array()]).optional(), where: BatchJobWhereInputObjectSchema.optional(), cursor: BatchJobWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BatchJobCountAggregateInputObjectSchema ]).optional() }).strict();