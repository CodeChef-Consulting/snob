import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SentimentExtractionSelectObjectSchema as SentimentExtractionSelectObjectSchema } from './objects/SentimentExtractionSelect.schema';
import { SentimentExtractionIncludeObjectSchema as SentimentExtractionIncludeObjectSchema } from './objects/SentimentExtractionInclude.schema';
import { SentimentExtractionWhereUniqueInputObjectSchema as SentimentExtractionWhereUniqueInputObjectSchema } from './objects/SentimentExtractionWhereUniqueInput.schema';
import { SentimentExtractionCreateInputObjectSchema as SentimentExtractionCreateInputObjectSchema } from './objects/SentimentExtractionCreateInput.schema';
import { SentimentExtractionUncheckedCreateInputObjectSchema as SentimentExtractionUncheckedCreateInputObjectSchema } from './objects/SentimentExtractionUncheckedCreateInput.schema';
import { SentimentExtractionUpdateInputObjectSchema as SentimentExtractionUpdateInputObjectSchema } from './objects/SentimentExtractionUpdateInput.schema';
import { SentimentExtractionUncheckedUpdateInputObjectSchema as SentimentExtractionUncheckedUpdateInputObjectSchema } from './objects/SentimentExtractionUncheckedUpdateInput.schema';

export const SentimentExtractionUpsertOneSchema: z.ZodType<Prisma.SentimentExtractionUpsertArgs> = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), include: SentimentExtractionIncludeObjectSchema.optional(), where: SentimentExtractionWhereUniqueInputObjectSchema, create: z.union([ SentimentExtractionCreateInputObjectSchema, SentimentExtractionUncheckedCreateInputObjectSchema ]), update: z.union([ SentimentExtractionUpdateInputObjectSchema, SentimentExtractionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.SentimentExtractionUpsertArgs>;

export const SentimentExtractionUpsertOneZodSchema = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), include: SentimentExtractionIncludeObjectSchema.optional(), where: SentimentExtractionWhereUniqueInputObjectSchema, create: z.union([ SentimentExtractionCreateInputObjectSchema, SentimentExtractionUncheckedCreateInputObjectSchema ]), update: z.union([ SentimentExtractionUpdateInputObjectSchema, SentimentExtractionUncheckedUpdateInputObjectSchema ]) }).strict();
// Alias for prisma-trpc-generator compatibility
export const SentimentExtractionUpsertSchema = SentimentExtractionUpsertOneSchema;
