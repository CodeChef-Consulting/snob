import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SentimentExtractionCreateManyInputObjectSchema as SentimentExtractionCreateManyInputObjectSchema } from './objects/SentimentExtractionCreateManyInput.schema';

export const SentimentExtractionCreateManySchema: z.ZodType<Prisma.SentimentExtractionCreateManyArgs> = z.object({ data: z.union([ SentimentExtractionCreateManyInputObjectSchema, z.array(SentimentExtractionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.SentimentExtractionCreateManyArgs>;

export const SentimentExtractionCreateManyZodSchema = z.object({ data: z.union([ SentimentExtractionCreateManyInputObjectSchema, z.array(SentimentExtractionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();