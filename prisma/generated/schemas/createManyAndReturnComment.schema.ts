import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CommentSelectObjectSchema as CommentSelectObjectSchema } from './objects/CommentSelect.schema';
import { CommentCreateManyInputObjectSchema as CommentCreateManyInputObjectSchema } from './objects/CommentCreateManyInput.schema';

export const CommentCreateManyAndReturnSchema: z.ZodType<Prisma.CommentCreateManyAndReturnArgs> = z.object({ select: CommentSelectObjectSchema.optional(), data: z.union([ CommentCreateManyInputObjectSchema, z.array(CommentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CommentCreateManyAndReturnArgs>;

export const CommentCreateManyAndReturnZodSchema = z.object({ select: CommentSelectObjectSchema.optional(), data: z.union([ CommentCreateManyInputObjectSchema, z.array(CommentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();