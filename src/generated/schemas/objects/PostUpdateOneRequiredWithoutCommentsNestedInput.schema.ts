import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutCommentsInputObjectSchema as PostCreateWithoutCommentsInputObjectSchema } from './PostCreateWithoutCommentsInput.schema';
import { PostUncheckedCreateWithoutCommentsInputObjectSchema as PostUncheckedCreateWithoutCommentsInputObjectSchema } from './PostUncheckedCreateWithoutCommentsInput.schema';
import { PostCreateOrConnectWithoutCommentsInputObjectSchema as PostCreateOrConnectWithoutCommentsInputObjectSchema } from './PostCreateOrConnectWithoutCommentsInput.schema';
import { PostUpsertWithoutCommentsInputObjectSchema as PostUpsertWithoutCommentsInputObjectSchema } from './PostUpsertWithoutCommentsInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateToOneWithWhereWithoutCommentsInputObjectSchema as PostUpdateToOneWithWhereWithoutCommentsInputObjectSchema } from './PostUpdateToOneWithWhereWithoutCommentsInput.schema';
import { PostUpdateWithoutCommentsInputObjectSchema as PostUpdateWithoutCommentsInputObjectSchema } from './PostUpdateWithoutCommentsInput.schema';
import { PostUncheckedUpdateWithoutCommentsInputObjectSchema as PostUncheckedUpdateWithoutCommentsInputObjectSchema } from './PostUncheckedUpdateWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutCommentsInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutCommentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputObjectSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutCommentsInputObjectSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PostUpdateToOneWithWhereWithoutCommentsInputObjectSchema), z.lazy(() => PostUpdateWithoutCommentsInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutCommentsInputObjectSchema)]).optional()
}).strict();
export const PostUpdateOneRequiredWithoutCommentsNestedInputObjectSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutCommentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateOneRequiredWithoutCommentsNestedInput>;
export const PostUpdateOneRequiredWithoutCommentsNestedInputObjectZodSchema = makeSchema();
