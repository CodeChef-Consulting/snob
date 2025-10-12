import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PostUpdateOneWithoutRestaurantExtractionNestedInputObjectSchema as PostUpdateOneWithoutRestaurantExtractionNestedInputObjectSchema } from './PostUpdateOneWithoutRestaurantExtractionNestedInput.schema';
import { CommentUpdateOneWithoutRestaurantExtractionNestedInputObjectSchema as CommentUpdateOneWithoutRestaurantExtractionNestedInputObjectSchema } from './CommentUpdateOneWithoutRestaurantExtractionNestedInput.schema'

const makeSchema = () => z.object({
  restaurantsMentioned: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  primaryRestaurant: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  dishesMentioned: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  isSubjective: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  attemptedLinkToRestaurantsMentioned: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  extractedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  model: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  post: z.lazy(() => PostUpdateOneWithoutRestaurantExtractionNestedInputObjectSchema).optional(),
  comment: z.lazy(() => CommentUpdateOneWithoutRestaurantExtractionNestedInputObjectSchema).optional()
}).strict();
export const RestaurantExtractionUpdateInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUpdateInput>;
export const RestaurantExtractionUpdateInputObjectZodSchema = makeSchema();
