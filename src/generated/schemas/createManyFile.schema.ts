import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FileCreateManyInputObjectSchema as FileCreateManyInputObjectSchema } from './objects/FileCreateManyInput.schema';

export const FileCreateManySchema: z.ZodType<Prisma.FileCreateManyArgs> = z.object({ data: z.union([ FileCreateManyInputObjectSchema, z.array(FileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.FileCreateManyArgs>;

export const FileCreateManyZodSchema = z.object({ data: z.union([ FileCreateManyInputObjectSchema, z.array(FileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();