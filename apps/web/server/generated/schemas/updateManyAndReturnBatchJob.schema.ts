import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BatchJobSelectObjectSchema as BatchJobSelectObjectSchema } from './objects/BatchJobSelect.schema';
import { BatchJobUpdateManyMutationInputObjectSchema as BatchJobUpdateManyMutationInputObjectSchema } from './objects/BatchJobUpdateManyMutationInput.schema';
import { BatchJobWhereInputObjectSchema as BatchJobWhereInputObjectSchema } from './objects/BatchJobWhereInput.schema';

export const BatchJobUpdateManyAndReturnSchema: z.ZodType<Prisma.BatchJobUpdateManyAndReturnArgs> = z.object({ select: BatchJobSelectObjectSchema.optional(), data: BatchJobUpdateManyMutationInputObjectSchema, where: BatchJobWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BatchJobUpdateManyAndReturnArgs>;

export const BatchJobUpdateManyAndReturnZodSchema = z.object({ select: BatchJobSelectObjectSchema.optional(), data: BatchJobUpdateManyMutationInputObjectSchema, where: BatchJobWhereInputObjectSchema.optional() }).strict();