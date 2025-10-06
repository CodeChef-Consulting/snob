import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionArgsObjectSchema as ScrapingSessionArgsObjectSchema } from './ScrapingSessionArgs.schema';
import { CommentFindManySchema as CommentFindManySchema } from '../findManyComment.schema';
import { FileFindManySchema as FileFindManySchema } from '../findManyFile.schema';
import { RestaurantFindManySchema as RestaurantFindManySchema } from '../findManyRestaurant.schema';
import { PostCountOutputTypeArgsObjectSchema as PostCountOutputTypeArgsObjectSchema } from './PostCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  externalId: z.boolean().optional(),
  subreddit: z.boolean().optional(),
  author: z.boolean().optional(),
  title: z.boolean().optional(),
  body: z.boolean().optional(),
  score: z.boolean().optional(),
  upvoteRatio: z.boolean().optional(),
  numComments: z.boolean().optional(),
  url: z.boolean().optional(),
  createdUtc: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  scrapingSession: z.union([z.boolean(), z.lazy(() => ScrapingSessionArgsObjectSchema)]).optional(),
  scrapingSessionId: z.boolean().optional(),
  comments: z.union([z.boolean(), z.lazy(() => CommentFindManySchema)]).optional(),
  files: z.union([z.boolean(), z.lazy(() => FileFindManySchema)]).optional(),
  restaurantsMentioned: z.union([z.boolean(), z.lazy(() => RestaurantFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PostCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PostSelectObjectSchema: z.ZodType<Prisma.PostSelect> = makeSchema() as unknown as z.ZodType<Prisma.PostSelect>;
export const PostSelectObjectZodSchema = makeSchema();
