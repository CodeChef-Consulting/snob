import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array()
}).strict();
export const RestaurantCreatelookupAliasesInputObjectSchema: z.ZodType<Prisma.RestaurantCreatelookupAliasesInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantCreatelookupAliasesInput>;
export const RestaurantCreatelookupAliasesInputObjectZodSchema = makeSchema();
