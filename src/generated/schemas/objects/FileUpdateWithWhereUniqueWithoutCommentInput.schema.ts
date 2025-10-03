import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereUniqueInputObjectSchema as FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileUpdateWithoutCommentInputObjectSchema as FileUpdateWithoutCommentInputObjectSchema } from './FileUpdateWithoutCommentInput.schema';
import { FileUncheckedUpdateWithoutCommentInputObjectSchema as FileUncheckedUpdateWithoutCommentInputObjectSchema } from './FileUncheckedUpdateWithoutCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => FileUpdateWithoutCommentInputObjectSchema), z.lazy(() => FileUncheckedUpdateWithoutCommentInputObjectSchema)])
}).strict();
export const FileUpdateWithWhereUniqueWithoutCommentInputObjectSchema: z.ZodType<Prisma.FileUpdateWithWhereUniqueWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUpdateWithWhereUniqueWithoutCommentInput>;
export const FileUpdateWithWhereUniqueWithoutCommentInputObjectZodSchema = makeSchema();
