import { z } from 'zod';
import { CommentSelectObjectSchema } from './objects/CommentSelect.schema';
import { CommentUpdateManyMutationInputObjectSchema } from './objects/CommentUpdateManyMutationInput.schema';
import { CommentWhereInputObjectSchema } from './objects/CommentWhereInput.schema';

export const CommentUpdateManyAndReturnSchema = z.object({ select: CommentSelectObjectSchema.optional(), data: CommentUpdateManyMutationInputObjectSchema, where: CommentWhereInputObjectSchema.optional()  }).strict()