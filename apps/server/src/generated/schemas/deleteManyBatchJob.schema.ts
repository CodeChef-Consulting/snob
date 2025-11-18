import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BatchJobWhereInputObjectSchema as BatchJobWhereInputObjectSchema } from './objects/BatchJobWhereInput.schema';

export const BatchJobDeleteManySchema: z.ZodType<Prisma.BatchJobDeleteManyArgs> = z.object({ where: BatchJobWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BatchJobDeleteManyArgs>;

export const BatchJobDeleteManyZodSchema = z.object({ where: BatchJobWhereInputObjectSchema.optional() }).strict();