import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ScrapingSessionOrderByWithRelationInputObjectSchema as ScrapingSessionOrderByWithRelationInputObjectSchema } from './ScrapingSessionOrderByWithRelationInput.schema';
import { CommentOrderByRelationAggregateInputObjectSchema as CommentOrderByRelationAggregateInputObjectSchema } from './CommentOrderByRelationAggregateInput.schema';
import { FileOrderByRelationAggregateInputObjectSchema as FileOrderByRelationAggregateInputObjectSchema } from './FileOrderByRelationAggregateInput.schema';
import { RestaurantGroupOrderByRelationAggregateInputObjectSchema as RestaurantGroupOrderByRelationAggregateInputObjectSchema } from './RestaurantGroupOrderByRelationAggregateInput.schema';
import { RestaurantExtractionOrderByWithRelationInputObjectSchema as RestaurantExtractionOrderByWithRelationInputObjectSchema } from './RestaurantExtractionOrderByWithRelationInput.schema';
import { SentimentExtractionOrderByWithRelationInputObjectSchema as SentimentExtractionOrderByWithRelationInputObjectSchema } from './SentimentExtractionOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  externalId: SortOrderSchema.optional(),
  subreddit: SortOrderSchema.optional(),
  author: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  title: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  body: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  score: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  ups: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  downs: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  upvoteRatio: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  numComments: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  gilded: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  permalink: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdUtc: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  scrapingSessionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  commentsLastScrapedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  commentsFullyScraped: SortOrderSchema.optional(),
  scrapingSession: z.lazy(() => ScrapingSessionOrderByWithRelationInputObjectSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputObjectSchema).optional(),
  files: z.lazy(() => FileOrderByRelationAggregateInputObjectSchema).optional(),
  restaurantGroupsMentioned: z.lazy(() => RestaurantGroupOrderByRelationAggregateInputObjectSchema).optional(),
  restaurantExtraction: z.lazy(() => RestaurantExtractionOrderByWithRelationInputObjectSchema).optional(),
  sentimentExtraction: z.lazy(() => SentimentExtractionOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const PostOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PostOrderByWithRelationInput>;
export const PostOrderByWithRelationInputObjectZodSchema = makeSchema();
