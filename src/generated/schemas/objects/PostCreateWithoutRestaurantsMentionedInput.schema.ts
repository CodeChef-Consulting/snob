import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateNestedManyWithoutPostInputObjectSchema as CommentCreateNestedManyWithoutPostInputObjectSchema } from './CommentCreateNestedManyWithoutPostInput.schema';
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
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputObjectSchema).optional(),
  files: z.lazy(() => FileCreateNestedManyWithoutPostInputObjectSchema).optional()
}).strict();
export const PostCreateWithoutRestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.PostCreateWithoutRestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateWithoutRestaurantsMentionedInput>;
export const PostCreateWithoutRestaurantsMentionedInputObjectZodSchema = makeSchema();
