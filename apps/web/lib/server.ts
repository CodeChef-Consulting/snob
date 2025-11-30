import 'server-only';

import combinedRouter from '@/server';
import { createContext } from '@/server/context';

/**
 * Server-side tRPC caller
 * This directly invokes tRPC procedures on the server without HTTP overhead
 */
export const serverClient = combinedRouter.createCaller(createContext());
