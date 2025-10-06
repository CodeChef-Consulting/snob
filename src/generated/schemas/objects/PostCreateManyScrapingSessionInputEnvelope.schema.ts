import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateManyScrapingSessionInputObjectSchema as PostCreateManyScrapingSessionInputObjectSchema } from './PostCreateManyScrapingSessionInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PostCreateManyScrapingSessionInputObjectSchema), z.lazy(() => PostCreateManyScrapingSessionInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PostCreateManyScrapingSessionInputEnvelopeObjectSchema: z.ZodType<Prisma.PostCreateManyScrapingSessionInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateManyScrapingSessionInputEnvelope>;
export const PostCreateManyScrapingSessionInputEnvelopeObjectZodSchema = makeSchema();
