import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FileWhereInputObjectSchema as FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';
import { FileOrderByWithAggregationInputObjectSchema as FileOrderByWithAggregationInputObjectSchema } from './objects/FileOrderByWithAggregationInput.schema';
import { FileScalarWhereWithAggregatesInputObjectSchema as FileScalarWhereWithAggregatesInputObjectSchema } from './objects/FileScalarWhereWithAggregatesInput.schema';
import { FileScalarFieldEnumSchema } from './enums/FileScalarFieldEnum.schema';
import { FileCountAggregateInputObjectSchema as FileCountAggregateInputObjectSchema } from './objects/FileCountAggregateInput.schema';
import { FileMinAggregateInputObjectSchema as FileMinAggregateInputObjectSchema } from './objects/FileMinAggregateInput.schema';
import { FileMaxAggregateInputObjectSchema as FileMaxAggregateInputObjectSchema } from './objects/FileMaxAggregateInput.schema';
import { FileAvgAggregateInputObjectSchema as FileAvgAggregateInputObjectSchema } from './objects/FileAvgAggregateInput.schema';
import { FileSumAggregateInputObjectSchema as FileSumAggregateInputObjectSchema } from './objects/FileSumAggregateInput.schema';

export const FileGroupBySchema: z.ZodType<Prisma.FileGroupByArgs> = z.object({ where: FileWhereInputObjectSchema.optional(), orderBy: z.union([FileOrderByWithAggregationInputObjectSchema, FileOrderByWithAggregationInputObjectSchema.array()]).optional(), having: FileScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(FileScalarFieldEnumSchema), _count: z.union([ z.literal(true), FileCountAggregateInputObjectSchema ]).optional(), _min: FileMinAggregateInputObjectSchema.optional(), _max: FileMaxAggregateInputObjectSchema.optional(), _avg: FileAvgAggregateInputObjectSchema.optional(), _sum: FileSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FileGroupByArgs>;

export const FileGroupByZodSchema = z.object({ where: FileWhereInputObjectSchema.optional(), orderBy: z.union([FileOrderByWithAggregationInputObjectSchema, FileOrderByWithAggregationInputObjectSchema.array()]).optional(), having: FileScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(FileScalarFieldEnumSchema), _count: z.union([ z.literal(true), FileCountAggregateInputObjectSchema ]).optional(), _min: FileMinAggregateInputObjectSchema.optional(), _max: FileMaxAggregateInputObjectSchema.optional(), _avg: FileAvgAggregateInputObjectSchema.optional(), _sum: FileSumAggregateInputObjectSchema.optional() }).strict();