import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentScalarWhereInputObjectSchema as CommentScalarWhereInputObjectSchema } from './CommentScalarWhereInput.schema';
import { CommentUpdateManyMutationInputObjectSchema as CommentUpdateManyMutationInputObjectSchema } from './CommentUpdateManyMutationInput.schema';
import { CommentUncheckedUpdateManyWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUncheckedUpdateManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUncheckedUpdateManyWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CommentUpdateManyMutationInputObjectSchema), z.lazy(() => CommentUncheckedUpdateManyWithoutRestaurantGroupsMentionedInputObjectSchema)])
}).strict();
export const CommentUpdateManyWithWhereWithoutRestaurantGroupsMentionedInputObjectSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutRestaurantGroupsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutRestaurantGroupsMentionedInput>;
export const CommentUpdateManyWithWhereWithoutRestaurantGroupsMentionedInputObjectZodSchema = makeSchema();
