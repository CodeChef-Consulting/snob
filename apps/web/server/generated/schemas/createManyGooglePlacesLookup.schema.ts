import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GooglePlacesLookupCreateManyInputObjectSchema as GooglePlacesLookupCreateManyInputObjectSchema } from './objects/GooglePlacesLookupCreateManyInput.schema';

export const GooglePlacesLookupCreateManySchema: z.ZodType<Prisma.GooglePlacesLookupCreateManyArgs> = z.object({ data: z.union([ GooglePlacesLookupCreateManyInputObjectSchema, z.array(GooglePlacesLookupCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GooglePlacesLookupCreateManyArgs>;

export const GooglePlacesLookupCreateManyZodSchema = z.object({ data: z.union([ GooglePlacesLookupCreateManyInputObjectSchema, z.array(GooglePlacesLookupCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();