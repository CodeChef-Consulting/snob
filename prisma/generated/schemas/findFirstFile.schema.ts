import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FileIncludeObjectSchema } from './objects/FileInclude.schema';
import { FileOrderByWithRelationInputObjectSchema } from './objects/FileOrderByWithRelationInput.schema';
import { FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';
import { FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema';
import { FileScalarFieldEnumSchema } from './enums/FileScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const FileFindFirstSelectSchema: z.ZodType<Prisma.FileSelect> = z.object({
    id: z.boolean().optional(),
    post: z.boolean().optional(),
    postId: z.boolean().optional(),
    comment: z.boolean().optional(),
    commentId: z.boolean().optional(),
    fileUrl: z.boolean().optional(),
    fileType: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.FileSelect>;

export const FileFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    post: z.boolean().optional(),
    postId: z.boolean().optional(),
    comment: z.boolean().optional(),
    commentId: z.boolean().optional(),
    fileUrl: z.boolean().optional(),
    fileType: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const FileFindFirstSchema: z.ZodType<Prisma.FileFindFirstArgs> = z.object({ select: FileFindFirstSelectSchema.optional(), include: z.lazy(() => FileIncludeObjectSchema.optional()), orderBy: z.union([FileOrderByWithRelationInputObjectSchema, FileOrderByWithRelationInputObjectSchema.array()]).optional(), where: FileWhereInputObjectSchema.optional(), cursor: FileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FileScalarFieldEnumSchema, FileScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.FileFindFirstArgs>;

export const FileFindFirstZodSchema = z.object({ select: FileFindFirstSelectSchema.optional(), include: z.lazy(() => FileIncludeObjectSchema.optional()), orderBy: z.union([FileOrderByWithRelationInputObjectSchema, FileOrderByWithRelationInputObjectSchema.array()]).optional(), where: FileWhereInputObjectSchema.optional(), cursor: FileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FileScalarFieldEnumSchema, FileScalarFieldEnumSchema.array()]).optional() }).strict();