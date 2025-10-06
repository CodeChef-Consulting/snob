import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostArgsObjectSchema as PostArgsObjectSchema } from './PostArgs.schema';
import { CommentArgsObjectSchema as CommentArgsObjectSchema } from './CommentArgs.schema';
import { CommentFindManySchema as CommentFindManySchema } from '../findManyComment.schema';
import { ScrapingSessionArgsObjectSchema as ScrapingSessionArgsObjectSchema } from './ScrapingSessionArgs.schema';
import { FileFindManySchema as FileFindManySchema } from '../findManyFile.schema';
import { RestaurantFindManySchema as RestaurantFindManySchema } from '../findManyRestaurant.schema';
import { CommentCountOutputTypeArgsObjectSchema as CommentCountOutputTypeArgsObjectSchema } from './CommentCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  externalId: z.boolean().optional(),
  post: z.union([z.boolean(), z.lazy(() => PostArgsObjectSchema)]).optional(),
  postId: z.boolean().optional(),
  parentComment: z.union([z.boolean(), z.lazy(() => CommentArgsObjectSchema)]).optional(),
  parentCommentId: z.boolean().optional(),
  replies: z.union([z.boolean(), z.lazy(() => CommentFindManySchema)]).optional(),
  author: z.boolean().optional(),
  body: z.boolean().optional(),
  score: z.boolean().optional(),
  createdUtc: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  scrapingSession: z.union([z.boolean(), z.lazy(() => ScrapingSessionArgsObjectSchema)]).optional(),
  scrapingSessionId: z.boolean().optional(),
  files: z.union([z.boolean(), z.lazy(() => FileFindManySchema)]).optional(),
  restaurantsMentioned: z.union([z.boolean(), z.lazy(() => RestaurantFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CommentCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CommentSelectObjectSchema: z.ZodType<Prisma.CommentSelect> = makeSchema() as unknown as z.ZodType<Prisma.CommentSelect>;
export const CommentSelectObjectZodSchema = makeSchema();
