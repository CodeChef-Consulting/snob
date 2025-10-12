import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SentimentExtractionSelectObjectSchema as SentimentExtractionSelectObjectSchema } from './objects/SentimentExtractionSelect.schema';
import { SentimentExtractionIncludeObjectSchema as SentimentExtractionIncludeObjectSchema } from './objects/SentimentExtractionInclude.schema';
import { SentimentExtractionUpdateInputObjectSchema as SentimentExtractionUpdateInputObjectSchema } from './objects/SentimentExtractionUpdateInput.schema';
import { SentimentExtractionUncheckedUpdateInputObjectSchema as SentimentExtractionUncheckedUpdateInputObjectSchema } from './objects/SentimentExtractionUncheckedUpdateInput.schema';
import { SentimentExtractionWhereUniqueInputObjectSchema as SentimentExtractionWhereUniqueInputObjectSchema } from './objects/SentimentExtractionWhereUniqueInput.schema';

export const SentimentExtractionUpdateOneSchema: z.ZodType<Prisma.SentimentExtractionUpdateArgs> = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), include: SentimentExtractionIncludeObjectSchema.optional(), data: z.union([SentimentExtractionUpdateInputObjectSchema, SentimentExtractionUncheckedUpdateInputObjectSchema]), where: SentimentExtractionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SentimentExtractionUpdateArgs>;

export const SentimentExtractionUpdateOneZodSchema = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), include: SentimentExtractionIncludeObjectSchema.optional(), data: z.union([SentimentExtractionUpdateInputObjectSchema, SentimentExtractionUncheckedUpdateInputObjectSchema]), where: SentimentExtractionWhereUniqueInputObjectSchema }).strict();