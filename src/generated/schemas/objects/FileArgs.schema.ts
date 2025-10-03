import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileSelectObjectSchema as FileSelectObjectSchema } from './FileSelect.schema';
import { FileIncludeObjectSchema as FileIncludeObjectSchema } from './FileInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => FileSelectObjectSchema).optional(),
  include: z.lazy(() => FileIncludeObjectSchema).optional()
}).strict();
export const FileArgsObjectSchema = makeSchema();
export const FileArgsObjectZodSchema = makeSchema();
