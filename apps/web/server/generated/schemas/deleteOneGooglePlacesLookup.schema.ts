import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GooglePlacesLookupSelectObjectSchema as GooglePlacesLookupSelectObjectSchema } from './objects/GooglePlacesLookupSelect.schema';
import { GooglePlacesLookupWhereUniqueInputObjectSchema as GooglePlacesLookupWhereUniqueInputObjectSchema } from './objects/GooglePlacesLookupWhereUniqueInput.schema';

export const GooglePlacesLookupDeleteOneSchema: z.ZodType<Prisma.GooglePlacesLookupDeleteArgs> = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(),  where: GooglePlacesLookupWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GooglePlacesLookupDeleteArgs>;

export const GooglePlacesLookupDeleteOneZodSchema = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(),  where: GooglePlacesLookupWhereUniqueInputObjectSchema }).strict();