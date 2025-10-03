import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  replies: z.boolean().optional(),
  files: z.boolean().optional()
}).strict();
export const CommentCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CommentCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CommentCountOutputTypeSelect>;
export const CommentCountOutputTypeSelectObjectZodSchema = makeSchema();
