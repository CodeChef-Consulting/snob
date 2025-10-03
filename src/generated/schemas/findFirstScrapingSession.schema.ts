import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ScrapingSessionOrderByWithRelationInputObjectSchema as ScrapingSessionOrderByWithRelationInputObjectSchema } from './objects/ScrapingSessionOrderByWithRelationInput.schema';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './objects/ScrapingSessionWhereInput.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionScalarFieldEnumSchema } from './enums/ScrapingSessionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ScrapingSessionFindFirstSelectSchema: z.ZodType<Prisma.ScrapingSessionSelect> = z.object({
    id: z.boolean().optional(),
    subreddit: z.boolean().optional(),
    lastPostId: z.boolean().optional(),
    lastPostTimestamp: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionSelect>;

export const ScrapingSessionFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    subreddit: z.boolean().optional(),
    lastPostId: z.boolean().optional(),
    lastPostTimestamp: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const ScrapingSessionFindFirstSchema: z.ZodType<Prisma.ScrapingSessionFindFirstArgs> = z.object({ select: ScrapingSessionFindFirstSelectSchema.optional(),  orderBy: z.union([ScrapingSessionOrderByWithRelationInputObjectSchema, ScrapingSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ScrapingSessionWhereInputObjectSchema.optional(), cursor: ScrapingSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ScrapingSessionScalarFieldEnumSchema, ScrapingSessionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionFindFirstArgs>;

export const ScrapingSessionFindFirstZodSchema = z.object({ select: ScrapingSessionFindFirstSelectSchema.optional(),  orderBy: z.union([ScrapingSessionOrderByWithRelationInputObjectSchema, ScrapingSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ScrapingSessionWhereInputObjectSchema.optional(), cursor: ScrapingSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ScrapingSessionScalarFieldEnumSchema, ScrapingSessionScalarFieldEnumSchema.array()]).optional() }).strict();