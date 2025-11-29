import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationFindManySchema as RestaurantLocationFindManySchema } from '../findManyRestaurantLocation.schema';
import { PostFindManySchema as PostFindManySchema } from '../findManyPost.schema';
import { CommentFindManySchema as CommentFindManySchema } from '../findManyComment.schema';
import { RestaurantGroupCountOutputTypeArgsObjectSchema as RestaurantGroupCountOutputTypeArgsObjectSchema } from './RestaurantGroupCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  locations: z.union([z.boolean(), z.lazy(() => RestaurantLocationFindManySchema)]).optional(),
  posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
  comments: z.union([z.boolean(), z.lazy(() => CommentFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => RestaurantGroupCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const RestaurantGroupIncludeObjectSchema: z.ZodType<Prisma.RestaurantGroupInclude> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupInclude>;
export const RestaurantGroupIncludeObjectZodSchema = makeSchema();
