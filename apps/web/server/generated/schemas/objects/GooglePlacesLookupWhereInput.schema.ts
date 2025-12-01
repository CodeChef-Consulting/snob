import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const googleplaceslookupwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => GooglePlacesLookupWhereInputObjectSchema), z.lazy(() => GooglePlacesLookupWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => GooglePlacesLookupWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => GooglePlacesLookupWhereInputObjectSchema), z.lazy(() => GooglePlacesLookupWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  year: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  month: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  googleSKU: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  count: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const GooglePlacesLookupWhereInputObjectSchema: z.ZodType<Prisma.GooglePlacesLookupWhereInput> = googleplaceslookupwhereinputSchema as unknown as z.ZodType<Prisma.GooglePlacesLookupWhereInput>;
export const GooglePlacesLookupWhereInputObjectZodSchema = googleplaceslookupwhereinputSchema;
