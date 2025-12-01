import { t } from "./helpers/createRouter";
import { postsRouter } from "./Post.router";
import { commentsRouter } from "./Comment.router";
import { filesRouter } from "./File.router";
import { restaurantgroupsRouter } from "./RestaurantGroup.router";
import { restaurantlocationsRouter } from "./RestaurantLocation.router";
import { batchjobsRouter } from "./BatchJob.router";
import { restaurantextractionsRouter } from "./RestaurantExtraction.router";
import { sentimentextractionsRouter } from "./SentimentExtraction.router";
import { googleplaceslookupsRouter } from "./GooglePlacesLookup.router";
import { scrapingsessionsRouter } from "./ScrapingSession.router";

    export const appRouter = t.router({
      post: postsRouter,
      comment: commentsRouter,
      file: filesRouter,
      restaurantgroup: restaurantgroupsRouter,
      restaurantlocation: restaurantlocationsRouter,
      batchjob: batchjobsRouter,
      restaurantextraction: restaurantextractionsRouter,
      sentimentextraction: sentimentextractionsRouter,
      googleplaceslookup: googleplaceslookupsRouter,
      scrapingsession: scrapingsessionsRouter})
    
