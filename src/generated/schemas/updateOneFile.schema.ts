import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FileSelectObjectSchema as FileSelectObjectSchema } from './objects/FileSelect.schema';
import { FileIncludeObjectSchema as FileIncludeObjectSchema } from './objects/FileInclude.schema';
import { FileUpdateInputObjectSchema as FileUpdateInputObjectSchema } from './objects/FileUpdateInput.schema';
import { FileUncheckedUpdateInputObjectSchema as FileUncheckedUpdateInputObjectSchema } from './objects/FileUncheckedUpdateInput.schema';
import { FileWhereUniqueInputObjectSchema as FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema';

export const FileUpdateOneSchema: z.ZodType<Prisma.FileUpdateArgs> = z.object({ select: FileSelectObjectSchema.optional(), include: FileIncludeObjectSchema.optional(), data: z.union([FileUpdateInputObjectSchema, FileUncheckedUpdateInputObjectSchema]), where: FileWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FileUpdateArgs>;

export const FileUpdateOneZodSchema = z.object({ select: FileSelectObjectSchema.optional(), include: FileIncludeObjectSchema.optional(), data: z.union([FileUpdateInputObjectSchema, FileUncheckedUpdateInputObjectSchema]), where: FileWhereUniqueInputObjectSchema }).strict();