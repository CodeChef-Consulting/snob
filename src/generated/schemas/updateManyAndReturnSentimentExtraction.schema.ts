import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SentimentExtractionSelectObjectSchema as SentimentExtractionSelectObjectSchema } from './objects/SentimentExtractionSelect.schema';
import { SentimentExtractionUpdateManyMutationInputObjectSchema as SentimentExtractionUpdateManyMutationInputObjectSchema } from './objects/SentimentExtractionUpdateManyMutationInput.schema';
import { SentimentExtractionWhereInputObjectSchema as SentimentExtractionWhereInputObjectSchema } from './objects/SentimentExtractionWhereInput.schema';

export const SentimentExtractionUpdateManyAndReturnSchema: z.ZodType<Prisma.SentimentExtractionUpdateManyAndReturnArgs> = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), data: SentimentExtractionUpdateManyMutationInputObjectSchema, where: SentimentExtractionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SentimentExtractionUpdateManyAndReturnArgs>;

export const SentimentExtractionUpdateManyAndReturnZodSchema = z.object({ select: SentimentExtractionSelectObjectSchema.optional(), data: SentimentExtractionUpdateManyMutationInputObjectSchema, where: SentimentExtractionWhereInputObjectSchema.optional() }).strict();