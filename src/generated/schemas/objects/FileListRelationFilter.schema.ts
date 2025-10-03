import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereInputObjectSchema as FileWhereInputObjectSchema } from './FileWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => FileWhereInputObjectSchema).optional(),
  some: z.lazy(() => FileWhereInputObjectSchema).optional(),
  none: z.lazy(() => FileWhereInputObjectSchema).optional()
}).strict();
export const FileListRelationFilterObjectSchema: z.ZodType<Prisma.FileListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.FileListRelationFilter>;
export const FileListRelationFilterObjectZodSchema = makeSchema();
