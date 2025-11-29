import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUpdateWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUpdateWithoutRestaurantGroupsMentionedInput.schema';
import { CommentUncheckedUpdateWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUncheckedUpdateWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUncheckedUpdateWithoutRestaurantGroupsMentionedInput.schema';
import { CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema as CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentCreateWithoutRestaurantGroupsMentionedInput.schema';
import { CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUncheckedCreateWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CommentUpdateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutRestaurantGroupsMentionedInputObjectSchema)]),
  create: z.union([z.lazy(() => CommentCreateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema)])
}).strict();
export const CommentUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInput>;
export const CommentUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectZodSchema = makeSchema();
