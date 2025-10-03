import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  subreddit: z.boolean().optional(),
  lastPostId: z.boolean().optional(),
  lastPostTimestamp: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const ScrapingSessionSelectObjectSchema: z.ZodType<Prisma.ScrapingSessionSelect> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionSelect>;
export const ScrapingSessionSelectObjectZodSchema = makeSchema();
