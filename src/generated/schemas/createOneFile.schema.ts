import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FileSelectObjectSchema as FileSelectObjectSchema } from './objects/FileSelect.schema';
import { FileIncludeObjectSchema as FileIncludeObjectSchema } from './objects/FileInclude.schema';
import { FileCreateInputObjectSchema as FileCreateInputObjectSchema } from './objects/FileCreateInput.schema';
import { FileUncheckedCreateInputObjectSchema as FileUncheckedCreateInputObjectSchema } from './objects/FileUncheckedCreateInput.schema';

export const FileCreateOneSchema: z.ZodType<Prisma.FileCreateArgs> = z.object({ select: FileSelectObjectSchema.optional(), include: FileIncludeObjectSchema.optional(), data: z.union([FileCreateInputObjectSchema, FileUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.FileCreateArgs>;

export const FileCreateOneZodSchema = z.object({ select: FileSelectObjectSchema.optional(), include: FileIncludeObjectSchema.optional(), data: z.union([FileCreateInputObjectSchema, FileUncheckedCreateInputObjectSchema]) }).strict();