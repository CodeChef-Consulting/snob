import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BatchJobSelectObjectSchema as BatchJobSelectObjectSchema } from './objects/BatchJobSelect.schema';
import { BatchJobCreateManyInputObjectSchema as BatchJobCreateManyInputObjectSchema } from './objects/BatchJobCreateManyInput.schema';

export const BatchJobCreateManyAndReturnSchema: z.ZodType<Prisma.BatchJobCreateManyAndReturnArgs> = z.object({ select: BatchJobSelectObjectSchema.optional(), data: z.union([ BatchJobCreateManyInputObjectSchema, z.array(BatchJobCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.BatchJobCreateManyAndReturnArgs>;

export const BatchJobCreateManyAndReturnZodSchema = z.object({ select: BatchJobSelectObjectSchema.optional(), data: z.union([ BatchJobCreateManyInputObjectSchema, z.array(BatchJobCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();