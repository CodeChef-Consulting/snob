import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithoutPostInputObjectSchema as CommentUpdateWithoutPostInputObjectSchema } from './CommentUpdateWithoutPostInput.schema';
import { CommentUncheckedUpdateWithoutPostInputObjectSchema as CommentUncheckedUpdateWithoutPostInputObjectSchema } from './CommentUncheckedUpdateWithoutPostInput.schema';
import { CommentCreateWithoutPostInputObjectSchema as CommentCreateWithoutPostInputObjectSchema } from './CommentCreateWithoutPostInput.schema';
import { CommentUncheckedCreateWithoutPostInputObjectSchema as CommentUncheckedCreateWithoutPostInputObjectSchema } from './CommentUncheckedCreateWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CommentUpdateWithoutPostInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutPostInputObjectSchema)]),
  create: z.union([z.lazy(() => CommentCreateWithoutPostInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutPostInputObjectSchema)])
}).strict();
export const CommentUpsertWithWhereUniqueWithoutPostInputObjectSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutPostInput>;
export const CommentUpsertWithWhereUniqueWithoutPostInputObjectZodSchema = makeSchema();
