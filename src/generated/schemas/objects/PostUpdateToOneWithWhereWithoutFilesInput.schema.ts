import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './PostWhereInput.schema';
import { PostUpdateWithoutFilesInputObjectSchema as PostUpdateWithoutFilesInputObjectSchema } from './PostUpdateWithoutFilesInput.schema';
import { PostUncheckedUpdateWithoutFilesInputObjectSchema as PostUncheckedUpdateWithoutFilesInputObjectSchema } from './PostUncheckedUpdateWithoutFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PostUpdateWithoutFilesInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutFilesInputObjectSchema)])
}).strict();
export const PostUpdateToOneWithWhereWithoutFilesInputObjectSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutFilesInput>;
export const PostUpdateToOneWithWhereWithoutFilesInputObjectZodSchema = makeSchema();
