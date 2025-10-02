import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantArgsObjectSchema } from './RestaurantArgs.schema';
import { CommentFindManySchema } from '../findManyComment.schema';
import { FileFindManySchema } from '../findManyFile.schema';
import { PostCountOutputTypeArgsObjectSchema } from './PostCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  restaurant: z.union([z.boolean(), z.lazy(() => RestaurantArgsObjectSchema)]).optional(),
  comments: z.union([z.boolean(), z.lazy(() => CommentFindManySchema)]).optional(),
  files: z.union([z.boolean(), z.lazy(() => FileFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PostCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PostIncludeObjectSchema: z.ZodType<Prisma.PostInclude> = makeSchema() as unknown as z.ZodType<Prisma.PostInclude>;
export const PostIncludeObjectZodSchema = makeSchema();
