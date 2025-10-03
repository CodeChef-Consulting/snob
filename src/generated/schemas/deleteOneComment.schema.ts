import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CommentSelectObjectSchema as CommentSelectObjectSchema } from './objects/CommentSelect.schema';
import { CommentIncludeObjectSchema as CommentIncludeObjectSchema } from './objects/CommentInclude.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './objects/CommentWhereUniqueInput.schema';

export const CommentDeleteOneSchema: z.ZodType<Prisma.CommentDeleteArgs> = z.object({ select: CommentSelectObjectSchema.optional(), include: CommentIncludeObjectSchema.optional(), where: CommentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CommentDeleteArgs>;

export const CommentDeleteOneZodSchema = z.object({ select: CommentSelectObjectSchema.optional(), include: CommentIncludeObjectSchema.optional(), where: CommentWhereUniqueInputObjectSchema }).strict();