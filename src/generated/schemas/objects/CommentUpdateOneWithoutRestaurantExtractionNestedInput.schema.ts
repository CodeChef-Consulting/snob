import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutRestaurantExtractionInputObjectSchema as CommentCreateWithoutRestaurantExtractionInputObjectSchema } from './CommentCreateWithoutRestaurantExtractionInput.schema';
import { CommentUncheckedCreateWithoutRestaurantExtractionInputObjectSchema as CommentUncheckedCreateWithoutRestaurantExtractionInputObjectSchema } from './CommentUncheckedCreateWithoutRestaurantExtractionInput.schema';
import { CommentCreateOrConnectWithoutRestaurantExtractionInputObjectSchema as CommentCreateOrConnectWithoutRestaurantExtractionInputObjectSchema } from './CommentCreateOrConnectWithoutRestaurantExtractionInput.schema';
import { CommentUpsertWithoutRestaurantExtractionInputObjectSchema as CommentUpsertWithoutRestaurantExtractionInputObjectSchema } from './CommentUpsertWithoutRestaurantExtractionInput.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateToOneWithWhereWithoutRestaurantExtractionInputObjectSchema as CommentUpdateToOneWithWhereWithoutRestaurantExtractionInputObjectSchema } from './CommentUpdateToOneWithWhereWithoutRestaurantExtractionInput.schema';
import { CommentUpdateWithoutRestaurantExtractionInputObjectSchema as CommentUpdateWithoutRestaurantExtractionInputObjectSchema } from './CommentUpdateWithoutRestaurantExtractionInput.schema';
import { CommentUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema as CommentUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema } from './CommentUncheckedUpdateWithoutRestaurantExtractionInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutRestaurantExtractionInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutRestaurantExtractionInputObjectSchema).optional(),
  upsert: z.lazy(() => CommentUpsertWithoutRestaurantExtractionInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => CommentWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => CommentWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CommentUpdateToOneWithWhereWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => CommentUpdateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema)]).optional()
}).strict();
export const CommentUpdateOneWithoutRestaurantExtractionNestedInputObjectSchema: z.ZodType<Prisma.CommentUpdateOneWithoutRestaurantExtractionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateOneWithoutRestaurantExtractionNestedInput>;
export const CommentUpdateOneWithoutRestaurantExtractionNestedInputObjectZodSchema = makeSchema();
