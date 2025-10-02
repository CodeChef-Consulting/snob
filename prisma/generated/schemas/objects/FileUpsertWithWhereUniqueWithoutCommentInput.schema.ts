import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileUpdateWithoutCommentInputObjectSchema } from './FileUpdateWithoutCommentInput.schema';
import { FileUncheckedUpdateWithoutCommentInputObjectSchema } from './FileUncheckedUpdateWithoutCommentInput.schema';
import { FileCreateWithoutCommentInputObjectSchema } from './FileCreateWithoutCommentInput.schema';
import { FileUncheckedCreateWithoutCommentInputObjectSchema } from './FileUncheckedCreateWithoutCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => FileUpdateWithoutCommentInputObjectSchema), z.lazy(() => FileUncheckedUpdateWithoutCommentInputObjectSchema)]),
  create: z.union([z.lazy(() => FileCreateWithoutCommentInputObjectSchema), z.lazy(() => FileUncheckedCreateWithoutCommentInputObjectSchema)])
}).strict();
export const FileUpsertWithWhereUniqueWithoutCommentInputObjectSchema: z.ZodType<Prisma.FileUpsertWithWhereUniqueWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUpsertWithWhereUniqueWithoutCommentInput>;
export const FileUpsertWithWhereUniqueWithoutCommentInputObjectZodSchema = makeSchema();
