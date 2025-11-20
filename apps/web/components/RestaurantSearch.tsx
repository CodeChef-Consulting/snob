'use client';

import { useState, useEffect, useRef } from 'react';
import { trpc } from '../lib/providers';

type Restaurant = {
  id: number;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  normalizedScore: number | null;
};

type RestaurantSearchProps = {
  onSelectRestaurant: (restaurant: Restaurant) => void;
};

export default function RestaurantSearch({ onSelectRestaurant }: RestaurantSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { data: searchResults, isLoading } = trpc.restaurant.findManyRestaurant.useQuery(
    {
      where: {
        name: {
          contains: searchQuery,
          mode: 'insensitive',
        },
        latitude: { not: null },
        longitude: { not: null },
      },
      orderBy: [
        {
          normalizedScore: {
            sort: 'desc',
            nulls: 'last',
          },
        },
      ],
      take: 10,
    },
    {
      enabled: searchQuery.length >= 2, // Only search if 2+ characters
    }
  );

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSearchQuery('');
    setIsOpen(false);
    onSelectRestaurant(restaurant);
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    setIsOpen(value.length >= 2);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => searchQuery.length >= 2 && setIsOpen(true)}
          placeholder="Search restaurants..."
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
          ) : searchResults && searchResults.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {searchResults.map((restaurant) => (
                <li
                  key={restaurant.id}
                  onClick={() => handleSelectRestaurant(restaurant as Restaurant)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {restaurant.name}
                      </div>
                      {restaurant.address && (
                        <div className="text-sm text-gray-500 truncate">
                          {restaurant.address}
                          {restaurant.city && `, ${restaurant.city}`}
                          {restaurant.state && `, ${restaurant.state}`}
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          restaurant.normalizedScore !== null
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {restaurant.normalizedScore !== null
                          ? restaurant.normalizedScore.toFixed(1)
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : searchQuery.length >= 2 ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No restaurants found matching &quot;{searchQuery}&quot;
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
