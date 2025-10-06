import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostFindManySchema as PostFindManySchema } from '../findManyPost.schema';
import { CommentFindManySchema as CommentFindManySchema } from '../findManyComment.schema';
import { ScrapingSessionCountOutputTypeArgsObjectSchema as ScrapingSessionCountOutputTypeArgsObjectSchema } from './ScrapingSessionCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
  comments: z.union([z.boolean(), z.lazy(() => CommentFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ScrapingSessionCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ScrapingSessionIncludeObjectSchema: z.ZodType<Prisma.ScrapingSessionInclude> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionInclude>;
export const ScrapingSessionIncludeObjectZodSchema = makeSchema();
