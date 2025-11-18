import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FileUpdateManyMutationInputObjectSchema as FileUpdateManyMutationInputObjectSchema } from './objects/FileUpdateManyMutationInput.schema';
import { FileWhereInputObjectSchema as FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';

export const FileUpdateManySchema: z.ZodType<Prisma.FileUpdateManyArgs> = z.object({ data: FileUpdateManyMutationInputObjectSchema, where: FileWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FileUpdateManyArgs>;

export const FileUpdateManyZodSchema = z.object({ data: FileUpdateManyMutationInputObjectSchema, where: FileWhereInputObjectSchema.optional() }).strict();