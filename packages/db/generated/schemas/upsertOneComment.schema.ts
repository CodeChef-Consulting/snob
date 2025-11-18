import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CommentSelectObjectSchema as CommentSelectObjectSchema } from './objects/CommentSelect.schema';
import { CommentIncludeObjectSchema as CommentIncludeObjectSchema } from './objects/CommentInclude.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './objects/CommentWhereUniqueInput.schema';
import { CommentCreateInputObjectSchema as CommentCreateInputObjectSchema } from './objects/CommentCreateInput.schema';
import { CommentUncheckedCreateInputObjectSchema as CommentUncheckedCreateInputObjectSchema } from './objects/CommentUncheckedCreateInput.schema';
import { CommentUpdateInputObjectSchema as CommentUpdateInputObjectSchema } from './objects/CommentUpdateInput.schema';
import { CommentUncheckedUpdateInputObjectSchema as CommentUncheckedUpdateInputObjectSchema } from './objects/CommentUncheckedUpdateInput.schema';

export const CommentUpsertOneSchema: z.ZodType<Prisma.CommentUpsertArgs> = z.object({ select: CommentSelectObjectSchema.optional(), include: CommentIncludeObjectSchema.optional(), where: CommentWhereUniqueInputObjectSchema, create: z.union([ CommentCreateInputObjectSchema, CommentUncheckedCreateInputObjectSchema ]), update: z.union([ CommentUpdateInputObjectSchema, CommentUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CommentUpsertArgs>;

export const CommentUpsertOneZodSchema = z.object({ select: CommentSelectObjectSchema.optional(), include: CommentIncludeObjectSchema.optional(), where: CommentWhereUniqueInputObjectSchema, create: z.union([ CommentCreateInputObjectSchema, CommentUncheckedCreateInputObjectSchema ]), update: z.union([ CommentUpdateInputObjectSchema, CommentUncheckedUpdateInputObjectSchema ]) }).strict();