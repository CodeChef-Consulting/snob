import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ScrapingSessionOrderByWithRelationInputObjectSchema } from './objects/ScrapingSessionOrderByWithRelationInput.schema';
import { ScrapingSessionWhereInputObjectSchema } from './objects/ScrapingSessionWhereInput.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionCountAggregateInputObjectSchema } from './objects/ScrapingSessionCountAggregateInput.schema';

export const ScrapingSessionCountSchema: z.ZodType<Prisma.ScrapingSessionCountArgs> = z.object({ orderBy: z.union([ScrapingSessionOrderByWithRelationInputObjectSchema, ScrapingSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ScrapingSessionWhereInputObjectSchema.optional(), cursor: ScrapingSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ScrapingSessionCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionCountArgs>;

export const ScrapingSessionCountZodSchema = z.object({ orderBy: z.union([ScrapingSessionOrderByWithRelationInputObjectSchema, ScrapingSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ScrapingSessionWhereInputObjectSchema.optional(), cursor: ScrapingSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ScrapingSessionCountAggregateInputObjectSchema ]).optional() }).strict();