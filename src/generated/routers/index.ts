import { t } from "./helpers/createRouter";
import { postsRouter } from "./Post.router";
import { commentsRouter } from "./Comment.router";
import { filesRouter } from "./File.router";
import { restaurantsRouter } from "./Restaurant.router";
import { batchjobsRouter } from "./BatchJob.router";
import { restaurantextractionsRouter } from "./RestaurantExtraction.router";
import { scrapingsessionsRouter } from "./ScrapingSession.router";

    export const appRouter = t.router({
      post: postsRouter,
      comment: commentsRouter,
      file: filesRouter,
      restaurant: restaurantsRouter,
      batchjob: batchjobsRouter,
      restaurantextraction: restaurantextractionsRouter,
      scrapingsession: scrapingsessionsRouter})
    
