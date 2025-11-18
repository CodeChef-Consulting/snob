import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { CombinedRouter } from '@repo/server';

export const trpc = createTRPCClient<CombinedRouter>({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_TRPC_URL || 'http://localhost:3001/trpc',
    }),
  ],
});
