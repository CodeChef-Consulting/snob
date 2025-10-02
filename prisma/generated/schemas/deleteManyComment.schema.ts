import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './objects/CommentWhereInput.schema';

export const CommentDeleteManySchema: z.ZodType<Prisma.CommentDeleteManyArgs> = z.object({ where: CommentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CommentDeleteManyArgs>;

export const CommentDeleteManyZodSchema = z.object({ where: CommentWhereInputObjectSchema.optional() }).strict();