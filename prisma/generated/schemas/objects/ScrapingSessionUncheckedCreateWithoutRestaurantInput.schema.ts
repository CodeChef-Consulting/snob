import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  subreddit: z.string(),
  status: z.string().optional(),
  lastScrapedAt: z.coerce.date().optional().nullable(),
  lastPostTimestamp: z.coerce.date().optional().nullable(),
  postsScraped: z.number().int().optional(),
  commentsScraped: z.number().int().optional(),
  errorMessage: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUncheckedCreateWithoutRestaurantInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUncheckedCreateWithoutRestaurantInput>;
export const ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectZodSchema = makeSchema();
