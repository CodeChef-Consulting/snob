import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostUncheckedCreateNestedManyWithoutScrapingSessionInputObjectSchema as PostUncheckedCreateNestedManyWithoutScrapingSessionInputObjectSchema } from './PostUncheckedCreateNestedManyWithoutScrapingSessionInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  subreddit: z.string(),
  mode: z.string().optional(),
  timeframe: z.string().optional().nullable(),
  searchQuery: z.string().optional().nullable(),
  lastPostId: z.string().optional().nullable(),
  lastPostTimestamp: z.coerce.date().optional().nullable(),
  postsScraped: z.number().int().optional(),
  commentsScraped: z.number().int().optional(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutScrapingSessionInputObjectSchema).optional()
}).strict();
export const ScrapingSessionUncheckedCreateWithoutCommentsInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUncheckedCreateWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUncheckedCreateWithoutCommentsInput>;
export const ScrapingSessionUncheckedCreateWithoutCommentsInputObjectZodSchema = makeSchema();
