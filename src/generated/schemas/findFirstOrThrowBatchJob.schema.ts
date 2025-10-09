import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BatchJobOrderByWithRelationInputObjectSchema as BatchJobOrderByWithRelationInputObjectSchema } from './objects/BatchJobOrderByWithRelationInput.schema';
import { BatchJobWhereInputObjectSchema as BatchJobWhereInputObjectSchema } from './objects/BatchJobWhereInput.schema';
import { BatchJobWhereUniqueInputObjectSchema as BatchJobWhereUniqueInputObjectSchema } from './objects/BatchJobWhereUniqueInput.schema';
import { BatchJobScalarFieldEnumSchema } from './enums/BatchJobScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BatchJobFindFirstOrThrowSelectSchema: z.ZodType<Prisma.BatchJobSelect> = z.object({
    id: z.boolean().optional(),
    geminiJobName: z.boolean().optional(),
    displayName: z.boolean().optional(),
    model: z.boolean().optional(),
    contentType: z.boolean().optional(),
    itemCount: z.boolean().optional(),
    itemIds: z.boolean().optional(),
    status: z.boolean().optional(),
    submittedAt: z.boolean().optional(),
    completedAt: z.boolean().optional(),
    extractionsSaved: z.boolean().optional(),
    extractionsSavedAt: z.boolean().optional(),
    successCount: z.boolean().optional(),
    errorCount: z.boolean().optional(),
    error: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.BatchJobSelect>;

export const BatchJobFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    geminiJobName: z.boolean().optional(),
    displayName: z.boolean().optional(),
    model: z.boolean().optional(),
    contentType: z.boolean().optional(),
    itemCount: z.boolean().optional(),
    itemIds: z.boolean().optional(),
    status: z.boolean().optional(),
    submittedAt: z.boolean().optional(),
    completedAt: z.boolean().optional(),
    extractionsSaved: z.boolean().optional(),
    extractionsSavedAt: z.boolean().optional(),
    successCount: z.boolean().optional(),
    errorCount: z.boolean().optional(),
    error: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const BatchJobFindFirstOrThrowSchema: z.ZodType<Prisma.BatchJobFindFirstOrThrowArgs> = z.object({ select: BatchJobFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([BatchJobOrderByWithRelationInputObjectSchema, BatchJobOrderByWithRelationInputObjectSchema.array()]).optional(), where: BatchJobWhereInputObjectSchema.optional(), cursor: BatchJobWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BatchJobScalarFieldEnumSchema, BatchJobScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.BatchJobFindFirstOrThrowArgs>;

export const BatchJobFindFirstOrThrowZodSchema = z.object({ select: BatchJobFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([BatchJobOrderByWithRelationInputObjectSchema, BatchJobOrderByWithRelationInputObjectSchema.array()]).optional(), where: BatchJobWhereInputObjectSchema.optional(), cursor: BatchJobWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BatchJobScalarFieldEnumSchema, BatchJobScalarFieldEnumSchema.array()]).optional() }).strict();