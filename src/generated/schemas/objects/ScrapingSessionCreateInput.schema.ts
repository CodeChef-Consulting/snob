import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  subreddit: z.string(),
  mode: z.string().optional(),
  timeframe: z.string().optional().nullable(),
  searchQuery: z.string().optional().nullable(),
  lastPostId: z.string().optional().nullable(),
  lastPostTimestamp: z.coerce.date().optional().nullable(),
  postsScraped: z.number().int().optional(),
  commentsScraped: z.number().int().optional(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ScrapingSessionCreateInputObjectSchema: z.ZodType<Prisma.ScrapingSessionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCreateInput>;
export const ScrapingSessionCreateInputObjectZodSchema = makeSchema();
