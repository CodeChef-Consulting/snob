import * as z from 'zod';
import type { Prisma } from '@prisma/client';


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
  updatedAt: z.coerce.date().optional()
}).strict();
export const PostCreateManyInputObjectSchema: z.ZodType<Prisma.PostCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateManyInput>;
export const PostCreateManyInputObjectZodSchema = makeSchema();
