import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutFilesInputObjectSchema } from './CommentCreateWithoutFilesInput.schema';
import { CommentUncheckedCreateWithoutFilesInputObjectSchema } from './CommentUncheckedCreateWithoutFilesInput.schema';
import { CommentCreateOrConnectWithoutFilesInputObjectSchema } from './CommentCreateOrConnectWithoutFilesInput.schema';
import { CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutFilesInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutFilesInputObjectSchema).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputObjectSchema).optional()
}).strict();
export const CommentCreateNestedOneWithoutFilesInputObjectSchema: z.ZodType<Prisma.CommentCreateNestedOneWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateNestedOneWithoutFilesInput>;
export const CommentCreateNestedOneWithoutFilesInputObjectZodSchema = makeSchema();
