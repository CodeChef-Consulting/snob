import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentCreateWithoutParentCommentInputObjectSchema } from './CommentCreateWithoutParentCommentInput.schema';
import { CommentUncheckedCreateWithoutParentCommentInputObjectSchema } from './CommentUncheckedCreateWithoutParentCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CommentCreateWithoutParentCommentInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutParentCommentInputObjectSchema)])
}).strict();
export const CommentCreateOrConnectWithoutParentCommentInputObjectSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutParentCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateOrConnectWithoutParentCommentInput>;
export const CommentCreateOrConnectWithoutParentCommentInputObjectZodSchema = makeSchema();
