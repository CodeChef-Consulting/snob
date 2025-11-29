import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FileSelectObjectSchema as FileSelectObjectSchema } from './objects/FileSelect.schema';
import { FileUpdateManyMutationInputObjectSchema as FileUpdateManyMutationInputObjectSchema } from './objects/FileUpdateManyMutationInput.schema';
import { FileWhereInputObjectSchema as FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';

export const FileUpdateManyAndReturnSchema: z.ZodType<Prisma.FileUpdateManyAndReturnArgs> = z.object({ select: FileSelectObjectSchema.optional(), data: FileUpdateManyMutationInputObjectSchema, where: FileWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FileUpdateManyAndReturnArgs>;

export const FileUpdateManyAndReturnZodSchema = z.object({ select: FileSelectObjectSchema.optional(), data: FileUpdateManyMutationInputObjectSchema, where: FileWhereInputObjectSchema.optional() }).strict();