import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutPostInputObjectSchema as CommentCreateWithoutPostInputObjectSchema } from './CommentCreateWithoutPostInput.schema';
import { CommentUncheckedCreateWithoutPostInputObjectSchema as CommentUncheckedCreateWithoutPostInputObjectSchema } from './CommentUncheckedCreateWithoutPostInput.schema';
import { CommentCreateOrConnectWithoutPostInputObjectSchema as CommentCreateOrConnectWithoutPostInputObjectSchema } from './CommentCreateOrConnectWithoutPostInput.schema';
import { CommentCreateManyPostInputEnvelopeObjectSchema as CommentCreateManyPostInputEnvelopeObjectSchema } from './CommentCreateManyPostInputEnvelope.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutPostInputObjectSchema), z.lazy(() => CommentCreateWithoutPostInputObjectSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutPostInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutPostInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CommentCreateOrConnectWithoutPostInputObjectSchema), z.lazy(() => CommentCreateOrConnectWithoutPostInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CommentUncheckedCreateNestedManyWithoutPostInputObjectSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutPostInput>;
export const CommentUncheckedCreateNestedManyWithoutPostInputObjectZodSchema = makeSchema();
