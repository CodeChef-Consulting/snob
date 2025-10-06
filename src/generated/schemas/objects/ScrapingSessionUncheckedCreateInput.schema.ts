import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostUncheckedCreateNestedManyWithoutScrapingSessionInputObjectSchema as PostUncheckedCreateNestedManyWithoutScrapingSessionInputObjectSchema } from './PostUncheckedCreateNestedManyWithoutScrapingSessionInput.schema';
import { CommentUncheckedCreateNestedManyWithoutScrapingSessionInputObjectSchema as CommentUncheckedCreateNestedManyWithoutScrapingSessionInputObjectSchema } from './CommentUncheckedCreateNestedManyWithoutScrapingSessionInput.schema'

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
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutScrapingSessionInputObjectSchema),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutScrapingSessionInputObjectSchema)
}).strict();
export const ScrapingSessionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUncheckedCreateInput>;
export const ScrapingSessionUncheckedCreateInputObjectZodSchema = makeSchema();
