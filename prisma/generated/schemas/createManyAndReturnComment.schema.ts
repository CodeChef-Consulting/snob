import { z } from 'zod';
import { CommentSelectObjectSchema } from './objects/CommentSelect.schema';
import { CommentCreateManyInputObjectSchema } from './objects/CommentCreateManyInput.schema';

export const CommentCreateManyAndReturnSchema = z.object({ select: CommentSelectObjectSchema.optional(), data: z.union([ CommentCreateManyInputObjectSchema, z.array(CommentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()