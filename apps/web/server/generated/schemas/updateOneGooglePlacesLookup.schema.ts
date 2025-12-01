import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GooglePlacesLookupSelectObjectSchema as GooglePlacesLookupSelectObjectSchema } from './objects/GooglePlacesLookupSelect.schema';
import { GooglePlacesLookupUpdateInputObjectSchema as GooglePlacesLookupUpdateInputObjectSchema } from './objects/GooglePlacesLookupUpdateInput.schema';
import { GooglePlacesLookupUncheckedUpdateInputObjectSchema as GooglePlacesLookupUncheckedUpdateInputObjectSchema } from './objects/GooglePlacesLookupUncheckedUpdateInput.schema';
import { GooglePlacesLookupWhereUniqueInputObjectSchema as GooglePlacesLookupWhereUniqueInputObjectSchema } from './objects/GooglePlacesLookupWhereUniqueInput.schema';

export const GooglePlacesLookupUpdateOneSchema: z.ZodType<Prisma.GooglePlacesLookupUpdateArgs> = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(),  data: z.union([GooglePlacesLookupUpdateInputObjectSchema, GooglePlacesLookupUncheckedUpdateInputObjectSchema]), where: GooglePlacesLookupWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GooglePlacesLookupUpdateArgs>;

export const GooglePlacesLookupUpdateOneZodSchema = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(),  data: z.union([GooglePlacesLookupUpdateInputObjectSchema, GooglePlacesLookupUncheckedUpdateInputObjectSchema]), where: GooglePlacesLookupWhereUniqueInputObjectSchema }).strict();