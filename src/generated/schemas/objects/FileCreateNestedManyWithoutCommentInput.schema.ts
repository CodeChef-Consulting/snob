import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileCreateWithoutCommentInputObjectSchema as FileCreateWithoutCommentInputObjectSchema } from './FileCreateWithoutCommentInput.schema';
import { FileUncheckedCreateWithoutCommentInputObjectSchema as FileUncheckedCreateWithoutCommentInputObjectSchema } from './FileUncheckedCreateWithoutCommentInput.schema';
import { FileCreateOrConnectWithoutCommentInputObjectSchema as FileCreateOrConnectWithoutCommentInputObjectSchema } from './FileCreateOrConnectWithoutCommentInput.schema';
import { CommentFileCreateManyCommentInputEnvelopeObjectSchema as FileCreateManyCommentInputEnvelopeObjectSchema } from './FileCreateManyCommentInputEnvelope.schema';
import { FileWhereUniqueInputObjectSchema as FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileCreateWithoutCommentInputObjectSchema), z.lazy(() => FileCreateWithoutCommentInputObjectSchema).array(), z.lazy(() => FileUncheckedCreateWithoutCommentInputObjectSchema), z.lazy(() => FileUncheckedCreateWithoutCommentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FileCreateOrConnectWithoutCommentInputObjectSchema), z.lazy(() => FileCreateOrConnectWithoutCommentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FileCreateManyCommentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => FileWhereUniqueInputObjectSchema), z.lazy(() => FileWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const FileCreateNestedManyWithoutCommentInputObjectSchema: z.ZodType<Prisma.FileCreateNestedManyWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.FileCreateNestedManyWithoutCommentInput>;
export const FileCreateNestedManyWithoutCommentInputObjectZodSchema = makeSchema();
