import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutRestaurantsMentionedInputObjectSchema as CommentCreateWithoutRestaurantsMentionedInputObjectSchema } from './CommentCreateWithoutRestaurantsMentionedInput.schema';
import { CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema as CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema } from './CommentUncheckedCreateWithoutRestaurantsMentionedInput.schema';
import { CommentCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema as CommentCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema } from './CommentCreateOrConnectWithoutRestaurantsMentionedInput.schema';
import { CommentUpsertWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema as CommentUpsertWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema } from './CommentUpsertWithWhereUniqueWithoutRestaurantsMentionedInput.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema as CommentUpdateWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema } from './CommentUpdateWithWhereUniqueWithoutRestaurantsMentionedInput.schema';
import { CommentUpdateManyWithWhereWithoutRestaurantsMentionedInputObjectSchema as CommentUpdateManyWithWhereWithoutRestaurantsMentionedInputObjectSchema } from './CommentUpdateManyWithWhereWithoutRestaurantsMentionedInput.schema';
import { CommentScalarWhereInputObjectSchema as CommentScalarWhereInputObjectSchema } from './CommentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => CommentCreateWithoutRestaurantsMentionedInputObjectSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CommentCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => CommentCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CommentUpsertWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => CommentUpsertWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CommentUpdateWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => CommentUpdateWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CommentUpdateManyWithWhereWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => CommentUpdateManyWithWhereWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CommentScalarWhereInputObjectSchema), z.lazy(() => CommentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CommentUncheckedUpdateManyWithoutRestaurantsMentionedNestedInputObjectSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutRestaurantsMentionedNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutRestaurantsMentionedNestedInput>;
export const CommentUncheckedUpdateManyWithoutRestaurantsMentionedNestedInputObjectZodSchema = makeSchema();
