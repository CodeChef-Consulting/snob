import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BatchJobSelectObjectSchema as BatchJobSelectObjectSchema } from './objects/BatchJobSelect.schema';
import { BatchJobWhereUniqueInputObjectSchema as BatchJobWhereUniqueInputObjectSchema } from './objects/BatchJobWhereUniqueInput.schema';

export const BatchJobFindUniqueOrThrowSchema: z.ZodType<Prisma.BatchJobFindUniqueOrThrowArgs> = z.object({ select: BatchJobSelectObjectSchema.optional(),  where: BatchJobWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BatchJobFindUniqueOrThrowArgs>;

export const BatchJobFindUniqueOrThrowZodSchema = z.object({ select: BatchJobSelectObjectSchema.optional(),  where: BatchJobWhereUniqueInputObjectSchema }).strict();