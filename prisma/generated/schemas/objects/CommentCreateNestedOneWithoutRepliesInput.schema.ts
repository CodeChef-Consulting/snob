import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutRepliesInputObjectSchema } from './CommentCreateWithoutRepliesInput.schema';
import { CommentUncheckedCreateWithoutRepliesInputObjectSchema } from './CommentUncheckedCreateWithoutRepliesInput.schema';
import { CommentCreateOrConnectWithoutRepliesInputObjectSchema } from './CommentCreateOrConnectWithoutRepliesInput.schema';
import { CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutRepliesInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRepliesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutRepliesInputObjectSchema).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputObjectSchema).optional()
}).strict();
export const CommentCreateNestedOneWithoutRepliesInputObjectSchema: z.ZodType<Prisma.CommentCreateNestedOneWithoutRepliesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateNestedOneWithoutRepliesInput>;
export const CommentCreateNestedOneWithoutRepliesInputObjectZodSchema = makeSchema();
