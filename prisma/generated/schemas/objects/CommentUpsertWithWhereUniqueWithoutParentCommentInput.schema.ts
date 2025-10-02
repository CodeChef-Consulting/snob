import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithoutParentCommentInputObjectSchema as CommentUpdateWithoutParentCommentInputObjectSchema } from './CommentUpdateWithoutParentCommentInput.schema';
import { CommentUncheckedUpdateWithoutParentCommentInputObjectSchema as CommentUncheckedUpdateWithoutParentCommentInputObjectSchema } from './CommentUncheckedUpdateWithoutParentCommentInput.schema';
import { CommentCreateWithoutParentCommentInputObjectSchema as CommentCreateWithoutParentCommentInputObjectSchema } from './CommentCreateWithoutParentCommentInput.schema';
import { CommentUncheckedCreateWithoutParentCommentInputObjectSchema as CommentUncheckedCreateWithoutParentCommentInputObjectSchema } from './CommentUncheckedCreateWithoutParentCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CommentUpdateWithoutParentCommentInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutParentCommentInputObjectSchema)]),
  create: z.union([z.lazy(() => CommentCreateWithoutParentCommentInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutParentCommentInputObjectSchema)])
}).strict();
export const CommentUpsertWithWhereUniqueWithoutParentCommentInputObjectSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutParentCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutParentCommentInput>;
export const CommentUpsertWithWhereUniqueWithoutParentCommentInputObjectZodSchema = makeSchema();
