import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SentimentExtractionUpdateManyMutationInputObjectSchema as SentimentExtractionUpdateManyMutationInputObjectSchema } from './objects/SentimentExtractionUpdateManyMutationInput.schema';
import { SentimentExtractionWhereInputObjectSchema as SentimentExtractionWhereInputObjectSchema } from './objects/SentimentExtractionWhereInput.schema';

export const SentimentExtractionUpdateManySchema: z.ZodType<Prisma.SentimentExtractionUpdateManyArgs> = z.object({ data: SentimentExtractionUpdateManyMutationInputObjectSchema, where: SentimentExtractionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SentimentExtractionUpdateManyArgs>;

export const SentimentExtractionUpdateManyZodSchema = z.object({ data: SentimentExtractionUpdateManyMutationInputObjectSchema, where: SentimentExtractionWhereInputObjectSchema.optional() }).strict();