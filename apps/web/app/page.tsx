import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrateClient } from '@/lib/hydrate';
import { serverClient } from '@/lib/server';
import MapWrapper from './_components/MapWrapper';

export default async function Home() {
  const queryClient = new QueryClient();

  // Prefetch the restaurant groups on the server
  await queryClient.prefetchQuery({
    queryKey: [
      ['customRestaurantGroup', 'getHighScoringGroups'],
      { input: { minScore: 8, limit: 500 }, type: 'query' },
    ],
    queryFn: () =>
      serverClient.customRestaurantGroup.getHighScoringGroups({
        minScore: 8,
        limit: 500,
      }),
  });

  return (
    <HydrateClient state={dehydrate(queryClient)}>
      <MapWrapper />
    </HydrateClient>
  );
}
