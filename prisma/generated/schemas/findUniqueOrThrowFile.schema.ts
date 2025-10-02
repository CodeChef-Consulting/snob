import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FileSelectObjectSchema } from './objects/FileSelect.schema';
import { FileIncludeObjectSchema } from './objects/FileInclude.schema';
import { FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema';

export const FileFindUniqueOrThrowSchema: z.ZodType<Prisma.FileFindUniqueOrThrowArgs> = z.object({ select: FileSelectObjectSchema.optional(), include: FileIncludeObjectSchema.optional(), where: FileWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FileFindUniqueOrThrowArgs>;

export const FileFindUniqueOrThrowZodSchema = z.object({ select: FileSelectObjectSchema.optional(), include: FileIncludeObjectSchema.optional(), where: FileWhereUniqueInputObjectSchema }).strict();