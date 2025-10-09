import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BatchJobSelectObjectSchema as BatchJobSelectObjectSchema } from './objects/BatchJobSelect.schema';
import { BatchJobWhereUniqueInputObjectSchema as BatchJobWhereUniqueInputObjectSchema } from './objects/BatchJobWhereUniqueInput.schema';

export const BatchJobFindUniqueSchema: z.ZodType<Prisma.BatchJobFindUniqueArgs> = z.object({ select: BatchJobSelectObjectSchema.optional(),  where: BatchJobWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BatchJobFindUniqueArgs>;

export const BatchJobFindUniqueZodSchema = z.object({ select: BatchJobSelectObjectSchema.optional(),  where: BatchJobWhereUniqueInputObjectSchema }).strict();