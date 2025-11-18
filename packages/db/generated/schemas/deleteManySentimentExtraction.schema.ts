import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SentimentExtractionWhereInputObjectSchema as SentimentExtractionWhereInputObjectSchema } from './objects/SentimentExtractionWhereInput.schema';

export const SentimentExtractionDeleteManySchema: z.ZodType<Prisma.SentimentExtractionDeleteManyArgs> = z.object({ where: SentimentExtractionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SentimentExtractionDeleteManyArgs>;

export const SentimentExtractionDeleteManyZodSchema = z.object({ where: SentimentExtractionWhereInputObjectSchema.optional() }).strict();