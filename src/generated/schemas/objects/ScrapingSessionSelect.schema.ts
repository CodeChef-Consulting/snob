import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostFindManySchema as PostFindManySchema } from '../findManyPost.schema';
import { CommentFindManySchema as CommentFindManySchema } from '../findManyComment.schema';
import { ScrapingSessionCountOutputTypeArgsObjectSchema as ScrapingSessionCountOutputTypeArgsObjectSchema } from './ScrapingSessionCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  subreddit: z.boolean().optional(),
  mode: z.boolean().optional(),
  timeframe: z.boolean().optional(),
  searchQuery: z.boolean().optional(),
  lastPostId: z.boolean().optional(),
  lastPostTimestamp: z.boolean().optional(),
  postsScraped: z.boolean().optional(),
  completed: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
  comments: z.union([z.boolean(), z.lazy(() => CommentFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ScrapingSessionCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ScrapingSessionSelectObjectSchema: z.ZodType<Prisma.ScrapingSessionSelect> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionSelect>;
export const ScrapingSessionSelectObjectZodSchema = makeSchema();
