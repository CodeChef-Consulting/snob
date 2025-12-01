import * as z from 'zod';

export const GooglePlacesLookupScalarFieldEnumSchema = z.enum(['id', 'year', 'month', 'googleSKU', 'count', 'createdAt', 'updatedAt'])

export type GooglePlacesLookupScalarFieldEnum = z.infer<typeof GooglePlacesLookupScalarFieldEnumSchema>;