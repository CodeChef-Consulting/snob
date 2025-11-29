import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableFloatFieldUpdateOperationsInputObjectSchema as NullableFloatFieldUpdateOperationsInputObjectSchema } from './NullableFloatFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RestaurantLocationUncheckedUpdateManyWithoutGroupNestedInputObjectSchema as RestaurantLocationUncheckedUpdateManyWithoutGroupNestedInputObjectSchema } from './RestaurantLocationUncheckedUpdateManyWithoutGroupNestedInput.schema';
import { CommentUncheckedUpdateManyWithoutRestaurantGroupsMentionedNestedInputObjectSchema as CommentUncheckedUpdateManyWithoutRestaurantGroupsMentionedNestedInputObjectSchema } from './CommentUncheckedUpdateManyWithoutRestaurantGroupsMentionedNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  rawScore: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  normalizedScore: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  locations: z.lazy(() => RestaurantLocationUncheckedUpdateManyWithoutGroupNestedInputObjectSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutRestaurantGroupsMentionedNestedInputObjectSchema).optional()
}).strict();
export const RestaurantGroupUncheckedUpdateWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUncheckedUpdateWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUncheckedUpdateWithoutPostsInput>;
export const RestaurantGroupUncheckedUpdateWithoutPostsInputObjectZodSchema = makeSchema();
