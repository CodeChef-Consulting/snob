import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateNestedManyWithoutScrapingSessionInputObjectSchema as CommentCreateNestedManyWithoutScrapingSessionInputObjectSchema } from './CommentCreateNestedManyWithoutScrapingSessionInput.schema'

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
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutScrapingSessionInputObjectSchema).optional()
}).strict();
export const ScrapingSessionCreateWithoutPostsInputObjectSchema: z.ZodType<Prisma.ScrapingSessionCreateWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCreateWithoutPostsInput>;
export const ScrapingSessionCreateWithoutPostsInputObjectZodSchema = makeSchema();
