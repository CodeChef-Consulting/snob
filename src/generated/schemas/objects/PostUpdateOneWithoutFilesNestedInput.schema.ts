import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutFilesInputObjectSchema as PostCreateWithoutFilesInputObjectSchema } from './PostCreateWithoutFilesInput.schema';
import { PostUncheckedCreateWithoutFilesInputObjectSchema as PostUncheckedCreateWithoutFilesInputObjectSchema } from './PostUncheckedCreateWithoutFilesInput.schema';
import { PostCreateOrConnectWithoutFilesInputObjectSchema as PostCreateOrConnectWithoutFilesInputObjectSchema } from './PostCreateOrConnectWithoutFilesInput.schema';
import { PostUpsertWithoutFilesInputObjectSchema as PostUpsertWithoutFilesInputObjectSchema } from './PostUpsertWithoutFilesInput.schema';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './PostWhereInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateToOneWithWhereWithoutFilesInputObjectSchema as PostUpdateToOneWithWhereWithoutFilesInputObjectSchema } from './PostUpdateToOneWithWhereWithoutFilesInput.schema';
import { PostUpdateWithoutFilesInputObjectSchema as PostUpdateWithoutFilesInputObjectSchema } from './PostUpdateWithoutFilesInput.schema';
import { PostUncheckedUpdateWithoutFilesInputObjectSchema as PostUncheckedUpdateWithoutFilesInputObjectSchema } from './PostUncheckedUpdateWithoutFilesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutFilesInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutFilesInputObjectSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutFilesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => PostWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => PostWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => PostWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PostUpdateToOneWithWhereWithoutFilesInputObjectSchema), z.lazy(() => PostUpdateWithoutFilesInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutFilesInputObjectSchema)]).optional()
}).strict();
export const PostUpdateOneWithoutFilesNestedInputObjectSchema: z.ZodType<Prisma.PostUpdateOneWithoutFilesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateOneWithoutFilesNestedInput>;
export const PostUpdateOneWithoutFilesNestedInputObjectZodSchema = makeSchema();
