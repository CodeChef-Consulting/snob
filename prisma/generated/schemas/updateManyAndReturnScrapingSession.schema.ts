import { z } from 'zod';
import { ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionUpdateManyMutationInputObjectSchema } from './objects/ScrapingSessionUpdateManyMutationInput.schema';
import { ScrapingSessionWhereInputObjectSchema } from './objects/ScrapingSessionWhereInput.schema';

export const ScrapingSessionUpdateManyAndReturnSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(), data: ScrapingSessionUpdateManyMutationInputObjectSchema, where: ScrapingSessionWhereInputObjectSchema.optional()  }).strict()