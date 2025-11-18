import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostArgsObjectSchema as PostArgsObjectSchema } from './PostArgs.schema';
import { CommentArgsObjectSchema as CommentArgsObjectSchema } from './CommentArgs.schema'

const makeSchema = () => z.object({
  post: z.union([z.boolean(), z.lazy(() => PostArgsObjectSchema)]).optional(),
  comment: z.union([z.boolean(), z.lazy(() => CommentArgsObjectSchema)]).optional()
}).strict();
export const RestaurantExtractionIncludeObjectSchema: z.ZodType<Prisma.RestaurantExtractionInclude> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionInclude>;
export const RestaurantExtractionIncludeObjectZodSchema = makeSchema();
