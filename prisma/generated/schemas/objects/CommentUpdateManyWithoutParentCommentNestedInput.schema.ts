import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutParentCommentInputObjectSchema } from './CommentCreateWithoutParentCommentInput.schema';
import { CommentUncheckedCreateWithoutParentCommentInputObjectSchema } from './CommentUncheckedCreateWithoutParentCommentInput.schema';
import { CommentCreateOrConnectWithoutParentCommentInputObjectSchema } from './CommentCreateOrConnectWithoutParentCommentInput.schema';
import { CommentUpsertWithWhereUniqueWithoutParentCommentInputObjectSchema } from './CommentUpsertWithWhereUniqueWithoutParentCommentInput.schema';
import { CommentCreateManyParentCommentInputEnvelopeObjectSchema } from './CommentCreateManyParentCommentInputEnvelope.schema';
import { CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithWhereUniqueWithoutParentCommentInputObjectSchema } from './CommentUpdateWithWhereUniqueWithoutParentCommentInput.schema';
import { CommentUpdateManyWithWhereWithoutParentCommentInputObjectSchema } from './CommentUpdateManyWithWhereWithoutParentCommentInput.schema';
import { CommentScalarWhereInputObjectSchema } from './CommentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutParentCommentInputObjectSchema), z.lazy(() => CommentCreateWithoutParentCommentInputObjectSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutParentCommentInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutParentCommentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CommentCreateOrConnectWithoutParentCommentInputObjectSchema), z.lazy(() => CommentCreateOrConnectWithoutParentCommentInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CommentUpsertWithWhereUniqueWithoutParentCommentInputObjectSchema), z.lazy(() => CommentUpsertWithWhereUniqueWithoutParentCommentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CommentCreateManyParentCommentInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CommentUpdateWithWhereUniqueWithoutParentCommentInputObjectSchema), z.lazy(() => CommentUpdateWithWhereUniqueWithoutParentCommentInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CommentUpdateManyWithWhereWithoutParentCommentInputObjectSchema), z.lazy(() => CommentUpdateManyWithWhereWithoutParentCommentInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CommentScalarWhereInputObjectSchema), z.lazy(() => CommentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CommentUpdateManyWithoutParentCommentNestedInputObjectSchema: z.ZodType<Prisma.CommentUpdateManyWithoutParentCommentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateManyWithoutParentCommentNestedInput>;
export const CommentUpdateManyWithoutParentCommentNestedInputObjectZodSchema = makeSchema();
