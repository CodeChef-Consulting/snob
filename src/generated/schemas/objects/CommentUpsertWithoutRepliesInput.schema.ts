import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentUpdateWithoutRepliesInputObjectSchema as CommentUpdateWithoutRepliesInputObjectSchema } from './CommentUpdateWithoutRepliesInput.schema';
import { CommentUncheckedUpdateWithoutRepliesInputObjectSchema as CommentUncheckedUpdateWithoutRepliesInputObjectSchema } from './CommentUncheckedUpdateWithoutRepliesInput.schema';
import { CommentCreateWithoutRepliesInputObjectSchema as CommentCreateWithoutRepliesInputObjectSchema } from './CommentCreateWithoutRepliesInput.schema';
import { CommentUncheckedCreateWithoutRepliesInputObjectSchema as CommentUncheckedCreateWithoutRepliesInputObjectSchema } from './CommentUncheckedCreateWithoutRepliesInput.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CommentUpdateWithoutRepliesInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutRepliesInputObjectSchema)]),
  create: z.union([z.lazy(() => CommentCreateWithoutRepliesInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRepliesInputObjectSchema)]),
  where: z.lazy(() => CommentWhereInputObjectSchema).optional()
}).strict();
export const CommentUpsertWithoutRepliesInputObjectSchema: z.ZodType<Prisma.CommentUpsertWithoutRepliesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpsertWithoutRepliesInput>;
export const CommentUpsertWithoutRepliesInputObjectZodSchema = makeSchema();
