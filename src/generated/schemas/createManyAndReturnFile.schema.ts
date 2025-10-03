import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FileSelectObjectSchema as FileSelectObjectSchema } from './objects/FileSelect.schema';
import { FileCreateManyInputObjectSchema as FileCreateManyInputObjectSchema } from './objects/FileCreateManyInput.schema';

export const FileCreateManyAndReturnSchema: z.ZodType<Prisma.FileCreateManyAndReturnArgs> = z.object({ select: FileSelectObjectSchema.optional(), data: z.union([ FileCreateManyInputObjectSchema, z.array(FileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.FileCreateManyAndReturnArgs>;

export const FileCreateManyAndReturnZodSchema = z.object({ select: FileSelectObjectSchema.optional(), data: z.union([ FileCreateManyInputObjectSchema, z.array(FileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();