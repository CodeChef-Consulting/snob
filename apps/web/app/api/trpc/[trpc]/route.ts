import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import combinedRouter from '@/server';
import { createContext } from '@/server/context';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: combinedRouter,
    createContext,
  });

export { handler as GET, handler as POST };
