import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithoutParentCommentInputObjectSchema as CommentUpdateWithoutParentCommentInputObjectSchema } from './CommentUpdateWithoutParentCommentInput.schema';
import { CommentUncheckedUpdateWithoutParentCommentInputObjectSchema as CommentUncheckedUpdateWithoutParentCommentInputObjectSchema } from './CommentUncheckedUpdateWithoutParentCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CommentUpdateWithoutParentCommentInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutParentCommentInputObjectSchema)])
}).strict();
export const CommentUpdateWithWhereUniqueWithoutParentCommentInputObjectSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutParentCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutParentCommentInput>;
export const CommentUpdateWithWhereUniqueWithoutParentCommentInputObjectZodSchema = makeSchema();
