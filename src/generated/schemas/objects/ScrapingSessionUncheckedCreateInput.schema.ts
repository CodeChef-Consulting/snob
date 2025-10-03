import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  subreddit: z.string(),
  lastPostId: z.string().optional().nullable(),
  lastPostTimestamp: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ScrapingSessionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUncheckedCreateInput>;
export const ScrapingSessionUncheckedCreateInputObjectZodSchema = makeSchema();
