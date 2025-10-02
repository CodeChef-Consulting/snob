import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithoutPostInputObjectSchema as CommentUpdateWithoutPostInputObjectSchema } from './CommentUpdateWithoutPostInput.schema';
import { CommentUncheckedUpdateWithoutPostInputObjectSchema as CommentUncheckedUpdateWithoutPostInputObjectSchema } from './CommentUncheckedUpdateWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CommentUpdateWithoutPostInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutPostInputObjectSchema)])
}).strict();
export const CommentUpdateWithWhereUniqueWithoutPostInputObjectSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutPostInput>;
export const CommentUpdateWithWhereUniqueWithoutPostInputObjectZodSchema = makeSchema();
