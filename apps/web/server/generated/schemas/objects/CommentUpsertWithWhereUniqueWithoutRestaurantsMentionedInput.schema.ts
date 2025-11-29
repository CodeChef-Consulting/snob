import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithoutRestaurantsMentionedInputObjectSchema as CommentUpdateWithoutRestaurantsMentionedInputObjectSchema } from './CommentUpdateWithoutRestaurantsMentionedInput.schema';
import { CommentUncheckedUpdateWithoutRestaurantsMentionedInputObjectSchema as CommentUncheckedUpdateWithoutRestaurantsMentionedInputObjectSchema } from './CommentUncheckedUpdateWithoutRestaurantsMentionedInput.schema';
import { CommentCreateWithoutRestaurantsMentionedInputObjectSchema as CommentCreateWithoutRestaurantsMentionedInputObjectSchema } from './CommentCreateWithoutRestaurantsMentionedInput.schema';
import { CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema as CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema } from './CommentUncheckedCreateWithoutRestaurantsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CommentUpdateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutRestaurantsMentionedInputObjectSchema)]),
  create: z.union([z.lazy(() => CommentCreateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema)])
}).strict();
export const CommentUpsertWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutRestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutRestaurantsMentionedInput>;
export const CommentUpsertWithWhereUniqueWithoutRestaurantsMentionedInputObjectZodSchema = makeSchema();
