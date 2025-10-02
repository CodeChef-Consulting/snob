import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentCreateWithoutPostInputObjectSchema } from './CommentCreateWithoutPostInput.schema';
import { CommentUncheckedCreateWithoutPostInputObjectSchema } from './CommentUncheckedCreateWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CommentCreateWithoutPostInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutPostInputObjectSchema)])
}).strict();
export const CommentCreateOrConnectWithoutPostInputObjectSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateOrConnectWithoutPostInput>;
export const CommentCreateOrConnectWithoutPostInputObjectZodSchema = makeSchema();
