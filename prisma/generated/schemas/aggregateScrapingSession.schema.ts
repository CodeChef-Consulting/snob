import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ScrapingSessionOrderByWithRelationInputObjectSchema } from './objects/ScrapingSessionOrderByWithRelationInput.schema';
import { ScrapingSessionWhereInputObjectSchema } from './objects/ScrapingSessionWhereInput.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionCountAggregateInputObjectSchema } from './objects/ScrapingSessionCountAggregateInput.schema';
import { ScrapingSessionMinAggregateInputObjectSchema } from './objects/ScrapingSessionMinAggregateInput.schema';
import { ScrapingSessionMaxAggregateInputObjectSchema } from './objects/ScrapingSessionMaxAggregateInput.schema';
import { ScrapingSessionAvgAggregateInputObjectSchema } from './objects/ScrapingSessionAvgAggregateInput.schema';
import { ScrapingSessionSumAggregateInputObjectSchema } from './objects/ScrapingSessionSumAggregateInput.schema';

export const ScrapingSessionAggregateSchema: z.ZodType<Prisma.ScrapingSessionAggregateArgs> = z.object({ orderBy: z.union([ScrapingSessionOrderByWithRelationInputObjectSchema, ScrapingSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ScrapingSessionWhereInputObjectSchema.optional(), cursor: ScrapingSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ScrapingSessionCountAggregateInputObjectSchema ]).optional(), _min: ScrapingSessionMinAggregateInputObjectSchema.optional(), _max: ScrapingSessionMaxAggregateInputObjectSchema.optional(), _avg: ScrapingSessionAvgAggregateInputObjectSchema.optional(), _sum: ScrapingSessionSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionAggregateArgs>;

export const ScrapingSessionAggregateZodSchema = z.object({ orderBy: z.union([ScrapingSessionOrderByWithRelationInputObjectSchema, ScrapingSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ScrapingSessionWhereInputObjectSchema.optional(), cursor: ScrapingSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ScrapingSessionCountAggregateInputObjectSchema ]).optional(), _min: ScrapingSessionMinAggregateInputObjectSchema.optional(), _max: ScrapingSessionMaxAggregateInputObjectSchema.optional(), _avg: ScrapingSessionAvgAggregateInputObjectSchema.optional(), _sum: ScrapingSessionSumAggregateInputObjectSchema.optional() }).strict();