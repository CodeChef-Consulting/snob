import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostCreateWithoutScrapingSessionInputObjectSchema as PostCreateWithoutScrapingSessionInputObjectSchema } from './PostCreateWithoutScrapingSessionInput.schema';
import { PostUncheckedCreateWithoutScrapingSessionInputObjectSchema as PostUncheckedCreateWithoutScrapingSessionInputObjectSchema } from './PostUncheckedCreateWithoutScrapingSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PostCreateWithoutScrapingSessionInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutScrapingSessionInputObjectSchema)])
}).strict();
export const PostCreateOrConnectWithoutScrapingSessionInputObjectSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutScrapingSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateOrConnectWithoutScrapingSessionInput>;
export const PostCreateOrConnectWithoutScrapingSessionInputObjectZodSchema = makeSchema();
