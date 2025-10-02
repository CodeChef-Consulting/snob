import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentUpdateWithoutRepliesInputObjectSchema } from './CommentUpdateWithoutRepliesInput.schema';
import { CommentUncheckedUpdateWithoutRepliesInputObjectSchema } from './CommentUncheckedUpdateWithoutRepliesInput.schema';
import { CommentCreateWithoutRepliesInputObjectSchema } from './CommentCreateWithoutRepliesInput.schema';
import { CommentUncheckedCreateWithoutRepliesInputObjectSchema } from './CommentUncheckedCreateWithoutRepliesInput.schema';
import { CommentWhereInputObjectSchema } from './CommentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CommentUpdateWithoutRepliesInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutRepliesInputObjectSchema)]),
  create: z.union([z.lazy(() => CommentCreateWithoutRepliesInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRepliesInputObjectSchema)]),
  where: z.lazy(() => CommentWhereInputObjectSchema).optional()
}).strict();
export const CommentUpsertWithoutRepliesInputObjectSchema: z.ZodType<Prisma.CommentUpsertWithoutRepliesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpsertWithoutRepliesInput>;
export const CommentUpsertWithoutRepliesInputObjectZodSchema = makeSchema();
