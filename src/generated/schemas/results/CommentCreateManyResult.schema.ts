import { z } from 'zod';
export const CommentCreateManyResultSchema = z.object({
  count: z.number()
});