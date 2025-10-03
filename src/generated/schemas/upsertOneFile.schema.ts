import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FileSelectObjectSchema as FileSelectObjectSchema } from './objects/FileSelect.schema';
import { FileIncludeObjectSchema as FileIncludeObjectSchema } from './objects/FileInclude.schema';
import { FileWhereUniqueInputObjectSchema as FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema';
import { FileCreateInputObjectSchema as FileCreateInputObjectSchema } from './objects/FileCreateInput.schema';
import { FileUncheckedCreateInputObjectSchema as FileUncheckedCreateInputObjectSchema } from './objects/FileUncheckedCreateInput.schema';
import { FileUpdateInputObjectSchema as FileUpdateInputObjectSchema } from './objects/FileUpdateInput.schema';
import { FileUncheckedUpdateInputObjectSchema as FileUncheckedUpdateInputObjectSchema } from './objects/FileUncheckedUpdateInput.schema';

export const FileUpsertOneSchema: z.ZodType<Prisma.FileUpsertArgs> = z.object({ select: FileSelectObjectSchema.optional(), include: FileIncludeObjectSchema.optional(), where: FileWhereUniqueInputObjectSchema, create: z.union([ FileCreateInputObjectSchema, FileUncheckedCreateInputObjectSchema ]), update: z.union([ FileUpdateInputObjectSchema, FileUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.FileUpsertArgs>;

export const FileUpsertOneZodSchema = z.object({ select: FileSelectObjectSchema.optional(), include: FileIncludeObjectSchema.optional(), where: FileWhereUniqueInputObjectSchema, create: z.union([ FileCreateInputObjectSchema, FileUncheckedCreateInputObjectSchema ]), update: z.union([ FileUpdateInputObjectSchema, FileUncheckedUpdateInputObjectSchema ]) }).strict();