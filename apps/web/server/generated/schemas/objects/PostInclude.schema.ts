import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionArgsObjectSchema as ScrapingSessionArgsObjectSchema } from './ScrapingSessionArgs.schema';
import { CommentFindManySchema as CommentFindManySchema } from '../findManyComment.schema';
import { FileFindManySchema as FileFindManySchema } from '../findManyFile.schema';
import { RestaurantFindManySchema as RestaurantFindManySchema } from '../findManyRestaurant.schema';
import { RestaurantGroupFindManySchema as RestaurantGroupFindManySchema } from '../findManyRestaurantGroup.schema';
import { RestaurantExtractionArgsObjectSchema as RestaurantExtractionArgsObjectSchema } from './RestaurantExtractionArgs.schema';
import { SentimentExtractionArgsObjectSchema as SentimentExtractionArgsObjectSchema } from './SentimentExtractionArgs.schema';
import { PostCountOutputTypeArgsObjectSchema as PostCountOutputTypeArgsObjectSchema } from './PostCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  scrapingSession: z.union([z.boolean(), z.lazy(() => ScrapingSessionArgsObjectSchema)]).optional(),
  comments: z.union([z.boolean(), z.lazy(() => CommentFindManySchema)]).optional(),
  files: z.union([z.boolean(), z.lazy(() => FileFindManySchema)]).optional(),
  restaurantsMentioned: z.union([z.boolean(), z.lazy(() => RestaurantFindManySchema)]).optional(),
  restaurantGroupsMentioned: z.union([z.boolean(), z.lazy(() => RestaurantGroupFindManySchema)]).optional(),
  restaurantExtraction: z.union([z.boolean(), z.lazy(() => RestaurantExtractionArgsObjectSchema)]).optional(),
  sentimentExtraction: z.union([z.boolean(), z.lazy(() => SentimentExtractionArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PostCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PostIncludeObjectSchema: z.ZodType<Prisma.PostInclude> = makeSchema() as unknown as z.ZodType<Prisma.PostInclude>;
export const PostIncludeObjectZodSchema = makeSchema();
