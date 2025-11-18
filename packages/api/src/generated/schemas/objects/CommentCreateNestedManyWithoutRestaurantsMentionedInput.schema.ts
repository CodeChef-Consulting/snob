import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutRestaurantsMentionedInputObjectSchema as CommentCreateWithoutRestaurantsMentionedInputObjectSchema } from './CommentCreateWithoutRestaurantsMentionedInput.schema';
import { CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema as CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema } from './CommentUncheckedCreateWithoutRestaurantsMentionedInput.schema';
import { CommentCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema as CommentCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema } from './CommentCreateOrConnectWithoutRestaurantsMentionedInput.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => CommentCreateWithoutRestaurantsMentionedInputObjectSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CommentCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => CommentCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CommentCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutRestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateNestedManyWithoutRestaurantsMentionedInput>;
export const CommentCreateNestedManyWithoutRestaurantsMentionedInputObjectZodSchema = makeSchema();
