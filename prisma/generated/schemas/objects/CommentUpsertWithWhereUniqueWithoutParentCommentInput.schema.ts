import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithoutParentCommentInputObjectSchema } from './CommentUpdateWithoutParentCommentInput.schema';
import { CommentUncheckedUpdateWithoutParentCommentInputObjectSchema } from './CommentUncheckedUpdateWithoutParentCommentInput.schema';
import { CommentCreateWithoutParentCommentInputObjectSchema } from './CommentCreateWithoutParentCommentInput.schema';
import { CommentUncheckedCreateWithoutParentCommentInputObjectSchema } from './CommentUncheckedCreateWithoutParentCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CommentUpdateWithoutParentCommentInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutParentCommentInputObjectSchema)]),
  create: z.union([z.lazy(() => CommentCreateWithoutParentCommentInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutParentCommentInputObjectSchema)])
}).strict();
export const CommentUpsertWithWhereUniqueWithoutParentCommentInputObjectSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutParentCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutParentCommentInput>;
export const CommentUpsertWithWhereUniqueWithoutParentCommentInputObjectZodSchema = makeSchema();
