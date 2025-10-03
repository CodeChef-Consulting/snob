import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array()
}).strict();
export const PostCreaterestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.PostCreaterestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreaterestaurantsMentionedInput>;
export const PostCreaterestaurantsMentionedInputObjectZodSchema = makeSchema();
