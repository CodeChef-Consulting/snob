import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SentimentExtractionSelectObjectSchema as SentimentExtractionSelectObjectSchema } from './objects/SentimentExtractionSelect.schema';
import { SentimentExtractionIncludeObjectSchema as SentimentExtractionIncludeObjectSchema } from './objects/SentimentExtractionInclude.schema';
import { SentimentExtractionWhereUniqueInputObjectSchema as SentimentExtractionWhereUniqueInputObjectSchema } from './objects/SentimentExtractionWhereUniqueInput.schema';

export const SentimentExtractionFindUniqueOrThrowSchema: z.ZodType<Prisma.SentimentExtractionFindUniqueOrThrowArgs> = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), include: SentimentExtractionIncludeObjectSchema.optional(), where: SentimentExtractionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SentimentExtractionFindUniqueOrThrowArgs>;

export const SentimentExtractionFindUniqueOrThrowZodSchema = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), include: SentimentExtractionIncludeObjectSchema.optional(), where: SentimentExtractionWhereUniqueInputObjectSchema }).strict();