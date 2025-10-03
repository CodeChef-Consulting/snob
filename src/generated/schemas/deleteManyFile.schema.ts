import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FileWhereInputObjectSchema as FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';

export const FileDeleteManySchema: z.ZodType<Prisma.FileDeleteManyArgs> = z.object({ where: FileWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FileDeleteManyArgs>;

export const FileDeleteManyZodSchema = z.object({ where: FileWhereInputObjectSchema.optional() }).strict();