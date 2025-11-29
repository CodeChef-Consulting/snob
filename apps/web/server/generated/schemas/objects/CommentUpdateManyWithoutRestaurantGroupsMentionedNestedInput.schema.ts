import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema as CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentCreateWithoutRestaurantGroupsMentionedInput.schema';
import { CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUncheckedCreateWithoutRestaurantGroupsMentionedInput.schema';
import { CommentCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema as CommentCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentCreateOrConnectWithoutRestaurantGroupsMentionedInput.schema';
import { CommentUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInput.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInput.schema';
import { CommentUpdateManyWithWhereWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUpdateManyWithWhereWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUpdateManyWithWhereWithoutRestaurantGroupsMentionedInput.schema';
import { CommentScalarWhereInputObjectSchema as CommentScalarWhereInputObjectSchema } from './CommentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CommentCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => CommentCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CommentUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => CommentUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CommentUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => CommentUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CommentUpdateManyWithWhereWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => CommentUpdateManyWithWhereWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CommentScalarWhereInputObjectSchema), z.lazy(() => CommentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CommentUpdateManyWithoutRestaurantGroupsMentionedNestedInputObjectSchema: z.ZodType<Prisma.CommentUpdateManyWithoutRestaurantGroupsMentionedNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateManyWithoutRestaurantGroupsMentionedNestedInput>;
export const CommentUpdateManyWithoutRestaurantGroupsMentionedNestedInputObjectZodSchema = makeSchema();
