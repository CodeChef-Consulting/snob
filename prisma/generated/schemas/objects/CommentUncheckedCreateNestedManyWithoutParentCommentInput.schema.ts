import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutParentCommentInputObjectSchema } from './CommentCreateWithoutParentCommentInput.schema';
import { CommentUncheckedCreateWithoutParentCommentInputObjectSchema } from './CommentUncheckedCreateWithoutParentCommentInput.schema';
import { CommentCreateOrConnectWithoutParentCommentInputObjectSchema } from './CommentCreateOrConnectWithoutParentCommentInput.schema';
import { CommentCreateManyParentCommentInputEnvelopeObjectSchema } from './CommentCreateManyParentCommentInputEnvelope.schema';
import { CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutParentCommentInputObjectSchema), z.lazy(() => CommentCreateWithoutParentCommentInputObjectSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutParentCommentInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutParentCommentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CommentCreateOrConnectWithoutParentCommentInputObjectSchema), z.lazy(() => CommentCreateOrConnectWithoutParentCommentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CommentCreateManyParentCommentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutParentCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutParentCommentInput>;
export const CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectZodSchema = makeSchema();
