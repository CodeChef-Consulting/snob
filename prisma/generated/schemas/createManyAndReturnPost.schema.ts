import { z } from 'zod';
import { PostSelectObjectSchema } from './objects/PostSelect.schema';
import { PostCreateManyInputObjectSchema } from './objects/PostCreateManyInput.schema';

export const PostCreateManyAndReturnSchema = z.object({ select: PostSelectObjectSchema.optional(), data: z.union([ PostCreateManyInputObjectSchema, z.array(PostCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()