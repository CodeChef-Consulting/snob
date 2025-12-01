import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GooglePlacesLookupSelectObjectSchema as GooglePlacesLookupSelectObjectSchema } from './objects/GooglePlacesLookupSelect.schema';
import { GooglePlacesLookupUpdateManyMutationInputObjectSchema as GooglePlacesLookupUpdateManyMutationInputObjectSchema } from './objects/GooglePlacesLookupUpdateManyMutationInput.schema';
import { GooglePlacesLookupWhereInputObjectSchema as GooglePlacesLookupWhereInputObjectSchema } from './objects/GooglePlacesLookupWhereInput.schema';

export const GooglePlacesLookupUpdateManyAndReturnSchema: z.ZodType<Prisma.GooglePlacesLookupUpdateManyAndReturnArgs> = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(), data: GooglePlacesLookupUpdateManyMutationInputObjectSchema, where: GooglePlacesLookupWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GooglePlacesLookupUpdateManyAndReturnArgs>;

export const GooglePlacesLookupUpdateManyAndReturnZodSchema = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(), data: GooglePlacesLookupUpdateManyMutationInputObjectSchema, where: GooglePlacesLookupWhereInputObjectSchema.optional() }).strict();