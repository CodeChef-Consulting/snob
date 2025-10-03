import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereUniqueInputObjectSchema as FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileUpdateWithoutCommentInputObjectSchema as FileUpdateWithoutCommentInputObjectSchema } from './FileUpdateWithoutCommentInput.schema';
import { FileUncheckedUpdateWithoutCommentInputObjectSchema as FileUncheckedUpdateWithoutCommentInputObjectSchema } from './FileUncheckedUpdateWithoutCommentInput.schema';
import { FileCreateWithoutCommentInputObjectSchema as FileCreateWithoutCommentInputObjectSchema } from './FileCreateWithoutCommentInput.schema';
import { FileUncheckedCreateWithoutCommentInputObjectSchema as FileUncheckedCreateWithoutCommentInputObjectSchema } from './FileUncheckedCreateWithoutCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => FileUpdateWithoutCommentInputObjectSchema), z.lazy(() => FileUncheckedUpdateWithoutCommentInputObjectSchema)]),
  create: z.union([z.lazy(() => FileCreateWithoutCommentInputObjectSchema), z.lazy(() => FileUncheckedCreateWithoutCommentInputObjectSchema)])
}).strict();
export const FileUpsertWithWhereUniqueWithoutCommentInputObjectSchema: z.ZodType<Prisma.FileUpsertWithWhereUniqueWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUpsertWithWhereUniqueWithoutCommentInput>;
export const FileUpsertWithWhereUniqueWithoutCommentInputObjectZodSchema = makeSchema();
