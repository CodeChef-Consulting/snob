import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutPostInputObjectSchema } from './CommentCreateWithoutPostInput.schema';
import { CommentUncheckedCreateWithoutPostInputObjectSchema } from './CommentUncheckedCreateWithoutPostInput.schema';
import { CommentCreateOrConnectWithoutPostInputObjectSchema } from './CommentCreateOrConnectWithoutPostInput.schema';
import { CommentCreateManyPostInputEnvelopeObjectSchema } from './CommentCreateManyPostInputEnvelope.schema';
import { CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutPostInputObjectSchema), z.lazy(() => CommentCreateWithoutPostInputObjectSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutPostInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutPostInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CommentCreateOrConnectWithoutPostInputObjectSchema), z.lazy(() => CommentCreateOrConnectWithoutPostInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CommentCreateNestedManyWithoutPostInputObjectSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateNestedManyWithoutPostInput>;
export const CommentCreateNestedManyWithoutPostInputObjectZodSchema = makeSchema();
