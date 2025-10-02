import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithoutPostInputObjectSchema } from './CommentUpdateWithoutPostInput.schema';
import { CommentUncheckedUpdateWithoutPostInputObjectSchema } from './CommentUncheckedUpdateWithoutPostInput.schema';
import { CommentCreateWithoutPostInputObjectSchema } from './CommentCreateWithoutPostInput.schema';
import { CommentUncheckedCreateWithoutPostInputObjectSchema } from './CommentUncheckedCreateWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CommentUpdateWithoutPostInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutPostInputObjectSchema)]),
  create: z.union([z.lazy(() => CommentCreateWithoutPostInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutPostInputObjectSchema)])
}).strict();
export const CommentUpsertWithWhereUniqueWithoutPostInputObjectSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutPostInput>;
export const CommentUpsertWithWhereUniqueWithoutPostInputObjectZodSchema = makeSchema();
