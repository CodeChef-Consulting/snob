import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema as CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentCreateWithoutRestaurantGroupsMentionedInput.schema';
import { CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUncheckedCreateWithoutRestaurantGroupsMentionedInput.schema';
import { CommentCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema as CommentCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentCreateOrConnectWithoutRestaurantGroupsMentionedInput.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CommentCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => CommentCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInput>;
export const CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectZodSchema = makeSchema();
