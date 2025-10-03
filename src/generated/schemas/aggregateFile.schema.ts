import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FileOrderByWithRelationInputObjectSchema as FileOrderByWithRelationInputObjectSchema } from './objects/FileOrderByWithRelationInput.schema';
import { FileWhereInputObjectSchema as FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';
import { FileWhereUniqueInputObjectSchema as FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema';
import { FileCountAggregateInputObjectSchema as FileCountAggregateInputObjectSchema } from './objects/FileCountAggregateInput.schema';
import { FileMinAggregateInputObjectSchema as FileMinAggregateInputObjectSchema } from './objects/FileMinAggregateInput.schema';
import { FileMaxAggregateInputObjectSchema as FileMaxAggregateInputObjectSchema } from './objects/FileMaxAggregateInput.schema';
import { FileAvgAggregateInputObjectSchema as FileAvgAggregateInputObjectSchema } from './objects/FileAvgAggregateInput.schema';
import { FileSumAggregateInputObjectSchema as FileSumAggregateInputObjectSchema } from './objects/FileSumAggregateInput.schema';

export const FileAggregateSchema: z.ZodType<Prisma.FileAggregateArgs> = z.object({ orderBy: z.union([FileOrderByWithRelationInputObjectSchema, FileOrderByWithRelationInputObjectSchema.array()]).optional(), where: FileWhereInputObjectSchema.optional(), cursor: FileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), FileCountAggregateInputObjectSchema ]).optional(), _min: FileMinAggregateInputObjectSchema.optional(), _max: FileMaxAggregateInputObjectSchema.optional(), _avg: FileAvgAggregateInputObjectSchema.optional(), _sum: FileSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FileAggregateArgs>;

export const FileAggregateZodSchema = z.object({ orderBy: z.union([FileOrderByWithRelationInputObjectSchema, FileOrderByWithRelationInputObjectSchema.array()]).optional(), where: FileWhereInputObjectSchema.optional(), cursor: FileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), FileCountAggregateInputObjectSchema ]).optional(), _min: FileMinAggregateInputObjectSchema.optional(), _max: FileMaxAggregateInputObjectSchema.optional(), _avg: FileAvgAggregateInputObjectSchema.optional(), _sum: FileSumAggregateInputObjectSchema.optional() }).strict();