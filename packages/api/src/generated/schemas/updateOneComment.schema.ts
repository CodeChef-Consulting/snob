import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CommentSelectObjectSchema as CommentSelectObjectSchema } from './objects/CommentSelect.schema';
import { CommentIncludeObjectSchema as CommentIncludeObjectSchema } from './objects/CommentInclude.schema';
import { CommentUpdateInputObjectSchema as CommentUpdateInputObjectSchema } from './objects/CommentUpdateInput.schema';
import { CommentUncheckedUpdateInputObjectSchema as CommentUncheckedUpdateInputObjectSchema } from './objects/CommentUncheckedUpdateInput.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './objects/CommentWhereUniqueInput.schema';

export const CommentUpdateOneSchema: z.ZodType<Prisma.CommentUpdateArgs> = z.object({ select: CommentSelectObjectSchema.optional(), include: CommentIncludeObjectSchema.optional(), data: z.union([CommentUpdateInputObjectSchema, CommentUncheckedUpdateInputObjectSchema]), where: CommentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CommentUpdateArgs>;

export const CommentUpdateOneZodSchema = z.object({ select: CommentSelectObjectSchema.optional(), include: CommentIncludeObjectSchema.optional(), data: z.union([CommentUpdateInputObjectSchema, CommentUncheckedUpdateInputObjectSchema]), where: CommentWhereUniqueInputObjectSchema }).strict();