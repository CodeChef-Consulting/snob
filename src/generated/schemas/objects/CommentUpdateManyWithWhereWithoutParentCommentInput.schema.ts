import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentScalarWhereInputObjectSchema as CommentScalarWhereInputObjectSchema } from './CommentScalarWhereInput.schema';
import { CommentUpdateManyMutationInputObjectSchema as CommentUpdateManyMutationInputObjectSchema } from './CommentUpdateManyMutationInput.schema';
import { CommentUncheckedUpdateManyWithoutParentCommentInputObjectSchema as CommentUncheckedUpdateManyWithoutParentCommentInputObjectSchema } from './CommentUncheckedUpdateManyWithoutParentCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CommentUpdateManyMutationInputObjectSchema), z.lazy(() => CommentUncheckedUpdateManyWithoutParentCommentInputObjectSchema)])
}).strict();
export const CommentUpdateManyWithWhereWithoutParentCommentInputObjectSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutParentCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutParentCommentInput>;
export const CommentUpdateManyWithWhereWithoutParentCommentInputObjectZodSchema = makeSchema();
