import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostFindManySchema as PostFindManySchema } from '../findManyPost.schema';
import { CommentFindManySchema as CommentFindManySchema } from '../findManyComment.schema';
import { RestaurantCountOutputTypeArgsObjectSchema as RestaurantCountOutputTypeArgsObjectSchema } from './RestaurantCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  address: z.boolean().optional(),
  city: z.boolean().optional(),
  state: z.boolean().optional(),
  zipCode: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  source: z.boolean().optional(),
  googlePlaceId: z.boolean().optional(),
  lookupAliases: z.boolean().optional(),
  metadata: z.boolean().optional(),
  rawScore: z.boolean().optional(),
  normalizedScore: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
  comments: z.union([z.boolean(), z.lazy(() => CommentFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => RestaurantCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const RestaurantSelectObjectSchema: z.ZodType<Prisma.RestaurantSelect> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantSelect>;
export const RestaurantSelectObjectZodSchema = makeSchema();
