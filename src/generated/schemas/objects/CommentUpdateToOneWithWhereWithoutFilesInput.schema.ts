import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema';
import { CommentUpdateWithoutFilesInputObjectSchema as CommentUpdateWithoutFilesInputObjectSchema } from './CommentUpdateWithoutFilesInput.schema';
import { CommentUncheckedUpdateWithoutFilesInputObjectSchema as CommentUncheckedUpdateWithoutFilesInputObjectSchema } from './CommentUncheckedUpdateWithoutFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CommentUpdateWithoutFilesInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutFilesInputObjectSchema)])
}).strict();
export const CommentUpdateToOneWithWhereWithoutFilesInputObjectSchema: z.ZodType<Prisma.CommentUpdateToOneWithWhereWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateToOneWithWhereWithoutFilesInput>;
export const CommentUpdateToOneWithWhereWithoutFilesInputObjectZodSchema = makeSchema();
