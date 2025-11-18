import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BatchJobCreateManyInputObjectSchema as BatchJobCreateManyInputObjectSchema } from './objects/BatchJobCreateManyInput.schema';

export const BatchJobCreateManySchema: z.ZodType<Prisma.BatchJobCreateManyArgs> = z.object({ data: z.union([ BatchJobCreateManyInputObjectSchema, z.array(BatchJobCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.BatchJobCreateManyArgs>;

export const BatchJobCreateManyZodSchema = z.object({ data: z.union([ BatchJobCreateManyInputObjectSchema, z.array(BatchJobCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();