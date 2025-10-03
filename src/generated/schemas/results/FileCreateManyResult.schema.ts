import { z } from 'zod';
export const FileCreateManyResultSchema = z.object({
  count: z.number()
});