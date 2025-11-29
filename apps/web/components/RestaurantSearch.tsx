'use client';

import { useState, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Popover from '@radix-ui/react-popover';
import { trpc } from '../lib/providers';
import { useSearchStore } from '../store/searchStore';

type RestaurantGroup = {
  id: number;
  name: string;
  normalizedScore: number | null;
  rawScore: number | null;
  locationCount: number;
  locations: Array<{
    id: number;
    name: string;
    address: string | null;
    city: string | null;
    state: string | null;
    latitude: number | null;
    longitude: number | null;
  }>;
};

type RestaurantSearchProps = {
  onSelectGroup: (groupId: number, locationId?: number) => void;
};

type SearchMode = 'restaurant' | 'dish';

export default function RestaurantSearch({
  onSelectGroup,
}: RestaurantSearchProps) {
  const [searchMode, setSearchMode] = useState<SearchMode>('restaurant');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { setSearchResults, clearSearchResults, setHasActiveSearch } =
    useSearchStore();

  // Restaurant group search query
  const { data: groupResults, isLoading: isLoadingGroups } =
    trpc.customRestaurantGroup.searchGroups.useQuery(
      {
        query: searchQuery,
        limit: 20,
      },
      {
        enabled: searchMode === 'restaurant' && searchQuery.length >= 2,
      }
    );

  // Dish search query
  const { data: dishResults, isLoading: isLoadingDishes } =
    trpc.customRestaurantGroup.getGroupsByDish.useQuery(
      {
        dishName: searchQuery,
        similarityThreshold: 0.3,
        limit: 20,
      },
      {
        enabled: searchMode === 'dish' && searchQuery.length >= 3,
      }
    );

  const handleSelectGroup = (group: RestaurantGroup) => {
    setSearchQuery('');
    setIsOpen(false);
    onSelectGroup(group.id);
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    const minLength = searchMode === 'dish' ? 3 : 2;
    setIsOpen(value.length >= minLength);

    if (value.length < minLength) {
      clearSearchResults();
    }
  };

  const isLoading =
    searchMode === 'restaurant' ? isLoadingGroups : isLoadingDishes;
  const results = searchMode === 'restaurant' ? groupResults : dishResults;
  const minQueryLength = searchMode === 'dish' ? 3 : 2;

  // Update store when results change
  useEffect(() => {
    const minLength = searchMode === 'dish' ? 3 : 2;

    if (searchQuery.length >= minLength) {
      // Active search - set hasActiveSearch to true regardless of results
      setHasActiveSearch(true);

      // Update results (could be empty array if no matches)
      if (results && results.length > 0) {
        setSearchResults(results as RestaurantGroup[]);
      } else {
        // No results found for this search
        setSearchResults([]);
      }
    } else {
      // No active search
      clearSearchResults();
    }
  }, [
    results,
    searchQuery,
    searchMode,
    setSearchResults,
    clearSearchResults,
    setHasActiveSearch,
  ]);

  return (
    <div className="w-full max-w-md bg-white/50 backdrop-blur-lg md:rounded-lg shadow-lg pb-4 px-2">
      <Tabs.Root
        value={searchMode}
        onValueChange={(value) => {
          setSearchMode(value as SearchMode);
          setSearchQuery('');
          setIsOpen(false);
          clearSearchResults();
        }}
      >
        <Tabs.List className="flex mb-2 border-b border-gray-200">
          <Tabs.Trigger
            value="restaurant"
            className="flex-1 px-4 py-2 text-sm font-medium border-b-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            By Restaurant
          </Tabs.Trigger>
          <Tabs.Trigger
            value="dish"
            className="flex-1 px-4 py-2 text-sm font-medium border-b-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            By Dish
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>

      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Anchor asChild>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() =>
                searchQuery.length >= minQueryLength && setIsOpen(true)
              }
              placeholder={
                searchMode === 'restaurant'
                  ? 'Search restaurants...'
                  : 'Search dishes (e.g., tacos, pizza)...'
              }
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
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
        </Popover.Anchor>

        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={4}
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-[var(--radix-popover-trigger-width)] bg-white/50 backdrop-blur-lg border border-gray-200/50 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50"
          >
            {isLoading ? (
              <div className="px-4 py-3 text-sm text-gray-700">
                Searching...
              </div>
            ) : results && results.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {searchMode === 'restaurant'
                  ? (results as typeof groupResults)?.map((group: any) => (
                      <li
                        key={group.id}
                        onClick={() =>
                          handleSelectGroup(group as RestaurantGroup)
                        }
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">
                              {group.name}
                            </div>
                            <div className="text-sm text-gray-700">
                              {group.locationCount} location
                              {group.locationCount !== 1 ? 's' : ''}
                            </div>
                          </div>
                          <div className="ml-3 flex-shrink-0">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                group.normalizedScore !== null
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {group.normalizedScore !== null
                                ? group.normalizedScore.toFixed(1)
                                : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))
                  : (results as NonNullable<typeof dishResults>)?.map(
                      (result: any) => (
                        <li
                          key={result.id}
                          onClick={() =>
                            handleSelectGroup(result as RestaurantGroup)
                          }
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">
                                {result.name}
                              </div>
                              <div className="text-sm text-gray-700">
                                {result.locationCount} location
                                {result.locationCount !== 1 ? 's' : ''}
                              </div>
                              <div className="text-sm text-blue-600 mt-1">
                                <span className="font-medium">Dishes:</span>{' '}
                                {result.dishMatches.join(', ')}
                              </div>
                              <div className="text-xs text-gray-600 mt-0.5">
                                {result.mentions} mention
                                {result.mentions !== 1 ? 's' : ''}
                                {result.avgSentiment !== null &&
                                  ` • Dish sentiment: ${(((result.avgSentiment + 1) / 2) * 10).toFixed(1)}`}
                                {result.normalizedScore !== null &&
                                  ` • Restaurant: ${result.normalizedScore.toFixed(1)}`}
                              </div>
                            </div>
                            <div className="ml-3 flex-shrink-0">
                              {result.compoundScore !== undefined && (
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    result.compoundScore >= 70
                                      ? 'bg-green-100 text-green-800'
                                      : result.compoundScore >= 50
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {result.compoundScore.toFixed(0)}%
                                </span>
                              )}
                            </div>
                          </div>
                        </li>
                      )
                    )}
              </ul>
            ) : searchQuery.length >= minQueryLength ? (
              <div className="px-4 py-3 text-sm text-gray-700">
                No {searchMode === 'restaurant' ? 'restaurants' : 'dishes'}{' '}
                found matching &quot;{searchQuery}&quot;
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-600">
                Type at least {minQueryLength} characters to search
              </div>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
