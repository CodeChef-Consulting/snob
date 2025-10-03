import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentScalarWhereInputObjectSchema as CommentScalarWhereInputObjectSchema } from './CommentScalarWhereInput.schema';
import { CommentUpdateManyMutationInputObjectSchema as CommentUpdateManyMutationInputObjectSchema } from './CommentUpdateManyMutationInput.schema';
import { CommentUncheckedUpdateManyWithoutPostInputObjectSchema as CommentUncheckedUpdateManyWithoutPostInputObjectSchema } from './CommentUncheckedUpdateManyWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CommentUpdateManyMutationInputObjectSchema), z.lazy(() => CommentUncheckedUpdateManyWithoutPostInputObjectSchema)])
}).strict();
export const CommentUpdateManyWithWhereWithoutPostInputObjectSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutPostInput>;
export const CommentUpdateManyWithWhereWithoutPostInputObjectZodSchema = makeSchema();
