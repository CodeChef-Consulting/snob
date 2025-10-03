import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentCreateWithoutRepliesInputObjectSchema as CommentCreateWithoutRepliesInputObjectSchema } from './CommentCreateWithoutRepliesInput.schema';
import { CommentUncheckedCreateWithoutRepliesInputObjectSchema as CommentUncheckedCreateWithoutRepliesInputObjectSchema } from './CommentUncheckedCreateWithoutRepliesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CommentCreateWithoutRepliesInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRepliesInputObjectSchema)])
}).strict();
export const CommentCreateOrConnectWithoutRepliesInputObjectSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutRepliesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateOrConnectWithoutRepliesInput>;
export const CommentCreateOrConnectWithoutRepliesInputObjectZodSchema = makeSchema();
