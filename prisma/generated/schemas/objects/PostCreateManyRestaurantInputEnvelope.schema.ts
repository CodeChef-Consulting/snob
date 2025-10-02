import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateManyRestaurantInputObjectSchema } from './PostCreateManyRestaurantInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PostCreateManyRestaurantInputObjectSchema), z.lazy(() => PostCreateManyRestaurantInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PostCreateManyRestaurantInputEnvelopeObjectSchema: z.ZodType<Prisma.PostCreateManyRestaurantInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateManyRestaurantInputEnvelope>;
export const PostCreateManyRestaurantInputEnvelopeObjectZodSchema = makeSchema();
