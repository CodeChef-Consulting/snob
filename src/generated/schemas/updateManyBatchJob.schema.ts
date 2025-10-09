import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BatchJobUpdateManyMutationInputObjectSchema as BatchJobUpdateManyMutationInputObjectSchema } from './objects/BatchJobUpdateManyMutationInput.schema';
import { BatchJobWhereInputObjectSchema as BatchJobWhereInputObjectSchema } from './objects/BatchJobWhereInput.schema';

export const BatchJobUpdateManySchema: z.ZodType<Prisma.BatchJobUpdateManyArgs> = z.object({ data: BatchJobUpdateManyMutationInputObjectSchema, where: BatchJobWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BatchJobUpdateManyArgs>;

export const BatchJobUpdateManyZodSchema = z.object({ data: BatchJobUpdateManyMutationInputObjectSchema, where: BatchJobWhereInputObjectSchema.optional() }).strict();