import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const googleplaceslookupscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => GooglePlacesLookupScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => GooglePlacesLookupScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => GooglePlacesLookupScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => GooglePlacesLookupScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => GooglePlacesLookupScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  year: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  month: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  googleSKU: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  count: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const GooglePlacesLookupScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.GooglePlacesLookupScalarWhereWithAggregatesInput> = googleplaceslookupscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.GooglePlacesLookupScalarWhereWithAggregatesInput>;
export const GooglePlacesLookupScalarWhereWithAggregatesInputObjectZodSchema = googleplaceslookupscalarwherewithaggregatesinputSchema;
