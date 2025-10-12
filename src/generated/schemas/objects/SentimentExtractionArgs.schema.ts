import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SentimentExtractionSelectObjectSchema as SentimentExtractionSelectObjectSchema } from './SentimentExtractionSelect.schema';
import { SentimentExtractionIncludeObjectSchema as SentimentExtractionIncludeObjectSchema } from './SentimentExtractionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => SentimentExtractionSelectObjectSchema).optional(),
  include: z.lazy(() => SentimentExtractionIncludeObjectSchema).optional()
}).strict();
export const SentimentExtractionArgsObjectSchema = makeSchema();
export const SentimentExtractionArgsObjectZodSchema = makeSchema();
