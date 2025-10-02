import { z } from 'zod';
import { ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionCreateManyInputObjectSchema } from './objects/ScrapingSessionCreateManyInput.schema';

export const ScrapingSessionCreateManyAndReturnSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(), data: z.union([ ScrapingSessionCreateManyInputObjectSchema, z.array(ScrapingSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()