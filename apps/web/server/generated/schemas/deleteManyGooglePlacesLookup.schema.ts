import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GooglePlacesLookupWhereInputObjectSchema as GooglePlacesLookupWhereInputObjectSchema } from './objects/GooglePlacesLookupWhereInput.schema';

export const GooglePlacesLookupDeleteManySchema: z.ZodType<Prisma.GooglePlacesLookupDeleteManyArgs> = z.object({ where: GooglePlacesLookupWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GooglePlacesLookupDeleteManyArgs>;

export const GooglePlacesLookupDeleteManyZodSchema = z.object({ where: GooglePlacesLookupWhereInputObjectSchema.optional() }).strict();