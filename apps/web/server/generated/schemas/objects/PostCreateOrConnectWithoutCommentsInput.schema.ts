import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostCreateWithoutCommentsInputObjectSchema as PostCreateWithoutCommentsInputObjectSchema } from './PostCreateWithoutCommentsInput.schema';
import { PostUncheckedCreateWithoutCommentsInputObjectSchema as PostUncheckedCreateWithoutCommentsInputObjectSchema } from './PostUncheckedCreateWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PostCreateWithoutCommentsInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutCommentsInputObjectSchema)])
}).strict();
export const PostCreateOrConnectWithoutCommentsInputObjectSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateOrConnectWithoutCommentsInput>;
export const PostCreateOrConnectWithoutCommentsInputObjectZodSchema = makeSchema();
