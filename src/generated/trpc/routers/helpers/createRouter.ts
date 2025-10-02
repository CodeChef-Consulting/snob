import * as trpc from "@trpc/server";

  import type { Context } from '../../../../../../../../src/context';

  export type { Context } from '../../../../../../../../src/context';

      import trpcOptions from '../../../../../../../../src/trpcOptions';

  export const t = trpc.initTRPC.context<Context>().create(trpcOptions);

    export const globalMiddleware = t.middleware(async ({ ctx, next }) => {
      // Add your middleware logic here
      return next()
    });

    export const publicProcedure = t.procedure;

  export const protectedProcedure = t.procedure

      .use(globalMiddleware)
      
       
  
    
  
  
