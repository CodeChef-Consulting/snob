import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema';
import { CommentUpdateWithoutRepliesInputObjectSchema as CommentUpdateWithoutRepliesInputObjectSchema } from './CommentUpdateWithoutRepliesInput.schema';
import { CommentUncheckedUpdateWithoutRepliesInputObjectSchema as CommentUncheckedUpdateWithoutRepliesInputObjectSchema } from './CommentUncheckedUpdateWithoutRepliesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CommentUpdateWithoutRepliesInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutRepliesInputObjectSchema)])
}).strict();
export const CommentUpdateToOneWithWhereWithoutRepliesInputObjectSchema: z.ZodType<Prisma.CommentUpdateToOneWithWhereWithoutRepliesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateToOneWithWhereWithoutRepliesInput>;
export const CommentUpdateToOneWithWhereWithoutRepliesInputObjectZodSchema = makeSchema();
