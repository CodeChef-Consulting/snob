import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutFilesInputObjectSchema as PostCreateWithoutFilesInputObjectSchema } from './PostCreateWithoutFilesInput.schema';
import { PostUncheckedCreateWithoutFilesInputObjectSchema as PostUncheckedCreateWithoutFilesInputObjectSchema } from './PostUncheckedCreateWithoutFilesInput.schema';
import { PostCreateOrConnectWithoutFilesInputObjectSchema as PostCreateOrConnectWithoutFilesInputObjectSchema } from './PostCreateOrConnectWithoutFilesInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutFilesInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutFilesInputObjectSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputObjectSchema).optional()
}).strict();
export const PostCreateNestedOneWithoutFilesInputObjectSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateNestedOneWithoutFilesInput>;
export const PostCreateNestedOneWithoutFilesInputObjectZodSchema = makeSchema();
