import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CommentUpdateManyMutationInputObjectSchema as CommentUpdateManyMutationInputObjectSchema } from './objects/CommentUpdateManyMutationInput.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './objects/CommentWhereInput.schema';

export const CommentUpdateManySchema: z.ZodType<Prisma.CommentUpdateManyArgs> = z.object({ data: CommentUpdateManyMutationInputObjectSchema, where: CommentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CommentUpdateManyArgs>;

export const CommentUpdateManyZodSchema = z.object({ data: CommentUpdateManyMutationInputObjectSchema, where: CommentWhereInputObjectSchema.optional() }).strict();