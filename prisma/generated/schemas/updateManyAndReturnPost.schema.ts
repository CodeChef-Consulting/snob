import { z } from 'zod';
import { PostSelectObjectSchema } from './objects/PostSelect.schema';
import { PostUpdateManyMutationInputObjectSchema } from './objects/PostUpdateManyMutationInput.schema';
import { PostWhereInputObjectSchema } from './objects/PostWhereInput.schema';

export const PostUpdateManyAndReturnSchema = z.object({ select: PostSelectObjectSchema.optional(), data: PostUpdateManyMutationInputObjectSchema, where: PostWhereInputObjectSchema.optional()  }).strict()