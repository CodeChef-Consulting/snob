import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array().optional(),
  push: z.union([z.string(), z.string().array()]).optional()
}).strict();
export const CommentUpdaterestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.CommentUpdaterestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdaterestaurantsMentionedInput>;
export const CommentUpdaterestaurantsMentionedInputObjectZodSchema = makeSchema();
