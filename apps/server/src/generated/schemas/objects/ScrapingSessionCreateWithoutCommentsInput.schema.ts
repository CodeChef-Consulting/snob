import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateNestedManyWithoutScrapingSessionInputObjectSchema as PostCreateNestedManyWithoutScrapingSessionInputObjectSchema } from './PostCreateNestedManyWithoutScrapingSessionInput.schema'

const makeSchema = () => z.object({
  subreddit: z.string(),
  mode: z.string().optional(),
  timeframe: z.string().optional().nullable(),
  searchQuery: z.string().optional().nullable(),
  lastPostId: z.string().optional().nullable(),
  lastPostTimestamp: z.coerce.date().optional().nullable(),
  postsScraped: z.number().int().optional(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutScrapingSessionInputObjectSchema).optional()
}).strict();
export const ScrapingSessionCreateWithoutCommentsInputObjectSchema: z.ZodType<Prisma.ScrapingSessionCreateWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCreateWithoutCommentsInput>;
export const ScrapingSessionCreateWithoutCommentsInputObjectZodSchema = makeSchema();
