import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithoutScrapingSessionInputObjectSchema as PostUpdateWithoutScrapingSessionInputObjectSchema } from './PostUpdateWithoutScrapingSessionInput.schema';
import { PostUncheckedUpdateWithoutScrapingSessionInputObjectSchema as PostUncheckedUpdateWithoutScrapingSessionInputObjectSchema } from './PostUncheckedUpdateWithoutScrapingSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PostUpdateWithoutScrapingSessionInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutScrapingSessionInputObjectSchema)])
}).strict();
export const PostUpdateWithWhereUniqueWithoutScrapingSessionInputObjectSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutScrapingSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutScrapingSessionInput>;
export const PostUpdateWithWhereUniqueWithoutScrapingSessionInputObjectZodSchema = makeSchema();
