import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  subreddit: z.string(),
  lastPostId: z.string().optional().nullable(),
  lastPostTimestamp: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ScrapingSessionCreateInputObjectSchema: z.ZodType<Prisma.ScrapingSessionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCreateInput>;
export const ScrapingSessionCreateInputObjectZodSchema = makeSchema();
