import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithoutScrapingSessionInputObjectSchema as PostUpdateWithoutScrapingSessionInputObjectSchema } from './PostUpdateWithoutScrapingSessionInput.schema';
import { PostUncheckedUpdateWithoutScrapingSessionInputObjectSchema as PostUncheckedUpdateWithoutScrapingSessionInputObjectSchema } from './PostUncheckedUpdateWithoutScrapingSessionInput.schema';
import { PostCreateWithoutScrapingSessionInputObjectSchema as PostCreateWithoutScrapingSessionInputObjectSchema } from './PostCreateWithoutScrapingSessionInput.schema';
import { PostUncheckedCreateWithoutScrapingSessionInputObjectSchema as PostUncheckedCreateWithoutScrapingSessionInputObjectSchema } from './PostUncheckedCreateWithoutScrapingSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PostUpdateWithoutScrapingSessionInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutScrapingSessionInputObjectSchema)]),
  create: z.union([z.lazy(() => PostCreateWithoutScrapingSessionInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutScrapingSessionInputObjectSchema)])
}).strict();
export const PostUpsertWithWhereUniqueWithoutScrapingSessionInputObjectSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutScrapingSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutScrapingSessionInput>;
export const PostUpsertWithWhereUniqueWithoutScrapingSessionInputObjectZodSchema = makeSchema();
