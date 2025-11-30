'use client';

import dynamic from 'next/dynamic';

// Dynamically import RestaurantMap with SSR disabled
// This prevents hydration mismatches from Google Maps DOM manipulation
const RestaurantMap = dynamic(
  () => import('../../components/RestaurantMap'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl text-gray-900">Loading map...</div>
      </div>
    ),
  }
);

export default function MapWrapper() {
  return <RestaurantMap />;
}
