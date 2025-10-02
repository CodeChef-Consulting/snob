import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';
import { FileOrderByWithAggregationInputObjectSchema } from './objects/FileOrderByWithAggregationInput.schema';
import { FileScalarWhereWithAggregatesInputObjectSchema } from './objects/FileScalarWhereWithAggregatesInput.schema';
import { FileScalarFieldEnumSchema } from './enums/FileScalarFieldEnum.schema';
import { FileCountAggregateInputObjectSchema } from './objects/FileCountAggregateInput.schema';
import { FileMinAggregateInputObjectSchema } from './objects/FileMinAggregateInput.schema';
import { FileMaxAggregateInputObjectSchema } from './objects/FileMaxAggregateInput.schema';
import { FileAvgAggregateInputObjectSchema } from './objects/FileAvgAggregateInput.schema';
import { FileSumAggregateInputObjectSchema } from './objects/FileSumAggregateInput.schema';

export const FileGroupBySchema: z.ZodType<Prisma.FileGroupByArgs> = z.object({ where: FileWhereInputObjectSchema.optional(), orderBy: z.union([FileOrderByWithAggregationInputObjectSchema, FileOrderByWithAggregationInputObjectSchema.array()]).optional(), having: FileScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(FileScalarFieldEnumSchema), _count: z.union([ z.literal(true), FileCountAggregateInputObjectSchema ]).optional(), _min: FileMinAggregateInputObjectSchema.optional(), _max: FileMaxAggregateInputObjectSchema.optional(), _avg: FileAvgAggregateInputObjectSchema.optional(), _sum: FileSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FileGroupByArgs>;

export const FileGroupByZodSchema = z.object({ where: FileWhereInputObjectSchema.optional(), orderBy: z.union([FileOrderByWithAggregationInputObjectSchema, FileOrderByWithAggregationInputObjectSchema.array()]).optional(), having: FileScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(FileScalarFieldEnumSchema), _count: z.union([ z.literal(true), FileCountAggregateInputObjectSchema ]).optional(), _min: FileMinAggregateInputObjectSchema.optional(), _max: FileMaxAggregateInputObjectSchema.optional(), _avg: FileAvgAggregateInputObjectSchema.optional(), _sum: FileSumAggregateInputObjectSchema.optional() }).strict();