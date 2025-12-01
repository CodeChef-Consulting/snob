import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GooglePlacesLookupSelectObjectSchema as GooglePlacesLookupSelectObjectSchema } from './objects/GooglePlacesLookupSelect.schema';
import { GooglePlacesLookupCreateInputObjectSchema as GooglePlacesLookupCreateInputObjectSchema } from './objects/GooglePlacesLookupCreateInput.schema';
import { GooglePlacesLookupUncheckedCreateInputObjectSchema as GooglePlacesLookupUncheckedCreateInputObjectSchema } from './objects/GooglePlacesLookupUncheckedCreateInput.schema';

export const GooglePlacesLookupCreateOneSchema: z.ZodType<Prisma.GooglePlacesLookupCreateArgs> = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(),  data: z.union([GooglePlacesLookupCreateInputObjectSchema, GooglePlacesLookupUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.GooglePlacesLookupCreateArgs>;

export const GooglePlacesLookupCreateOneZodSchema = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(),  data: z.union([GooglePlacesLookupCreateInputObjectSchema, GooglePlacesLookupUncheckedCreateInputObjectSchema]) }).strict();