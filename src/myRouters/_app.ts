import { router } from '../server/trpc';
import { postRouter } from './post';
import { commentRouter } from './comment';
import { fileRouter } from './file';

export const appRouter = router({
  post: postRouter,
  comment: commentRouter,
  file: fileRouter,
});

export type AppRouter = typeof appRouter;
