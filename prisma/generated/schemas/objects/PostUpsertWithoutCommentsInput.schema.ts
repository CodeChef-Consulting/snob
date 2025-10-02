import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostUpdateWithoutCommentsInputObjectSchema } from './PostUpdateWithoutCommentsInput.schema';
import { PostUncheckedUpdateWithoutCommentsInputObjectSchema } from './PostUncheckedUpdateWithoutCommentsInput.schema';
import { PostCreateWithoutCommentsInputObjectSchema } from './PostCreateWithoutCommentsInput.schema';
import { PostUncheckedCreateWithoutCommentsInputObjectSchema } from './PostUncheckedCreateWithoutCommentsInput.schema';
import { PostWhereInputObjectSchema } from './PostWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PostUpdateWithoutCommentsInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutCommentsInputObjectSchema)]),
  create: z.union([z.lazy(() => PostCreateWithoutCommentsInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutCommentsInputObjectSchema)]),
  where: z.lazy(() => PostWhereInputObjectSchema).optional()
}).strict();
export const PostUpsertWithoutCommentsInputObjectSchema: z.ZodType<Prisma.PostUpsertWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpsertWithoutCommentsInput>;
export const PostUpsertWithoutCommentsInputObjectZodSchema = makeSchema();
