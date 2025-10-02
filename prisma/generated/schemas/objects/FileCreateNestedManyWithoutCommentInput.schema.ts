import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileCreateWithoutCommentInputObjectSchema } from './FileCreateWithoutCommentInput.schema';
import { FileUncheckedCreateWithoutCommentInputObjectSchema } from './FileUncheckedCreateWithoutCommentInput.schema';
import { FileCreateOrConnectWithoutCommentInputObjectSchema } from './FileCreateOrConnectWithoutCommentInput.schema';
import { FileCreateManyCommentInputEnvelopeObjectSchema } from './FileCreateManyCommentInputEnvelope.schema';
import { FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileCreateWithoutCommentInputObjectSchema), z.lazy(() => FileCreateWithoutCommentInputObjectSchema).array(), z.lazy(() => FileUncheckedCreateWithoutCommentInputObjectSchema), z.lazy(() => FileUncheckedCreateWithoutCommentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FileCreateOrConnectWithoutCommentInputObjectSchema), z.lazy(() => FileCreateOrConnectWithoutCommentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FileCreateManyCommentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => FileWhereUniqueInputObjectSchema), z.lazy(() => FileWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const FileCreateNestedManyWithoutCommentInputObjectSchema: z.ZodType<Prisma.FileCreateNestedManyWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.FileCreateNestedManyWithoutCommentInput>;
export const FileCreateNestedManyWithoutCommentInputObjectZodSchema = makeSchema();
