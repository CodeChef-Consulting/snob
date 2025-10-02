import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostUpdateWithoutFilesInputObjectSchema } from './PostUpdateWithoutFilesInput.schema';
import { PostUncheckedUpdateWithoutFilesInputObjectSchema } from './PostUncheckedUpdateWithoutFilesInput.schema';
import { PostCreateWithoutFilesInputObjectSchema } from './PostCreateWithoutFilesInput.schema';
import { PostUncheckedCreateWithoutFilesInputObjectSchema } from './PostUncheckedCreateWithoutFilesInput.schema';
import { PostWhereInputObjectSchema } from './PostWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PostUpdateWithoutFilesInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutFilesInputObjectSchema)]),
  create: z.union([z.lazy(() => PostCreateWithoutFilesInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutFilesInputObjectSchema)]),
  where: z.lazy(() => PostWhereInputObjectSchema).optional()
}).strict();
export const PostUpsertWithoutFilesInputObjectSchema: z.ZodType<Prisma.PostUpsertWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpsertWithoutFilesInput>;
export const PostUpsertWithoutFilesInputObjectZodSchema = makeSchema();
