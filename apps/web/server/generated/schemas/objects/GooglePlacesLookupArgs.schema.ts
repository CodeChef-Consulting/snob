import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GooglePlacesLookupSelectObjectSchema as GooglePlacesLookupSelectObjectSchema } from './GooglePlacesLookupSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => GooglePlacesLookupSelectObjectSchema).optional()
}).strict();
export const GooglePlacesLookupArgsObjectSchema = makeSchema();
export const GooglePlacesLookupArgsObjectZodSchema = makeSchema();
