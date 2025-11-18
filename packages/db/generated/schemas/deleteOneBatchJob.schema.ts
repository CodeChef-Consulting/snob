import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BatchJobSelectObjectSchema as BatchJobSelectObjectSchema } from './objects/BatchJobSelect.schema';
import { BatchJobWhereUniqueInputObjectSchema as BatchJobWhereUniqueInputObjectSchema } from './objects/BatchJobWhereUniqueInput.schema';

export const BatchJobDeleteOneSchema: z.ZodType<Prisma.BatchJobDeleteArgs> = z.object({ select: BatchJobSelectObjectSchema.optional(),  where: BatchJobWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BatchJobDeleteArgs>;

export const BatchJobDeleteOneZodSchema = z.object({ select: BatchJobSelectObjectSchema.optional(),  where: BatchJobWhereUniqueInputObjectSchema }).strict();