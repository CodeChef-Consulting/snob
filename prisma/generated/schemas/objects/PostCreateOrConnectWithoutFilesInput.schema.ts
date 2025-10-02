import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostCreateWithoutFilesInputObjectSchema } from './PostCreateWithoutFilesInput.schema';
import { PostUncheckedCreateWithoutFilesInputObjectSchema } from './PostUncheckedCreateWithoutFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PostCreateWithoutFilesInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutFilesInputObjectSchema)])
}).strict();
export const PostCreateOrConnectWithoutFilesInputObjectSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateOrConnectWithoutFilesInput>;
export const PostCreateOrConnectWithoutFilesInputObjectZodSchema = makeSchema();
