import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GooglePlacesLookupOrderByWithRelationInputObjectSchema as GooglePlacesLookupOrderByWithRelationInputObjectSchema } from './objects/GooglePlacesLookupOrderByWithRelationInput.schema';
import { GooglePlacesLookupWhereInputObjectSchema as GooglePlacesLookupWhereInputObjectSchema } from './objects/GooglePlacesLookupWhereInput.schema';
import { GooglePlacesLookupWhereUniqueInputObjectSchema as GooglePlacesLookupWhereUniqueInputObjectSchema } from './objects/GooglePlacesLookupWhereUniqueInput.schema';
import { GooglePlacesLookupScalarFieldEnumSchema } from './enums/GooglePlacesLookupScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const GooglePlacesLookupFindFirstOrThrowSelectSchema: z.ZodType<Prisma.GooglePlacesLookupSelect> = z.object({
    id: z.boolean().optional(),
    year: z.boolean().optional(),
    month: z.boolean().optional(),
    googleSKU: z.boolean().optional(),
    count: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.GooglePlacesLookupSelect>;

export const GooglePlacesLookupFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    year: z.boolean().optional(),
    month: z.boolean().optional(),
    googleSKU: z.boolean().optional(),
    count: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const GooglePlacesLookupFindFirstOrThrowSchema: z.ZodType<Prisma.GooglePlacesLookupFindFirstOrThrowArgs> = z.object({ select: GooglePlacesLookupFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([GooglePlacesLookupOrderByWithRelationInputObjectSchema, GooglePlacesLookupOrderByWithRelationInputObjectSchema.array()]).optional(), where: GooglePlacesLookupWhereInputObjectSchema.optional(), cursor: GooglePlacesLookupWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GooglePlacesLookupScalarFieldEnumSchema, GooglePlacesLookupScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.GooglePlacesLookupFindFirstOrThrowArgs>;

export const GooglePlacesLookupFindFirstOrThrowZodSchema = z.object({ select: GooglePlacesLookupFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([GooglePlacesLookupOrderByWithRelationInputObjectSchema, GooglePlacesLookupOrderByWithRelationInputObjectSchema.array()]).optional(), where: GooglePlacesLookupWhereInputObjectSchema.optional(), cursor: GooglePlacesLookupWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GooglePlacesLookupScalarFieldEnumSchema, GooglePlacesLookupScalarFieldEnumSchema.array()]).optional() }).strict();