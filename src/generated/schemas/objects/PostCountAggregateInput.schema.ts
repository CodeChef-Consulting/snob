import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  externalId: z.literal(true).optional(),
  subreddit: z.literal(true).optional(),
  author: z.literal(true).optional(),
  title: z.literal(true).optional(),
  body: z.literal(true).optional(),
  score: z.literal(true).optional(),
  upvoteRatio: z.literal(true).optional(),
  numComments: z.literal(true).optional(),
  url: z.literal(true).optional(),
  restaurantsMentioned: z.literal(true).optional(),
  createdUtc: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  restaurantId: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const PostCountAggregateInputObjectSchema: z.ZodType<Prisma.PostCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PostCountAggregateInputType>;
export const PostCountAggregateInputObjectZodSchema = makeSchema();
