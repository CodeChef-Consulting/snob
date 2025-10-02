import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FileIncludeObjectSchema } from './objects/FileInclude.schema';
import { FileOrderByWithRelationInputObjectSchema } from './objects/FileOrderByWithRelationInput.schema';
import { FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';
import { FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema';
import { FileScalarFieldEnumSchema } from './enums/FileScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const FileFindFirstOrThrowSelectSchema: z.ZodType<Prisma.FileSelect> = z.object({
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

export const FileFindFirstOrThrowSelectZodSchema = z.object({
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

export const FileFindFirstOrThrowSchema: z.ZodType<Prisma.FileFindFirstOrThrowArgs> = z.object({ select: FileFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => FileIncludeObjectSchema.optional()), orderBy: z.union([FileOrderByWithRelationInputObjectSchema, FileOrderByWithRelationInputObjectSchema.array()]).optional(), where: FileWhereInputObjectSchema.optional(), cursor: FileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FileScalarFieldEnumSchema, FileScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.FileFindFirstOrThrowArgs>;

export const FileFindFirstOrThrowZodSchema = z.object({ select: FileFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => FileIncludeObjectSchema.optional()), orderBy: z.union([FileOrderByWithRelationInputObjectSchema, FileOrderByWithRelationInputObjectSchema.array()]).optional(), where: FileWhereInputObjectSchema.optional(), cursor: FileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FileScalarFieldEnumSchema, FileScalarFieldEnumSchema.array()]).optional() }).strict();