import { appRouter } from '@repo/db/generated/routers';
import { t } from '@repo/db/generated/routers/helpers/createRouter';
import { commentRouter } from './comment';
import { fileRouter } from './file';
import { postRouter } from './post';

//merge with generated router
const combinedRouter = t.mergeRouters(
  appRouter,
  t.router({
    customComment: commentRouter,
    customFile: fileRouter,
    customPost: postRouter,
  })
);

export type CombinedRouter = typeof combinedRouter;

export default combinedRouter;
