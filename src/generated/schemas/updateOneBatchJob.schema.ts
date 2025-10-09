import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BatchJobSelectObjectSchema as BatchJobSelectObjectSchema } from './objects/BatchJobSelect.schema';
import { BatchJobUpdateInputObjectSchema as BatchJobUpdateInputObjectSchema } from './objects/BatchJobUpdateInput.schema';
import { BatchJobUncheckedUpdateInputObjectSchema as BatchJobUncheckedUpdateInputObjectSchema } from './objects/BatchJobUncheckedUpdateInput.schema';
import { BatchJobWhereUniqueInputObjectSchema as BatchJobWhereUniqueInputObjectSchema } from './objects/BatchJobWhereUniqueInput.schema';

export const BatchJobUpdateOneSchema: z.ZodType<Prisma.BatchJobUpdateArgs> = z.object({ select: BatchJobSelectObjectSchema.optional(),  data: z.union([BatchJobUpdateInputObjectSchema, BatchJobUncheckedUpdateInputObjectSchema]), where: BatchJobWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BatchJobUpdateArgs>;

export const BatchJobUpdateOneZodSchema = z.object({ select: BatchJobSelectObjectSchema.optional(),  data: z.union([BatchJobUpdateInputObjectSchema, BatchJobUncheckedUpdateInputObjectSchema]), where: BatchJobWhereUniqueInputObjectSchema }).strict();