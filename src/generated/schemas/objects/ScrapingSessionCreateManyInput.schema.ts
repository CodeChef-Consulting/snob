import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  subreddit: z.string(),
  lastPostId: z.string().optional().nullable(),
  lastPostTimestamp: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ScrapingSessionCreateManyInputObjectSchema: z.ZodType<Prisma.ScrapingSessionCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCreateManyInput>;
export const ScrapingSessionCreateManyInputObjectZodSchema = makeSchema();
