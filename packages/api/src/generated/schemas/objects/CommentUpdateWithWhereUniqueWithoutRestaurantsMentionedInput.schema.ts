import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithoutRestaurantsMentionedInputObjectSchema as CommentUpdateWithoutRestaurantsMentionedInputObjectSchema } from './CommentUpdateWithoutRestaurantsMentionedInput.schema';
import { CommentUncheckedUpdateWithoutRestaurantsMentionedInputObjectSchema as CommentUncheckedUpdateWithoutRestaurantsMentionedInputObjectSchema } from './CommentUncheckedUpdateWithoutRestaurantsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CommentUpdateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutRestaurantsMentionedInputObjectSchema)])
}).strict();
export const CommentUpdateWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutRestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutRestaurantsMentionedInput>;
export const CommentUpdateWithWhereUniqueWithoutRestaurantsMentionedInputObjectZodSchema = makeSchema();
