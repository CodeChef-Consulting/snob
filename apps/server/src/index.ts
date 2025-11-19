import { appRouter } from './generated/routers';
import { t } from './generated/routers/helpers/createRouter';
import { commentRouter } from './comment';
import { fileRouter } from './file';
import { postRouter } from './post';
import { restaurantRouter } from './restaurant';

//merge with generated router
const combinedRouter = t.mergeRouters(
  appRouter,
  t.router({
    customComment: commentRouter,
    customFile: fileRouter,
    customPost: postRouter,
    customRestaurant: restaurantRouter,
  })
);

export type CombinedRouter = typeof combinedRouter;

export default combinedRouter;
