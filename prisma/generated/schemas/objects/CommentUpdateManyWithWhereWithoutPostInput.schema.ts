import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentScalarWhereInputObjectSchema } from './CommentScalarWhereInput.schema';
import { CommentUpdateManyMutationInputObjectSchema } from './CommentUpdateManyMutationInput.schema';
import { CommentUncheckedUpdateManyWithoutPostInputObjectSchema } from './CommentUncheckedUpdateManyWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CommentUpdateManyMutationInputObjectSchema), z.lazy(() => CommentUncheckedUpdateManyWithoutPostInputObjectSchema)])
}).strict();
export const CommentUpdateManyWithWhereWithoutPostInputObjectSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutPostInput>;
export const CommentUpdateManyWithWhereWithoutPostInputObjectZodSchema = makeSchema();
