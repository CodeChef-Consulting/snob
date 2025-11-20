'use client';

import { trpc } from '../lib/providers';
import GoogleMapReact from 'google-map-react';
import { useState, useRef } from 'react';
import RestaurantSidebar from './RestaurantSidebar';
import RestaurantSearch from './RestaurantSearch';
import { useSearchStore } from '../store/searchStore';

type Restaurant = {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  latitude: number | null;
  longitude: number | null;
  source: string;
  googlePlaceId: string | null;
  normalizedScore: number | null;
  rawScore: number | null;
};

type MarkerProps = {
  lat: number;
  lng: number;
  restaurant: Restaurant;
  onClick: () => void;
};

// Smooth color gradient from red (0) → yellow (5) → green (10), or gray for no score
const getScoreColor = (score: number | null): string => {
  if (score === null) {
    return 'rgb(156, 163, 175)'; // gray-400
  }

  const clampedScore = Math.max(0, Math.min(10, score));

  if (clampedScore < 5) {
    // Red to Yellow (0-5)
    const ratio = clampedScore / 5;
    const r = 220;
    const g = Math.round(38 + (202 - 38) * ratio);
    const b = Math.round(38 - 38 * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Yellow to Green (5-10)
    const ratio = (clampedScore - 5) / 5;
    const r = Math.round(202 - (202 - 22) * ratio);
    const g = Math.round(138 + (163 - 138) * ratio);
    const b = Math.round(4 + (74 - 4) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  }
};

const Marker = ({ restaurant, onClick }: MarkerProps) => {
  const score = restaurant.normalizedScore;
  const color = getScoreColor(score);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer transform -translate-x-1/2 -translate-y-full"
      style={{ position: 'absolute' }}
    >
      <div
        className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
        style={{ backgroundColor: color }}
      >
        {score !== null ? score.toFixed(1) : '?'}
      </div>
      <div
        className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent mx-auto"
        style={{ borderTopColor: color }}
      />
    </div>
  );
};

export default function RestaurantMap() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);
  const [additionalRestaurants, setAdditionalRestaurants] = useState<Restaurant[]>([]);
  const mapRef = useRef<any>(null);

  const { searchResults, hasActiveSearch } = useSearchStore();

  const {
    data: restaurants,
    isLoading,
    error,
  } = trpc.restaurant.findManyRestaurant.useQuery({
    orderBy: {
      normalizedScore: 'desc',
    },
    where: {
      normalizedScore: {
        not: null,
        gt: 8,
      },
      latitude: {
        not: null,
      },
      longitude: {
        not: null,
      },
    },
  }) as {
    data: Restaurant[] | undefined;
    isLoading: boolean;
    error: any;
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl text-gray-700">Loading restaurants...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl text-red-600">
          Error loading restaurants: {error.message}
        </div>
      </div>
    );
  }

  const validRestaurants =
    restaurants?.filter((r) => r.latitude !== null && r.longitude !== null) ?? [];

  // Convert search results to Restaurant type
  const searchResultRestaurants: Restaurant[] = searchResults
    .filter((r) => r.latitude !== null && r.longitude !== null)
    .map((r) => ({
      id: String(r.id),
      name: r.name,
      address: r.address,
      city: r.city,
      state: r.state,
      zipCode: null,
      latitude: r.latitude!,
      longitude: r.longitude!,
      source: 'search',
      googlePlaceId: null,
      normalizedScore: r.normalizedScore,
      rawScore: null,
    }));

  // If there's an active search, show only search results; otherwise show default restaurants
  const allRestaurants = hasActiveSearch
    ? searchResultRestaurants
    : [...validRestaurants, ...additionalRestaurants];

  const handleSelectRestaurant = (restaurant: { id: number; name: string; address: string | null; city: string | null; state: string | null; latitude: number | null; longitude: number | null; normalizedScore: number | null }) => {
    // Check if restaurant is already in the list
    const existingRestaurant = validRestaurants.find(r => Number(r.id) === restaurant.id);

    if (!existingRestaurant && restaurant.latitude && restaurant.longitude) {
      // Add to additional restaurants list with proper typing
      const newRestaurant: Restaurant = {
        id: String(restaurant.id),
        name: restaurant.name,
        address: restaurant.address,
        city: restaurant.city,
        state: restaurant.state,
        zipCode: null,
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        source: 'search',
        googlePlaceId: null,
        normalizedScore: restaurant.normalizedScore,
        rawScore: null,
      };
      setAdditionalRestaurants(prev => [...prev, newRestaurant]);
    }

    // Pan to restaurant location and zoom in
    if (restaurant.latitude && restaurant.longitude && mapRef.current) {
      mapRef.current.panTo({ lat: restaurant.latitude, lng: restaurant.longitude });
      mapRef.current.setZoom(15);
    }

    // Select the restaurant
    setSelectedRestaurantId(restaurant.id);
  };

  const defaultCenter = { lat: 34.0522, lng: -118.2437 };
  const defaultZoom = 11;

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Restaurant Map</h1>
            <p className="text-sm text-gray-600">
              {hasActiveSearch
                ? `${searchResultRestaurants.length} search results`
                : `${validRestaurants.length} restaurants with coordinates`}
            </p>
          </div>
          <RestaurantSearch onSelectRestaurant={handleSelectRestaurant} />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Map */}
        <div className="flex-1">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
            }}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            onClick={() => setSelectedRestaurantId(null)}
            onGoogleApiLoaded={({ map }) => {
              mapRef.current = map;
            }}
            yesIWantToUseGoogleMapApiInternals
          >
            {allRestaurants.map((restaurant) => (
              <Marker
                key={restaurant.id}
                lat={restaurant.latitude!}
                lng={restaurant.longitude!}
                restaurant={restaurant}
                onClick={() => setSelectedRestaurantId(Number(restaurant.id))}
              />
            ))}
          </GoogleMapReact>
        </div>

        {/* Sidebar */}
        {selectedRestaurantId && (() => {
          const selectedRestaurant = allRestaurants.find(r => Number(r.id) === selectedRestaurantId);
          if (!selectedRestaurant) return null;

          return (
            <RestaurantSidebar
              restaurantId={selectedRestaurantId}
              restaurantName={selectedRestaurant.name}
              address={selectedRestaurant.address}
              city={selectedRestaurant.city}
              state={selectedRestaurant.state}
              zipCode={selectedRestaurant.zipCode}
              normalizedScore={selectedRestaurant.normalizedScore}
              rawScore={selectedRestaurant.rawScore}
              source={selectedRestaurant.source}
              googlePlaceId={selectedRestaurant.googlePlaceId}
              onClose={() => setSelectedRestaurantId(null)}
            />
          );
        })()}
      </div>
    </div>
  );
}
