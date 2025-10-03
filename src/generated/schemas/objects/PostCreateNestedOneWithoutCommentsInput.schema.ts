import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutCommentsInputObjectSchema as PostCreateWithoutCommentsInputObjectSchema } from './PostCreateWithoutCommentsInput.schema';
import { PostUncheckedCreateWithoutCommentsInputObjectSchema as PostUncheckedCreateWithoutCommentsInputObjectSchema } from './PostUncheckedCreateWithoutCommentsInput.schema';
import { PostCreateOrConnectWithoutCommentsInputObjectSchema as PostCreateOrConnectWithoutCommentsInputObjectSchema } from './PostCreateOrConnectWithoutCommentsInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutCommentsInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutCommentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputObjectSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputObjectSchema).optional()
}).strict();
export const PostCreateNestedOneWithoutCommentsInputObjectSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateNestedOneWithoutCommentsInput>;
export const PostCreateNestedOneWithoutCommentsInputObjectZodSchema = makeSchema();
