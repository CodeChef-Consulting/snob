import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentCreateWithoutRestaurantsMentionedInputObjectSchema as CommentCreateWithoutRestaurantsMentionedInputObjectSchema } from './CommentCreateWithoutRestaurantsMentionedInput.schema';
import { CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema as CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema } from './CommentUncheckedCreateWithoutRestaurantsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CommentCreateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema)])
}).strict();
export const CommentCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutRestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateOrConnectWithoutRestaurantsMentionedInput>;
export const CommentCreateOrConnectWithoutRestaurantsMentionedInputObjectZodSchema = makeSchema();
