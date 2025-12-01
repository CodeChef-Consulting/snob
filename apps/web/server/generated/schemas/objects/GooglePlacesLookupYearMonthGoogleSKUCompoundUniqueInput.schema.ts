import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  year: z.number().int(),
  month: z.number().int(),
  googleSKU: z.string()
}).strict();
export const GooglePlacesLookupYearMonthGoogleSKUCompoundUniqueInputObjectSchema: z.ZodType<Prisma.GooglePlacesLookupYearMonthGoogleSKUCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.GooglePlacesLookupYearMonthGoogleSKUCompoundUniqueInput>;
export const GooglePlacesLookupYearMonthGoogleSKUCompoundUniqueInputObjectZodSchema = makeSchema();
