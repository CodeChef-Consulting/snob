import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './PostWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => PostWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => PostWhereInputObjectSchema).optional()
}).strict();
export const PostScalarRelationFilterObjectSchema: z.ZodType<Prisma.PostScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PostScalarRelationFilter>;
export const PostScalarRelationFilterObjectZodSchema = makeSchema();
