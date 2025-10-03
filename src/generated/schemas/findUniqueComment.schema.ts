import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CommentSelectObjectSchema as CommentSelectObjectSchema } from './objects/CommentSelect.schema';
import { CommentIncludeObjectSchema as CommentIncludeObjectSchema } from './objects/CommentInclude.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './objects/CommentWhereUniqueInput.schema';

export const CommentFindUniqueSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({ select: CommentSelectObjectSchema.optional(), include: CommentIncludeObjectSchema.optional(), where: CommentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CommentFindUniqueArgs>;

export const CommentFindUniqueZodSchema = z.object({ select: CommentSelectObjectSchema.optional(), include: CommentIncludeObjectSchema.optional(), where: CommentWhereUniqueInputObjectSchema }).strict();