import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentUpdateWithoutFilesInputObjectSchema } from './CommentUpdateWithoutFilesInput.schema';
import { CommentUncheckedUpdateWithoutFilesInputObjectSchema } from './CommentUncheckedUpdateWithoutFilesInput.schema';
import { CommentCreateWithoutFilesInputObjectSchema } from './CommentCreateWithoutFilesInput.schema';
import { CommentUncheckedCreateWithoutFilesInputObjectSchema } from './CommentUncheckedCreateWithoutFilesInput.schema';
import { CommentWhereInputObjectSchema } from './CommentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CommentUpdateWithoutFilesInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutFilesInputObjectSchema)]),
  create: z.union([z.lazy(() => CommentCreateWithoutFilesInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutFilesInputObjectSchema)]),
  where: z.lazy(() => CommentWhereInputObjectSchema).optional()
}).strict();
export const CommentUpsertWithoutFilesInputObjectSchema: z.ZodType<Prisma.CommentUpsertWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpsertWithoutFilesInput>;
export const CommentUpsertWithoutFilesInputObjectZodSchema = makeSchema();
