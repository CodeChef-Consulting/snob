'use client';

import { useState, useMemo, useCallback } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import Image from 'next/image';
import { trpc } from '../lib/providers';

interface RestaurantSidebarProps {
  groupId: number;
  selectedLocationId: number | null;
  onClose: () => void;
  onSelectLocation: (locationId: number) => void;
  onSelectGroup?: (groupId: number) => void;
}

// Smooth color gradient from red (0) → yellow (5) → green (10)
const getScoreColor = (score: number): string => {
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

// Truncate text to 150 characters for fair use
const getExcerpt = (text: string): string => {
  if (!text) return '';
  if (text.length <= 150) return text;

  const truncated = text.slice(0, 150);
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.slice(0, lastSpace > 0 ? lastSpace : 150) + '...';
};

export default function RestaurantSidebar({
  groupId,
  selectedLocationId,
  onClose,
  onSelectLocation,
  onSelectGroup,
}: RestaurantSidebarProps) {
  const [activeTab, setActiveTab] = useState('locations');
  const [dishFilter, setDishFilter] = useState('');
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  // Always fetch group details (needed for header)
  const { data: group, isLoading: isLoadingGroup } =
    trpc.customRestaurantGroup.getGroupById.useQuery({ id: groupId });

  // Conditionally fetch data based on active tab
  const { data: dishes, isLoading: isLoadingDishes } =
    trpc.customRestaurantGroup.getGroupDishes.useQuery(
      { id: groupId },
      { enabled: activeTab === 'dishes' }
    );

  const {
    data: mentions,
    isLoading: isLoadingMentions,
    refetch: refetchMentions,
  } = trpc.customRestaurantGroup.getGroupMentions.useQuery(
    { id: groupId },
    { enabled: activeTab === 'mentions' }
  );

  const { data: gallery, isLoading: isLoadingGallery } =
    trpc.customRestaurantGroup.getGroupGallery.useQuery(
      { id: groupId },
      { enabled: activeTab === 'gallery' }
    );

  const unlinkPostMutation =
    trpc.customRestaurantGroup.unlinkPostFromGroup.useMutation({
      onSuccess: () => {
        refetchMentions();
      },
    });

  const unlinkCommentMutation =
    trpc.customRestaurantGroup.unlinkCommentFromGroup.useMutation({
      onSuccess: () => {
        refetchMentions();
      },
    });

  const handleUnlink = useCallback(
    (mentionId: string, type: 'post' | 'comment') => {
      const idStr = mentionId.replace(`${type}-`, '');
      const id = parseInt(idStr, 10);
      if (isNaN(id)) return;

      if (type === 'post') {
        unlinkPostMutation.mutate({ postId: id, groupId });
      } else {
        unlinkCommentMutation.mutate({ commentId: id, groupId });
      }
    },
    [groupId, unlinkPostMutation, unlinkCommentMutation]
  );

  // Filter dishes client-side
  const filteredDishes = useMemo(() => {
    if (!dishes) return [];
    if (!dishFilter.trim()) return dishes;
    const lowerFilter = dishFilter.toLowerCase();
    return dishes.filter((dish) => dish.toLowerCase().includes(lowerFilter));
  }, [dishes, dishFilter]);

  if (isLoadingGroup) {
    return (
      <div className="bg-white/50 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 mb-4 float-right"
          >
            ✕
          </button>
          <div className="text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="bg-white/50 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 mb-4 float-right"
          >
            ✕
          </button>
          <div className="text-red-700">Group not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/50 backdrop-blur-lg md:rounded-lg shadow-lg overflow-hidden flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-240px)]">
      <div className="flex-shrink-0 border-b p-3 md:p-4">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 mb-2 float-right text-xl md:text-base"
        >
          ✕
        </button>

        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 pr-8">
          {group.name}
        </h2>

        {group.normalizedScore !== null &&
          group.normalizedScore !== undefined && (
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium text-white"
                style={{
                  backgroundColor: getScoreColor(group.normalizedScore),
                }}
              >
                {group.normalizedScore.toFixed(1)}/10
              </span>
              {(() => {
                const locations = group.locations as any[];
                const selectedLocation = selectedLocationId
                  ? locations.find((loc) => loc.id === selectedLocationId)
                  : null;
                const locationWithPlaceId = selectedLocation?.googlePlaceId
                  ? selectedLocation
                  : locations.find((loc) => !!loc.googlePlaceId);

                return locationWithPlaceId?.googlePlaceId ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${locationWithPlaceId.googlePlaceId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 md:gap-1.5 pl-1.5 md:pl-2 pr-2 md:pr-3 py-1 rounded bg-blue-500 hover:bg-blue-600 transition-colors text-white text-xs md:text-sm font-medium"
                  >
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    Google Maps
                  </a>
                ) : null;
              })()}
            </div>
          )}
      </div>

      <Tabs.Root
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <Tabs.List className="flex border-b border-gray-200 px-2 md:px-4 flex-shrink-0 overflow-x-auto">
          <Tabs.Trigger
            value="locations"
            className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium border-b-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-600 hover:text-gray-900 whitespace-nowrap"
          >
            Locations
          </Tabs.Trigger>
          <Tabs.Trigger
            value="dishes"
            className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium border-b-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-600 hover:text-gray-900 whitespace-nowrap"
          >
            Dishes
          </Tabs.Trigger>
          <Tabs.Trigger
            value="gallery"
            className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium border-b-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-600 hover:text-gray-900 whitespace-nowrap"
          >
            Gallery
          </Tabs.Trigger>
          <Tabs.Trigger
            value="mentions"
            className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium border-b-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-600 hover:text-gray-900 whitespace-nowrap"
          >
            Discussion
          </Tabs.Trigger>
        </Tabs.List>

        <div className="flex-1 overflow-y-auto p-3 md:p-4">
          <Tabs.Content value="locations">
            {group.locations.length > 0 ? (
              <div className="space-y-2">
                {group.locations.map((location: any) => (
                  <button
                    key={location.id}
                    onClick={() => onSelectLocation(location.id)}
                    className={`w-full text-left px-2 md:px-3 py-2 rounded-lg border transition-colors ${
                      selectedLocationId === location.id
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-xs md:text-sm text-gray-900">
                      {location.name}
                    </div>
                    {location.address && (
                      <div className="text-xs text-gray-700 mt-1">
                        {location.address}
                        {location.city && `, ${location.city}`}
                        {location.state && `, ${location.state}`}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-700">No locations found</p>
            )}
          </Tabs.Content>

          <Tabs.Content value="dishes">
            {isLoadingDishes ? (
              <div className="text-sm text-gray-700">Loading dishes...</div>
            ) : dishes && dishes.length > 0 ? (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Filter dishes..."
                  value={dishFilter}
                  onChange={(e) => setDishFilter(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {filteredDishes.map((dish, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 md:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
                {filteredDishes.length === 0 && dishFilter && (
                  <p className="text-sm text-gray-600">No matching dishes</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-700">No dishes found</p>
            )}
          </Tabs.Content>

          <Tabs.Content value="gallery">
            {isLoadingGallery ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2">
                {[...Array(9)].map((_, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-lg bg-gray-200 animate-pulse"
                  />
                ))}
              </div>
            ) : gallery && gallery.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2">
                {gallery
                  .filter((file) => !failedImages.has(file.id))
                  .map((file) => (
                    <a
                      key={file.id}
                      href={
                        file.permalink
                          ? `https://reddit.com${file.permalink}`
                          : file.fileUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 hover:ring-2 hover:ring-blue-500 transition-all"
                    >
                      <Image
                        src={file.fileUrl}
                        alt="Restaurant media"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2UyZThlZiIvPjwvc3ZnPg=="
                        onError={() => {
                          setFailedImages((prev) => new Set(prev).add(file.id));
                        }}
                      />
                    </a>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-gray-700">No images found</p>
            )}
          </Tabs.Content>

          <Tabs.Content value="mentions">
            {isLoadingMentions ? (
              <div className="text-sm text-gray-700">Loading mentions...</div>
            ) : mentions && mentions.length > 0 ? (
              <div className="space-y-3 md:space-y-4">
                {mentions.map((mention: any) => (
                  <div
                    key={mention.id}
                    className="border rounded-lg p-3 md:p-4 hover:bg-gray-50 transition overflow-hidden relative"
                  >
                    {mention.sentiment !== null &&
                      mention.sentiment !== undefined && (
                        <div
                          className="absolute top-2 right-2 text-lg md:text-xl"
                          title={`Sentiment: ${mention.sentiment.toFixed(2)}`}
                        >
                          {mention.sentiment > 0.25
                            ? '😊'
                            : mention.sentiment < -0.25
                              ? '😞'
                              : '😐'}
                        </div>
                      )}
                    {mention.type === 'comment' && mention.postTitle && (
                      <div className="text-xs text-gray-600 mb-2 truncate pr-8 md:pr-10">
                        {mention.postTitle}
                      </div>
                    )}

                    <a
                      href={
                        mention.permalink
                          ? `https://reddit.com${mention.permalink}`
                          : undefined
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block cursor-pointer"
                    >
                      <blockquote className="text-xs md:text-sm text-gray-800 mb-2 italic break-words">
                        &ldquo;{getExcerpt(mention.body)}&rdquo;
                      </blockquote>
                    </a>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="px-2 py-0.5 bg-gray-100 rounded flex-shrink-0">
                          {mention.type}
                        </span>
                        {mention.author && (
                          <span className="truncate">
                            by u/{mention.author}
                          </span>
                        )}
                        {mention.score !== null && (
                          <span className="flex-shrink-0">
                            • {mention.score} points
                          </span>
                        )}
                      </div>
                      {process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnlink(mention.id, mention.type);
                          }}
                          disabled={
                            unlinkPostMutation.isPending ||
                            unlinkCommentMutation.isPending
                          }
                          className="flex-shrink-0 px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                          title="Remove this mention link"
                        >
                          Unlink
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-700">No mentions found</p>
            )}
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}
