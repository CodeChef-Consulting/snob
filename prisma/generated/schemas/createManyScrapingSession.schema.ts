import { z } from 'zod';
import { ScrapingSessionCreateManyInputObjectSchema } from './objects/ScrapingSessionCreateManyInput.schema';

export const ScrapingSessionCreateManySchema = z.object({ data: z.union([ ScrapingSessionCreateManyInputObjectSchema, z.array(ScrapingSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })