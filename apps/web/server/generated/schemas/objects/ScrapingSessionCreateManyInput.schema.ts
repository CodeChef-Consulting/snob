import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  subreddit: z.string(),
  mode: z.string().optional(),
  timeframe: z.string().optional().nullable(),
  searchQuery: z.string().optional().nullable(),
  lastPostId: z.string().optional().nullable(),
  lastPostTimestamp: z.coerce.date().optional().nullable(),
  postsScraped: z.number().int().optional(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ScrapingSessionCreateManyInputObjectSchema: z.ZodType<Prisma.ScrapingSessionCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCreateManyInput>;
export const ScrapingSessionCreateManyInputObjectZodSchema = makeSchema();
