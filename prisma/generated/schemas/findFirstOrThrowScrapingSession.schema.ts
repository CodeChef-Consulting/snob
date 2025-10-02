import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ScrapingSessionIncludeObjectSchema as ScrapingSessionIncludeObjectSchema } from './objects/ScrapingSessionInclude.schema';
import { ScrapingSessionOrderByWithRelationInputObjectSchema as ScrapingSessionOrderByWithRelationInputObjectSchema } from './objects/ScrapingSessionOrderByWithRelationInput.schema';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './objects/ScrapingSessionWhereInput.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionScalarFieldEnumSchema } from './enums/ScrapingSessionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ScrapingSessionFindFirstOrThrowSelectSchema: z.ZodType<Prisma.ScrapingSessionSelect> = z.object({
    id: z.boolean().optional(),
    subreddit: z.boolean().optional(),
    restaurant: z.boolean().optional(),
    restaurantId: z.boolean().optional(),
    status: z.boolean().optional(),
    lastScrapedAt: z.boolean().optional(),
    lastPostTimestamp: z.boolean().optional(),
    postsScraped: z.boolean().optional(),
    commentsScraped: z.boolean().optional(),
    errorMessage: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionSelect>;

export const ScrapingSessionFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    subreddit: z.boolean().optional(),
    restaurant: z.boolean().optional(),
    restaurantId: z.boolean().optional(),
    status: z.boolean().optional(),
    lastScrapedAt: z.boolean().optional(),
    lastPostTimestamp: z.boolean().optional(),
    postsScraped: z.boolean().optional(),
    commentsScraped: z.boolean().optional(),
    errorMessage: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const ScrapingSessionFindFirstOrThrowSchema: z.ZodType<Prisma.ScrapingSessionFindFirstOrThrowArgs> = z.object({ select: ScrapingSessionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ScrapingSessionIncludeObjectSchema.optional()), orderBy: z.union([ScrapingSessionOrderByWithRelationInputObjectSchema, ScrapingSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ScrapingSessionWhereInputObjectSchema.optional(), cursor: ScrapingSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ScrapingSessionScalarFieldEnumSchema, ScrapingSessionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionFindFirstOrThrowArgs>;

export const ScrapingSessionFindFirstOrThrowZodSchema = z.object({ select: ScrapingSessionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ScrapingSessionIncludeObjectSchema.optional()), orderBy: z.union([ScrapingSessionOrderByWithRelationInputObjectSchema, ScrapingSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ScrapingSessionWhereInputObjectSchema.optional(), cursor: ScrapingSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ScrapingSessionScalarFieldEnumSchema, ScrapingSessionScalarFieldEnumSchema.array()]).optional() }).strict();