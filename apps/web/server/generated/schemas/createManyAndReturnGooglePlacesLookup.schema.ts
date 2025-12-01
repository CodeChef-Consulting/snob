import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GooglePlacesLookupSelectObjectSchema as GooglePlacesLookupSelectObjectSchema } from './objects/GooglePlacesLookupSelect.schema';
import { GooglePlacesLookupCreateManyInputObjectSchema as GooglePlacesLookupCreateManyInputObjectSchema } from './objects/GooglePlacesLookupCreateManyInput.schema';

export const GooglePlacesLookupCreateManyAndReturnSchema: z.ZodType<Prisma.GooglePlacesLookupCreateManyAndReturnArgs> = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(), data: z.union([ GooglePlacesLookupCreateManyInputObjectSchema, z.array(GooglePlacesLookupCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GooglePlacesLookupCreateManyAndReturnArgs>;

export const GooglePlacesLookupCreateManyAndReturnZodSchema = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(), data: z.union([ GooglePlacesLookupCreateManyInputObjectSchema, z.array(GooglePlacesLookupCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();