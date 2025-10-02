import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantCreateNestedOneWithoutPostsInputObjectSchema as RestaurantCreateNestedOneWithoutPostsInputObjectSchema } from './RestaurantCreateNestedOneWithoutPostsInput.schema';
import { FileCreateNestedManyWithoutPostInputObjectSchema as FileCreateNestedManyWithoutPostInputObjectSchema } from './FileCreateNestedManyWithoutPostInput.schema'

const makeSchema = () => z.object({
  externalId: z.string(),
  subreddit: z.string(),
  author: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  upvoteRatio: z.number().optional().nullable(),
  numComments: z.number().int().optional().nullable(),
  url: z.string().optional().nullable(),
  createdUtc: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  restaurant: z.lazy(() => RestaurantCreateNestedOneWithoutPostsInputObjectSchema).optional(),
  files: z.lazy(() => FileCreateNestedManyWithoutPostInputObjectSchema).optional()
}).strict();
export const PostCreateWithoutCommentsInputObjectSchema: z.ZodType<Prisma.PostCreateWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateWithoutCommentsInput>;
export const PostCreateWithoutCommentsInputObjectZodSchema = makeSchema();
