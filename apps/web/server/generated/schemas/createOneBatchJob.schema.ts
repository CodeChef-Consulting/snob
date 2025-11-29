import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BatchJobSelectObjectSchema as BatchJobSelectObjectSchema } from './objects/BatchJobSelect.schema';
import { BatchJobCreateInputObjectSchema as BatchJobCreateInputObjectSchema } from './objects/BatchJobCreateInput.schema';
import { BatchJobUncheckedCreateInputObjectSchema as BatchJobUncheckedCreateInputObjectSchema } from './objects/BatchJobUncheckedCreateInput.schema';

export const BatchJobCreateOneSchema: z.ZodType<Prisma.BatchJobCreateArgs> = z.object({ select: BatchJobSelectObjectSchema.optional(),  data: z.union([BatchJobCreateInputObjectSchema, BatchJobUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.BatchJobCreateArgs>;

export const BatchJobCreateOneZodSchema = z.object({ select: BatchJobSelectObjectSchema.optional(),  data: z.union([BatchJobCreateInputObjectSchema, BatchJobUncheckedCreateInputObjectSchema]) }).strict();