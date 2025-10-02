import { appRouter } from './generated/trpc/routers';
import { createContext } from './context';

// Example usage
async function main() {
  const ctx = createContext();

  // Create a caller to test the API
  const caller = appRouter.createCaller(ctx);

  // Example: Find first post
  const post = await caller.post.findFirstPost({});
  console.log('Post:', post);
}

// Export the router and types for client use
export { appRouter } from './generated/trpc/routers';
export type { Context } from './context';

main().catch(console.error);
