import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CommentSelectObjectSchema as CommentSelectObjectSchema } from './objects/CommentSelect.schema';
import { CommentUpdateManyMutationInputObjectSchema as CommentUpdateManyMutationInputObjectSchema } from './objects/CommentUpdateManyMutationInput.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './objects/CommentWhereInput.schema';

export const CommentUpdateManyAndReturnSchema: z.ZodType<Prisma.CommentUpdateManyAndReturnArgs> = z.object({ select: CommentSelectObjectSchema.optional(), data: CommentUpdateManyMutationInputObjectSchema, where: CommentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CommentUpdateManyAndReturnArgs>;

export const CommentUpdateManyAndReturnZodSchema = z.object({ select: CommentSelectObjectSchema.optional(), data: CommentUpdateManyMutationInputObjectSchema, where: CommentWhereInputObjectSchema.optional() }).strict();