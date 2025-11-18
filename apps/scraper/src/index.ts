import combinedRouter from '@repo/server';
import { createContext } from '@repo/server/src/context';

// Example usage
async function main() {
  const ctx = createContext();

  // Create a caller to test the API
  const caller = combinedRouter.createCaller(ctx);

  // Example: Find first post
  const post = await caller.post.findFirstPost({});
  console.log('Post:', post);
}

// Export the router and types for client use
export default combinedRouter;
export type { Context } from '@repo/server/src/context';

main().catch(console.error);
