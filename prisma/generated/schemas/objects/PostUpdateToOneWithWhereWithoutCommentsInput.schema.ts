import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereInputObjectSchema } from './PostWhereInput.schema';
import { PostUpdateWithoutCommentsInputObjectSchema } from './PostUpdateWithoutCommentsInput.schema';
import { PostUncheckedUpdateWithoutCommentsInputObjectSchema } from './PostUncheckedUpdateWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PostUpdateWithoutCommentsInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutCommentsInputObjectSchema)])
}).strict();
export const PostUpdateToOneWithWhereWithoutCommentsInputObjectSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutCommentsInput>;
export const PostUpdateToOneWithWhereWithoutCommentsInputObjectZodSchema = makeSchema();
