import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutRepliesInputObjectSchema } from './CommentCreateWithoutRepliesInput.schema';
import { CommentUncheckedCreateWithoutRepliesInputObjectSchema } from './CommentUncheckedCreateWithoutRepliesInput.schema';
import { CommentCreateOrConnectWithoutRepliesInputObjectSchema } from './CommentCreateOrConnectWithoutRepliesInput.schema';
import { CommentUpsertWithoutRepliesInputObjectSchema } from './CommentUpsertWithoutRepliesInput.schema';
import { CommentWhereInputObjectSchema } from './CommentWhereInput.schema';
import { CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateToOneWithWhereWithoutRepliesInputObjectSchema } from './CommentUpdateToOneWithWhereWithoutRepliesInput.schema';
import { CommentUpdateWithoutRepliesInputObjectSchema } from './CommentUpdateWithoutRepliesInput.schema';
import { CommentUncheckedUpdateWithoutRepliesInputObjectSchema } from './CommentUncheckedUpdateWithoutRepliesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutRepliesInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRepliesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutRepliesInputObjectSchema).optional(),
  upsert: z.lazy(() => CommentUpsertWithoutRepliesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => CommentWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => CommentWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CommentUpdateToOneWithWhereWithoutRepliesInputObjectSchema), z.lazy(() => CommentUpdateWithoutRepliesInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutRepliesInputObjectSchema)]).optional()
}).strict();
export const CommentUpdateOneWithoutRepliesNestedInputObjectSchema: z.ZodType<Prisma.CommentUpdateOneWithoutRepliesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateOneWithoutRepliesNestedInput>;
export const CommentUpdateOneWithoutRepliesNestedInputObjectZodSchema = makeSchema();
