import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationCreatelookupAliasesInputObjectSchema as RestaurantLocationCreatelookupAliasesInputObjectSchema } from './RestaurantLocationCreatelookupAliasesInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { RestaurantGroupCreateNestedOneWithoutLocationsInputObjectSchema as RestaurantGroupCreateNestedOneWithoutLocationsInputObjectSchema } from './RestaurantGroupCreateNestedOneWithoutLocationsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  name: z.string(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  source: z.string().optional(),
  googlePlaceId: z.string().optional().nullable(),
  lookupAliases: z.union([z.lazy(() => RestaurantLocationCreatelookupAliasesInputObjectSchema), z.string().array()]).optional(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  group: z.lazy(() => RestaurantGroupCreateNestedOneWithoutLocationsInputObjectSchema)
}).strict();
export const RestaurantLocationCreateInputObjectSchema: z.ZodType<Prisma.RestaurantLocationCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationCreateInput>;
export const RestaurantLocationCreateInputObjectZodSchema = makeSchema();
