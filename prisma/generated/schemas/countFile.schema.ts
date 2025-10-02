import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FileOrderByWithRelationInputObjectSchema } from './objects/FileOrderByWithRelationInput.schema';
import { FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';
import { FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema';
import { FileCountAggregateInputObjectSchema } from './objects/FileCountAggregateInput.schema';

export const FileCountSchema: z.ZodType<Prisma.FileCountArgs> = z.object({ orderBy: z.union([FileOrderByWithRelationInputObjectSchema, FileOrderByWithRelationInputObjectSchema.array()]).optional(), where: FileWhereInputObjectSchema.optional(), cursor: FileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), FileCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.FileCountArgs>;

export const FileCountZodSchema = z.object({ orderBy: z.union([FileOrderByWithRelationInputObjectSchema, FileOrderByWithRelationInputObjectSchema.array()]).optional(), where: FileWhereInputObjectSchema.optional(), cursor: FileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), FileCountAggregateInputObjectSchema ]).optional() }).strict();