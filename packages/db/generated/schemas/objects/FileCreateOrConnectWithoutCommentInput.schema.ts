import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereUniqueInputObjectSchema as FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileCreateWithoutCommentInputObjectSchema as FileCreateWithoutCommentInputObjectSchema } from './FileCreateWithoutCommentInput.schema';
import { FileUncheckedCreateWithoutCommentInputObjectSchema as FileUncheckedCreateWithoutCommentInputObjectSchema } from './FileUncheckedCreateWithoutCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => FileCreateWithoutCommentInputObjectSchema), z.lazy(() => FileUncheckedCreateWithoutCommentInputObjectSchema)])
}).strict();
export const FileCreateOrConnectWithoutCommentInputObjectSchema: z.ZodType<Prisma.FileCreateOrConnectWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.FileCreateOrConnectWithoutCommentInput>;
export const FileCreateOrConnectWithoutCommentInputObjectZodSchema = makeSchema();
