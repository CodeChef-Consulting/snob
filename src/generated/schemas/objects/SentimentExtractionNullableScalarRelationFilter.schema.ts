import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SentimentExtractionWhereInputObjectSchema as SentimentExtractionWhereInputObjectSchema } from './SentimentExtractionWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => SentimentExtractionWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => SentimentExtractionWhereInputObjectSchema).optional().nullable()
}).strict();
export const SentimentExtractionNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.SentimentExtractionNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionNullableScalarRelationFilter>;
export const SentimentExtractionNullableScalarRelationFilterObjectZodSchema = makeSchema();
