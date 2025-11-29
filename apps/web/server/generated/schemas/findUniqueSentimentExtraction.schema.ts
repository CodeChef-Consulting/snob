import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SentimentExtractionSelectObjectSchema as SentimentExtractionSelectObjectSchema } from './objects/SentimentExtractionSelect.schema';
import { SentimentExtractionIncludeObjectSchema as SentimentExtractionIncludeObjectSchema } from './objects/SentimentExtractionInclude.schema';
import { SentimentExtractionWhereUniqueInputObjectSchema as SentimentExtractionWhereUniqueInputObjectSchema } from './objects/SentimentExtractionWhereUniqueInput.schema';

export const SentimentExtractionFindUniqueSchema: z.ZodType<Prisma.SentimentExtractionFindUniqueArgs> = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), include: SentimentExtractionIncludeObjectSchema.optional(), where: SentimentExtractionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SentimentExtractionFindUniqueArgs>;

export const SentimentExtractionFindUniqueZodSchema = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), include: SentimentExtractionIncludeObjectSchema.optional(), where: SentimentExtractionWhereUniqueInputObjectSchema }).strict();