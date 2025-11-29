import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema as CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentCreateWithoutRestaurantGroupsMentionedInput.schema';
import { CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUncheckedCreateWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema)])
}).strict();
export const CommentCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutRestaurantGroupsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateOrConnectWithoutRestaurantGroupsMentionedInput>;
export const CommentCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectZodSchema = makeSchema();
