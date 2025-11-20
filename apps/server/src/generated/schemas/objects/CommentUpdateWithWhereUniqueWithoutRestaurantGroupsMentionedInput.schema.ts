import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUpdateWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUpdateWithoutRestaurantGroupsMentionedInput.schema';
import { CommentUncheckedUpdateWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUncheckedUpdateWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUncheckedUpdateWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CommentUpdateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutRestaurantGroupsMentionedInputObjectSchema)])
}).strict();
export const CommentUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInput>;
export const CommentUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectZodSchema = makeSchema();
