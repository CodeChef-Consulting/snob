'use client';

import { trpc } from '../lib/providers';
import GoogleMapReact from 'google-map-react';
import { useState } from 'react';

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

// Smooth color gradient from red (0) → yellow (5) → green (10)
const getScoreColor = (score: number): string => {
  // Clamp score to 0-10 range
  const clampedScore = Math.max(0, Math.min(10, score));

  if (clampedScore < 5) {
    // Red to Yellow (0-5)
    const ratio = clampedScore / 5;
    const r = 220; // Keep red high
    const g = Math.round(38 + (202 - 38) * ratio); // 38 → 202
    const b = Math.round(38 - 38 * ratio); // 38 → 0
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Yellow to Green (5-10)
    const ratio = (clampedScore - 5) / 5;
    const r = Math.round(202 - (202 - 22) * ratio); // 202 → 22
    const g = Math.round(138 + (163 - 138) * ratio); // 138 → 163
    const b = Math.round(4 + (74 - 4) * ratio); // 4 → 74
    return `rgb(${r}, ${g}, ${b})`;
  }
};

const Marker = ({ restaurant, onClick }: MarkerProps) => {
  const score = restaurant.normalizedScore ?? 0;
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
        {score.toFixed(1)}
      </div>
      <div
        className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent mx-auto"
        style={{ borderTopColor: color }}
      />
    </div>
  );
};

export default function RestaurantMap() {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

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

  // Filter restaurants with valid coordinates
  const validRestaurants =
    restaurants?.filter((r) => r.latitude !== null && r.longitude !== null) ??
    [];

  // Default to Los Angeles
  const defaultCenter = { lat: 34.0522, lng: -118.2437 };
  const defaultZoom = 11;

  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Restaurant Map</h1>
        <p className="text-sm text-gray-600">
          {validRestaurants.length} restaurants with coordinates
        </p>
      </div>

      <div className="flex-1 flex">
        {/* Map */}
        <div className="flex-1">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
            }}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            onClick={() => setSelectedRestaurant(null)}
          >
            {validRestaurants.map((restaurant) => (
              <Marker
                key={restaurant.id}
                lat={restaurant.latitude!}
                lng={restaurant.longitude!}
                restaurant={restaurant}
                onClick={() => setSelectedRestaurant(restaurant)}
              />
            ))}
          </GoogleMapReact>
        </div>

        {/* Sidebar */}
        {selectedRestaurant && (
          <div className="w-96 bg-white border-l overflow-y-auto p-6">
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="text-gray-500 hover:text-gray-700 mb-4"
            >
              ✕ Close
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {selectedRestaurant.name}
            </h2>

            {selectedRestaurant.address && (
              <p className="text-gray-600 mb-2">{selectedRestaurant.address}</p>
            )}
            {selectedRestaurant.city && selectedRestaurant.state && (
              <p className="text-gray-600 mb-4">
                {selectedRestaurant.city}, {selectedRestaurant.state}
                {selectedRestaurant.zipCode && ` ${selectedRestaurant.zipCode}`}
              </p>
            )}

            {selectedRestaurant.normalizedScore !== null && (
              <div className="mb-4">
                <span className="font-semibold text-sm">Score:</span>
                <span
                  className="ml-2 px-3 py-1 rounded text-sm font-medium text-white"
                  style={{
                    backgroundColor: getScoreColor(
                      selectedRestaurant.normalizedScore
                    ),
                  }}
                >
                  {selectedRestaurant.normalizedScore.toFixed(1)}/10
                </span>
              </div>
            )}

            {selectedRestaurant.rawScore !== null && (
              <p className="text-sm text-gray-600 mb-4">
                Raw Score: {selectedRestaurant.rawScore.toFixed(2)}
              </p>
            )}

            <p className="text-sm text-gray-500">
              Source: {selectedRestaurant.source}
              {selectedRestaurant.googlePlaceId && ' • Google Places'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
