import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GooglePlacesLookupSelectObjectSchema as GooglePlacesLookupSelectObjectSchema } from './objects/GooglePlacesLookupSelect.schema';
import { GooglePlacesLookupWhereUniqueInputObjectSchema as GooglePlacesLookupWhereUniqueInputObjectSchema } from './objects/GooglePlacesLookupWhereUniqueInput.schema';
import { GooglePlacesLookupCreateInputObjectSchema as GooglePlacesLookupCreateInputObjectSchema } from './objects/GooglePlacesLookupCreateInput.schema';
import { GooglePlacesLookupUncheckedCreateInputObjectSchema as GooglePlacesLookupUncheckedCreateInputObjectSchema } from './objects/GooglePlacesLookupUncheckedCreateInput.schema';
import { GooglePlacesLookupUpdateInputObjectSchema as GooglePlacesLookupUpdateInputObjectSchema } from './objects/GooglePlacesLookupUpdateInput.schema';
import { GooglePlacesLookupUncheckedUpdateInputObjectSchema as GooglePlacesLookupUncheckedUpdateInputObjectSchema } from './objects/GooglePlacesLookupUncheckedUpdateInput.schema';

export const GooglePlacesLookupUpsertOneSchema: z.ZodType<Prisma.GooglePlacesLookupUpsertArgs> = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(),  where: GooglePlacesLookupWhereUniqueInputObjectSchema, create: z.union([ GooglePlacesLookupCreateInputObjectSchema, GooglePlacesLookupUncheckedCreateInputObjectSchema ]), update: z.union([ GooglePlacesLookupUpdateInputObjectSchema, GooglePlacesLookupUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.GooglePlacesLookupUpsertArgs>;

export const GooglePlacesLookupUpsertOneZodSchema = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(),  where: GooglePlacesLookupWhereUniqueInputObjectSchema, create: z.union([ GooglePlacesLookupCreateInputObjectSchema, GooglePlacesLookupUncheckedCreateInputObjectSchema ]), update: z.union([ GooglePlacesLookupUpdateInputObjectSchema, GooglePlacesLookupUncheckedUpdateInputObjectSchema ]) }).strict();