import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereInputObjectSchema } from './PostWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => PostWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => PostWhereInputObjectSchema).optional().nullable()
}).strict();
export const PostNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.PostNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PostNullableScalarRelationFilter>;
export const PostNullableScalarRelationFilterObjectZodSchema = makeSchema();
