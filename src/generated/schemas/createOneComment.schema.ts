import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CommentSelectObjectSchema as CommentSelectObjectSchema } from './objects/CommentSelect.schema';
import { CommentIncludeObjectSchema as CommentIncludeObjectSchema } from './objects/CommentInclude.schema';
import { CommentCreateInputObjectSchema as CommentCreateInputObjectSchema } from './objects/CommentCreateInput.schema';
import { CommentUncheckedCreateInputObjectSchema as CommentUncheckedCreateInputObjectSchema } from './objects/CommentUncheckedCreateInput.schema';

export const CommentCreateOneSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({ select: CommentSelectObjectSchema.optional(), include: CommentIncludeObjectSchema.optional(), data: z.union([CommentCreateInputObjectSchema, CommentUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CommentCreateArgs>;

export const CommentCreateOneZodSchema = z.object({ select: CommentSelectObjectSchema.optional(), include: CommentIncludeObjectSchema.optional(), data: z.union([CommentCreateInputObjectSchema, CommentUncheckedCreateInputObjectSchema]) }).strict();