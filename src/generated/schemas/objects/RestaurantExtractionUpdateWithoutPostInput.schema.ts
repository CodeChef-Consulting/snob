import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { CommentUpdateOneWithoutRestaurantExtractionNestedInputObjectSchema as CommentUpdateOneWithoutRestaurantExtractionNestedInputObjectSchema } from './CommentUpdateOneWithoutRestaurantExtractionNestedInput.schema'

const makeSchema = () => z.object({
  restaurantsMentioned: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  primaryRestaurant: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  dishesMentioned: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  isSubjective: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  extractedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  model: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  comment: z.lazy(() => CommentUpdateOneWithoutRestaurantExtractionNestedInputObjectSchema).optional()
}).strict();
export const RestaurantExtractionUpdateWithoutPostInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUpdateWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUpdateWithoutPostInput>;
export const RestaurantExtractionUpdateWithoutPostInputObjectZodSchema = makeSchema();
