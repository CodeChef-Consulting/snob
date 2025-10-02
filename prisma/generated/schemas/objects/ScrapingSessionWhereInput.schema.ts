import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RestaurantNullableScalarRelationFilterObjectSchema as RestaurantNullableScalarRelationFilterObjectSchema } from './RestaurantNullableScalarRelationFilter.schema';
import { RestaurantWhereInputObjectSchema as RestaurantWhereInputObjectSchema } from './RestaurantWhereInput.schema'

const scrapingsessionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ScrapingSessionWhereInputObjectSchema), z.lazy(() => ScrapingSessionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ScrapingSessionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ScrapingSessionWhereInputObjectSchema), z.lazy(() => ScrapingSessionWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  subreddit: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  restaurantId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  lastScrapedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  lastPostTimestamp: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  postsScraped: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  commentsScraped: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  errorMessage: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  restaurant: z.union([z.lazy(() => RestaurantNullableScalarRelationFilterObjectSchema), z.lazy(() => RestaurantWhereInputObjectSchema)]).optional()
}).strict();
export const ScrapingSessionWhereInputObjectSchema: z.ZodType<Prisma.ScrapingSessionWhereInput> = scrapingsessionwhereinputSchema as unknown as z.ZodType<Prisma.ScrapingSessionWhereInput>;
export const ScrapingSessionWhereInputObjectZodSchema = scrapingsessionwhereinputSchema;
