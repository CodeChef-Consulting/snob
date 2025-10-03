import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileCreateWithoutCommentInputObjectSchema as FileCreateWithoutCommentInputObjectSchema } from './FileCreateWithoutCommentInput.schema';
import { FileUncheckedCreateWithoutCommentInputObjectSchema as FileUncheckedCreateWithoutCommentInputObjectSchema } from './FileUncheckedCreateWithoutCommentInput.schema';
import { FileCreateOrConnectWithoutCommentInputObjectSchema as FileCreateOrConnectWithoutCommentInputObjectSchema } from './FileCreateOrConnectWithoutCommentInput.schema';
import { FileUpsertWithWhereUniqueWithoutCommentInputObjectSchema as FileUpsertWithWhereUniqueWithoutCommentInputObjectSchema } from './FileUpsertWithWhereUniqueWithoutCommentInput.schema';
import { CommentFileCreateManyCommentInputEnvelopeObjectSchema as FileCreateManyCommentInputEnvelopeObjectSchema } from './FileCreateManyCommentInputEnvelope.schema';
import { FileWhereUniqueInputObjectSchema as FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileUpdateWithWhereUniqueWithoutCommentInputObjectSchema as FileUpdateWithWhereUniqueWithoutCommentInputObjectSchema } from './FileUpdateWithWhereUniqueWithoutCommentInput.schema';
import { FileUpdateManyWithWhereWithoutCommentInputObjectSchema as FileUpdateManyWithWhereWithoutCommentInputObjectSchema } from './FileUpdateManyWithWhereWithoutCommentInput.schema';
import { FileScalarWhereInputObjectSchema as FileScalarWhereInputObjectSchema } from './FileScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileCreateWithoutCommentInputObjectSchema), z.lazy(() => FileCreateWithoutCommentInputObjectSchema).array(), z.lazy(() => FileUncheckedCreateWithoutCommentInputObjectSchema), z.lazy(() => FileUncheckedCreateWithoutCommentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FileCreateOrConnectWithoutCommentInputObjectSchema), z.lazy(() => FileCreateOrConnectWithoutCommentInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => FileUpsertWithWhereUniqueWithoutCommentInputObjectSchema), z.lazy(() => FileUpsertWithWhereUniqueWithoutCommentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FileCreateManyCommentInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => FileWhereUniqueInputObjectSchema), z.lazy(() => FileWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => FileWhereUniqueInputObjectSchema), z.lazy(() => FileWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => FileWhereUniqueInputObjectSchema), z.lazy(() => FileWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => FileWhereUniqueInputObjectSchema), z.lazy(() => FileWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => FileUpdateWithWhereUniqueWithoutCommentInputObjectSchema), z.lazy(() => FileUpdateWithWhereUniqueWithoutCommentInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => FileUpdateManyWithWhereWithoutCommentInputObjectSchema), z.lazy(() => FileUpdateManyWithWhereWithoutCommentInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => FileScalarWhereInputObjectSchema), z.lazy(() => FileScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const FileUncheckedUpdateManyWithoutCommentNestedInputObjectSchema: z.ZodType<Prisma.FileUncheckedUpdateManyWithoutCommentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUncheckedUpdateManyWithoutCommentNestedInput>;
export const FileUncheckedUpdateManyWithoutCommentNestedInputObjectZodSchema = makeSchema();
