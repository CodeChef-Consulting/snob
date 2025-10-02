import { z } from 'zod';
import { CommentSelectObjectSchema } from './objects/CommentSelect.schema';
import { CommentIncludeObjectSchema } from './objects/CommentInclude.schema';
import { CommentUpdateInputObjectSchema } from './objects/CommentUpdateInput.schema';
import { CommentUncheckedUpdateInputObjectSchema } from './objects/CommentUncheckedUpdateInput.schema';
import { CommentWhereUniqueInputObjectSchema } from './objects/CommentWhereUniqueInput.schema';

export const CommentUpdateOneSchema = z.object({ select: CommentSelectObjectSchema.optional(), include: CommentIncludeObjectSchema.optional(), data: z.union([CommentUpdateInputObjectSchema, CommentUncheckedUpdateInputObjectSchema]), where: CommentWhereUniqueInputObjectSchema  })