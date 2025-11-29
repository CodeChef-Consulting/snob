import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableFloatFieldUpdateOperationsInputObjectSchema as NullableFloatFieldUpdateOperationsInputObjectSchema } from './NullableFloatFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RestaurantLocationUpdateManyWithoutGroupNestedInputObjectSchema as RestaurantLocationUpdateManyWithoutGroupNestedInputObjectSchema } from './RestaurantLocationUpdateManyWithoutGroupNestedInput.schema';
import { PostUpdateManyWithoutRestaurantGroupsMentionedNestedInputObjectSchema as PostUpdateManyWithoutRestaurantGroupsMentionedNestedInputObjectSchema } from './PostUpdateManyWithoutRestaurantGroupsMentionedNestedInput.schema';
import { CommentUpdateManyWithoutRestaurantGroupsMentionedNestedInputObjectSchema as CommentUpdateManyWithoutRestaurantGroupsMentionedNestedInputObjectSchema } from './CommentUpdateManyWithoutRestaurantGroupsMentionedNestedInput.schema'

const makeSchema = () => z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  rawScore: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  normalizedScore: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  locations: z.lazy(() => RestaurantLocationUpdateManyWithoutGroupNestedInputObjectSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutRestaurantGroupsMentionedNestedInputObjectSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutRestaurantGroupsMentionedNestedInputObjectSchema).optional()
}).strict();
export const RestaurantGroupUpdateInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUpdateInput>;
export const RestaurantGroupUpdateInputObjectZodSchema = makeSchema();
