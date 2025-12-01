import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GooglePlacesLookupUpdateManyMutationInputObjectSchema as GooglePlacesLookupUpdateManyMutationInputObjectSchema } from './objects/GooglePlacesLookupUpdateManyMutationInput.schema';
import { GooglePlacesLookupWhereInputObjectSchema as GooglePlacesLookupWhereInputObjectSchema } from './objects/GooglePlacesLookupWhereInput.schema';

export const GooglePlacesLookupUpdateManySchema: z.ZodType<Prisma.GooglePlacesLookupUpdateManyArgs> = z.object({ data: GooglePlacesLookupUpdateManyMutationInputObjectSchema, where: GooglePlacesLookupWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GooglePlacesLookupUpdateManyArgs>;

export const GooglePlacesLookupUpdateManyZodSchema = z.object({ data: GooglePlacesLookupUpdateManyMutationInputObjectSchema, where: GooglePlacesLookupWhereInputObjectSchema.optional() }).strict();