import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GooglePlacesLookupSelectObjectSchema as GooglePlacesLookupSelectObjectSchema } from './objects/GooglePlacesLookupSelect.schema';
import { GooglePlacesLookupWhereUniqueInputObjectSchema as GooglePlacesLookupWhereUniqueInputObjectSchema } from './objects/GooglePlacesLookupWhereUniqueInput.schema';

export const GooglePlacesLookupFindUniqueOrThrowSchema: z.ZodType<Prisma.GooglePlacesLookupFindUniqueOrThrowArgs> = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(),  where: GooglePlacesLookupWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GooglePlacesLookupFindUniqueOrThrowArgs>;

export const GooglePlacesLookupFindUniqueOrThrowZodSchema = z.object({ select: GooglePlacesLookupSelectObjectSchema.optional(),  where: GooglePlacesLookupWhereUniqueInputObjectSchema }).strict();