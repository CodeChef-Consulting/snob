import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SentimentExtractionSelectObjectSchema as SentimentExtractionSelectObjectSchema } from './objects/SentimentExtractionSelect.schema';
import { SentimentExtractionIncludeObjectSchema as SentimentExtractionIncludeObjectSchema } from './objects/SentimentExtractionInclude.schema';
import { SentimentExtractionCreateInputObjectSchema as SentimentExtractionCreateInputObjectSchema } from './objects/SentimentExtractionCreateInput.schema';
import { SentimentExtractionUncheckedCreateInputObjectSchema as SentimentExtractionUncheckedCreateInputObjectSchema } from './objects/SentimentExtractionUncheckedCreateInput.schema';

export const SentimentExtractionCreateOneSchema: z.ZodType<Prisma.SentimentExtractionCreateArgs> = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), include: SentimentExtractionIncludeObjectSchema.optional(), data: z.union([SentimentExtractionCreateInputObjectSchema, SentimentExtractionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.SentimentExtractionCreateArgs>;

export const SentimentExtractionCreateOneZodSchema = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), include: SentimentExtractionIncludeObjectSchema.optional(), data: z.union([SentimentExtractionCreateInputObjectSchema, SentimentExtractionUncheckedCreateInputObjectSchema]) }).strict();