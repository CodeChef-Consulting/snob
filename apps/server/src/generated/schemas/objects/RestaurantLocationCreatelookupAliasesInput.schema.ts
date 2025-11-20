import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array()
}).strict();
export const RestaurantLocationCreatelookupAliasesInputObjectSchema: z.ZodType<Prisma.RestaurantLocationCreatelookupAliasesInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationCreatelookupAliasesInput>;
export const RestaurantLocationCreatelookupAliasesInputObjectZodSchema = makeSchema();
