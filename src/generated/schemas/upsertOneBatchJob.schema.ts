import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BatchJobSelectObjectSchema as BatchJobSelectObjectSchema } from './objects/BatchJobSelect.schema';
import { BatchJobWhereUniqueInputObjectSchema as BatchJobWhereUniqueInputObjectSchema } from './objects/BatchJobWhereUniqueInput.schema';
import { BatchJobCreateInputObjectSchema as BatchJobCreateInputObjectSchema } from './objects/BatchJobCreateInput.schema';
import { BatchJobUncheckedCreateInputObjectSchema as BatchJobUncheckedCreateInputObjectSchema } from './objects/BatchJobUncheckedCreateInput.schema';
import { BatchJobUpdateInputObjectSchema as BatchJobUpdateInputObjectSchema } from './objects/BatchJobUpdateInput.schema';
import { BatchJobUncheckedUpdateInputObjectSchema as BatchJobUncheckedUpdateInputObjectSchema } from './objects/BatchJobUncheckedUpdateInput.schema';

export const BatchJobUpsertOneSchema: z.ZodType<Prisma.BatchJobUpsertArgs> = z.object({ select: BatchJobSelectObjectSchema.optional(),  where: BatchJobWhereUniqueInputObjectSchema, create: z.union([ BatchJobCreateInputObjectSchema, BatchJobUncheckedCreateInputObjectSchema ]), update: z.union([ BatchJobUpdateInputObjectSchema, BatchJobUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.BatchJobUpsertArgs>;

export const BatchJobUpsertOneZodSchema = z.object({ select: BatchJobSelectObjectSchema.optional(),  where: BatchJobWhereUniqueInputObjectSchema, create: z.union([ BatchJobCreateInputObjectSchema, BatchJobUncheckedCreateInputObjectSchema ]), update: z.union([ BatchJobUpdateInputObjectSchema, BatchJobUncheckedUpdateInputObjectSchema ]) }).strict();