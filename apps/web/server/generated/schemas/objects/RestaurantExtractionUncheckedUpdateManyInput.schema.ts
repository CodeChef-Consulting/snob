import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { RestaurantExtractionUpdaterestaurantsMentionedInputObjectSchema as RestaurantExtractionUpdaterestaurantsMentionedInputObjectSchema } from './RestaurantExtractionUpdaterestaurantsMentionedInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { RestaurantExtractionUpdatedishesMentionedInputObjectSchema as RestaurantExtractionUpdatedishesMentionedInputObjectSchema } from './RestaurantExtractionUpdatedishesMentionedInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  postId: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  commentId: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  restaurantsMentioned: z.union([z.lazy(() => RestaurantExtractionUpdaterestaurantsMentionedInputObjectSchema), z.string().array()]).optional(),
  primaryRestaurant: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  dishesMentioned: z.union([z.lazy(() => RestaurantExtractionUpdatedishesMentionedInputObjectSchema), z.string().array()]).optional(),
  isSubjective: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  attemptedLinkToRestaurantsMentioned: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  extractedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  model: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const RestaurantExtractionUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUncheckedUpdateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUncheckedUpdateManyInput>;
export const RestaurantExtractionUncheckedUpdateManyInputObjectZodSchema = makeSchema();
