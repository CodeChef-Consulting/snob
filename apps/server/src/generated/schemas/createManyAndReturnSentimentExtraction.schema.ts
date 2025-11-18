import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SentimentExtractionSelectObjectSchema as SentimentExtractionSelectObjectSchema } from './objects/SentimentExtractionSelect.schema';
import { SentimentExtractionCreateManyInputObjectSchema as SentimentExtractionCreateManyInputObjectSchema } from './objects/SentimentExtractionCreateManyInput.schema';

export const SentimentExtractionCreateManyAndReturnSchema: z.ZodType<Prisma.SentimentExtractionCreateManyAndReturnArgs> = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), data: z.union([ SentimentExtractionCreateManyInputObjectSchema, z.array(SentimentExtractionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.SentimentExtractionCreateManyAndReturnArgs>;

export const SentimentExtractionCreateManyAndReturnZodSchema = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), data: z.union([ SentimentExtractionCreateManyInputObjectSchema, z.array(SentimentExtractionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();