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
    <>
      {/* SEO-friendly semantic content - hidden but accessible to search engines */}
      <div className="sr-only">
        <h1>Best Restaurants in Los Angeles - AI-Powered Reviews & Ratings</h1>
        <p>
          Discover the best restaurants in Los Angeles with our AI-powered rating system.
          We analyze thousands of authentic Reddit reviews to bring you unbiased restaurant
          recommendations across all LA neighborhoods.
        </p>
        <h2>How We Rate LA Restaurants</h2>
        <p>
          Our foodie-simulated rating system reads and analyzes qualitative posts, comments,
          and reviews from Reddit to provide data-driven restaurant ratings. Unlike traditional
          5-star systems, we focus on genuine community insights to help you find the best
          places to eat in Los Angeles.
        </p>
        <h2>Popular Los Angeles Restaurant Searches</h2>
        <ul>
          <li>Best restaurants in Downtown LA</li>
          <li>Top-rated restaurants in Santa Monica</li>
          <li>Best food in West Hollywood</li>
          <li>Hidden gem restaurants in Silver Lake</li>
          <li>Top restaurants in Venice Beach</li>
          <li>Best dining in Pasadena</li>
          <li>LA restaurant recommendations by neighborhood</li>
        </ul>
        <h2>Why Use AI-Powered Restaurant Reviews?</h2>
        <p>
          Traditional restaurant ratings often suffer from bias and manipulation. Our AI
          system scours Reddit thoroughly, reading all qualitative reviews, gauging the
          merit of each comment by weighing recency, visibility, and controversy. This
          approach captures every nuance and signal at superhuman scale, giving you the
          most authentic restaurant recommendations in Los Angeles.
        </p>
      </div>

      <HydrateClient state={dehydrate(queryClient)}>
        <MapWrapper />
      </HydrateClient>
    </>
  );
}
