import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FileSelectObjectSchema as FileSelectObjectSchema } from './objects/FileSelect.schema';
import { FileIncludeObjectSchema as FileIncludeObjectSchema } from './objects/FileInclude.schema';
import { FileWhereUniqueInputObjectSchema as FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema';

export const FileFindUniqueSchema: z.ZodType<Prisma.FileFindUniqueArgs> = z.object({ select: FileSelectObjectSchema.optional(), include: FileIncludeObjectSchema.optional(), where: FileWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FileFindUniqueArgs>;

export const FileFindUniqueZodSchema = z.object({ select: FileSelectObjectSchema.optional(), include: FileIncludeObjectSchema.optional(), where: FileWhereUniqueInputObjectSchema }).strict();