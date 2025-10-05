import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentScalarWhereInputObjectSchema as CommentScalarWhereInputObjectSchema } from './CommentScalarWhereInput.schema';
import { CommentUpdateManyMutationInputObjectSchema as CommentUpdateManyMutationInputObjectSchema } from './CommentUpdateManyMutationInput.schema';
import { CommentUncheckedUpdateManyWithoutRestaurantsMentionedInputObjectSchema as CommentUncheckedUpdateManyWithoutRestaurantsMentionedInputObjectSchema } from './CommentUncheckedUpdateManyWithoutRestaurantsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CommentUpdateManyMutationInputObjectSchema), z.lazy(() => CommentUncheckedUpdateManyWithoutRestaurantsMentionedInputObjectSchema)])
}).strict();
export const CommentUpdateManyWithWhereWithoutRestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutRestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutRestaurantsMentionedInput>;
export const CommentUpdateManyWithWhereWithoutRestaurantsMentionedInputObjectZodSchema = makeSchema();
