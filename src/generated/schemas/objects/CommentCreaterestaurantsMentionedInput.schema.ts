import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array()
}).strict();
export const CommentCreaterestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.CommentCreaterestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreaterestaurantsMentionedInput>;
export const CommentCreaterestaurantsMentionedInputObjectZodSchema = makeSchema();
