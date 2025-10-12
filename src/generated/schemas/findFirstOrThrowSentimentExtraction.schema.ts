import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SentimentExtractionIncludeObjectSchema as SentimentExtractionIncludeObjectSchema } from './objects/SentimentExtractionInclude.schema';
import { SentimentExtractionOrderByWithRelationInputObjectSchema as SentimentExtractionOrderByWithRelationInputObjectSchema } from './objects/SentimentExtractionOrderByWithRelationInput.schema';
import { SentimentExtractionWhereInputObjectSchema as SentimentExtractionWhereInputObjectSchema } from './objects/SentimentExtractionWhereInput.schema';
import { SentimentExtractionWhereUniqueInputObjectSchema as SentimentExtractionWhereUniqueInputObjectSchema } from './objects/SentimentExtractionWhereUniqueInput.schema';
import { SentimentExtractionScalarFieldEnumSchema } from './enums/SentimentExtractionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SentimentExtractionFindFirstOrThrowSelectSchema: z.ZodType<Prisma.SentimentExtractionSelect> = z.object({
    id: z.boolean().optional(),
    post: z.boolean().optional(),
    postId: z.boolean().optional(),
    comment: z.boolean().optional(),
    commentId: z.boolean().optional(),
    rawAiScore: z.boolean().optional(),
    extractedAt: z.boolean().optional(),
    model: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.SentimentExtractionSelect>;

export const SentimentExtractionFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    post: z.boolean().optional(),
    postId: z.boolean().optional(),
    comment: z.boolean().optional(),
    commentId: z.boolean().optional(),
    rawAiScore: z.boolean().optional(),
    extractedAt: z.boolean().optional(),
    model: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const SentimentExtractionFindFirstOrThrowSchema: z.ZodType<Prisma.SentimentExtractionFindFirstOrThrowArgs> = z.object({ select: SentimentExtractionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => SentimentExtractionIncludeObjectSchema.optional()), orderBy: z.union([SentimentExtractionOrderByWithRelationInputObjectSchema, SentimentExtractionOrderByWithRelationInputObjectSchema.array()]).optional(), where: SentimentExtractionWhereInputObjectSchema.optional(), cursor: SentimentExtractionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SentimentExtractionScalarFieldEnumSchema, SentimentExtractionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.SentimentExtractionFindFirstOrThrowArgs>;

export const SentimentExtractionFindFirstOrThrowZodSchema = z.object({ select: SentimentExtractionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => SentimentExtractionIncludeObjectSchema.optional()), orderBy: z.union([SentimentExtractionOrderByWithRelationInputObjectSchema, SentimentExtractionOrderByWithRelationInputObjectSchema.array()]).optional(), where: SentimentExtractionWhereInputObjectSchema.optional(), cursor: SentimentExtractionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SentimentExtractionScalarFieldEnumSchema, SentimentExtractionScalarFieldEnumSchema.array()]).optional() }).strict();