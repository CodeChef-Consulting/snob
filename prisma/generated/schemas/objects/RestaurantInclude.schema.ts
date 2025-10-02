import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostFindManySchema as PostFindManySchema } from '../findManyPost.schema';
import { ScrapingSessionFindManySchema as ScrapingSessionFindManySchema } from '../findManyScrapingSession.schema';
import { RestaurantCountOutputTypeArgsObjectSchema as RestaurantCountOutputTypeArgsObjectSchema } from './RestaurantCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
  scrapeSessions: z.union([z.boolean(), z.lazy(() => ScrapingSessionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => RestaurantCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const RestaurantIncludeObjectSchema: z.ZodType<Prisma.RestaurantInclude> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantInclude>;
export const RestaurantIncludeObjectZodSchema = makeSchema();
