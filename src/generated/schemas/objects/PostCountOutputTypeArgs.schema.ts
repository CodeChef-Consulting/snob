import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCountOutputTypeSelectObjectSchema as PostCountOutputTypeSelectObjectSchema } from './PostCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PostCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const PostCountOutputTypeArgsObjectSchema = makeSchema();
export const PostCountOutputTypeArgsObjectZodSchema = makeSchema();
