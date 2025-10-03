import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CommentCreateManyInputObjectSchema as CommentCreateManyInputObjectSchema } from './objects/CommentCreateManyInput.schema';

export const CommentCreateManySchema: z.ZodType<Prisma.CommentCreateManyArgs> = z.object({ data: z.union([ CommentCreateManyInputObjectSchema, z.array(CommentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CommentCreateManyArgs>;

export const CommentCreateManyZodSchema = z.object({ data: z.union([ CommentCreateManyInputObjectSchema, z.array(CommentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();