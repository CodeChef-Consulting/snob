import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateManyScrapingSessionInputObjectSchema as CommentCreateManyScrapingSessionInputObjectSchema } from './CommentCreateManyScrapingSessionInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CommentCreateManyScrapingSessionInputObjectSchema), z.lazy(() => CommentCreateManyScrapingSessionInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CommentCreateManyScrapingSessionInputEnvelopeObjectSchema: z.ZodType<Prisma.CommentCreateManyScrapingSessionInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateManyScrapingSessionInputEnvelope>;
export const CommentCreateManyScrapingSessionInputEnvelopeObjectZodSchema = makeSchema();
