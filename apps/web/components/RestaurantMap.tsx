'use client';

import { trpc } from '../lib/providers';

export default function RestaurantMap() {
  // @ts-expect-error - Deep type instantiation from generated schemas
  const {
    data: restaurants,
    isLoading,
    error,
  } = trpc.restaurant.findManyRestaurant.useQuery({
    take: 100,
    orderBy: {
      normalizedScore: 'desc',
    },
  });

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Restaurants</h1>
      <div className="grid gap-4">
        {restaurants?.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-lg shadow p-6 border border-gray-200"
          >
            <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
            {restaurant.address && (
              <p className="text-gray-600 mb-2">{restaurant.address}</p>
            )}
            {restaurant.city && restaurant.state && (
              <p className="text-gray-600 mb-2">
                {restaurant.city}, {restaurant.state}
                {restaurant.zipCode && ` ${restaurant.zipCode}`}
              </p>
            )}
            <div className="flex gap-4 mt-4">
              {restaurant.normalizedScore !== null && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Score:</span>
                  <span
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      restaurant.normalizedScore >= 7
                        ? 'bg-green-100 text-green-800'
                        : restaurant.normalizedScore >= 5
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {restaurant.normalizedScore.toFixed(1)}/10
                  </span>
                </div>
              )}
              {restaurant.rawScore !== null && (
                <div className="text-sm text-gray-600">
                  Raw: {restaurant.rawScore.toFixed(2)}
                </div>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Source: {restaurant.source}
              {restaurant.googlePlaceId && ' • Google Places'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
