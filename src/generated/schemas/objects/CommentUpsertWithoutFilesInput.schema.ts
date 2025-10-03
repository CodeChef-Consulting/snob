import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentUpdateWithoutFilesInputObjectSchema as CommentUpdateWithoutFilesInputObjectSchema } from './CommentUpdateWithoutFilesInput.schema';
import { CommentUncheckedUpdateWithoutFilesInputObjectSchema as CommentUncheckedUpdateWithoutFilesInputObjectSchema } from './CommentUncheckedUpdateWithoutFilesInput.schema';
import { CommentCreateWithoutFilesInputObjectSchema as CommentCreateWithoutFilesInputObjectSchema } from './CommentCreateWithoutFilesInput.schema';
import { CommentUncheckedCreateWithoutFilesInputObjectSchema as CommentUncheckedCreateWithoutFilesInputObjectSchema } from './CommentUncheckedCreateWithoutFilesInput.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CommentUpdateWithoutFilesInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutFilesInputObjectSchema)]),
  create: z.union([z.lazy(() => CommentCreateWithoutFilesInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutFilesInputObjectSchema)]),
  where: z.lazy(() => CommentWhereInputObjectSchema).optional()
}).strict();
export const CommentUpsertWithoutFilesInputObjectSchema: z.ZodType<Prisma.CommentUpsertWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpsertWithoutFilesInput>;
export const CommentUpsertWithoutFilesInputObjectZodSchema = makeSchema();
