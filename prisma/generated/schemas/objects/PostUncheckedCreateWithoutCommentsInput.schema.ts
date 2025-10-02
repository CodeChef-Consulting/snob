import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileUncheckedCreateNestedManyWithoutPostInputObjectSchema } from './FileUncheckedCreateNestedManyWithoutPostInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
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
  restaurantId: z.number().int().optional().nullable(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutPostInputObjectSchema).optional()
}).strict();
export const PostUncheckedCreateWithoutCommentsInputObjectSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUncheckedCreateWithoutCommentsInput>;
export const PostUncheckedCreateWithoutCommentsInputObjectZodSchema = makeSchema();
