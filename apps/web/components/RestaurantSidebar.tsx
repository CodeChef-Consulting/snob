'use client';

import { useState, useMemo, useCallback } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
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
  const [similarFilter, setSimilarFilter] = useState('');

  // Always fetch group details (needed for header)
  const { data: group, isLoading: isLoadingGroup } =
    trpc.customRestaurantGroup.getGroupById.useQuery({ id: groupId });

  // Conditionally fetch data based on active tab
  const { data: dishes, isLoading: isLoadingDishes } =
    trpc.customRestaurantGroup.getGroupDishes.useQuery(
      { id: groupId },
      { enabled: activeTab === 'dishes' }
    );

  const { data: mentionedAlongside, isLoading: isLoadingAlongside } =
    trpc.customRestaurantGroup.getGroupsMentionedAlongside.useQuery(
      { id: groupId },
      { enabled: activeTab === 'alongside' }
    );

  const {
    data: mentions,
    isLoading: isLoadingMentions,
    refetch: refetchMentions,
  } = trpc.customRestaurantGroup.getGroupMentions.useQuery(
    { id: groupId },
    { enabled: activeTab === 'mentions' }
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

  // Filter similar restaurants client-side
  const filteredSimilar = useMemo(() => {
    if (!mentionedAlongside) return [];
    if (!similarFilter.trim()) return mentionedAlongside;
    const lowerFilter = similarFilter.toLowerCase();
    return mentionedAlongside.filter((group) =>
      group.name.toLowerCase().includes(lowerFilter)
    );
  }, [mentionedAlongside, similarFilter]);

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
    <div className="bg-white/50 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden flex flex-col h-[calc(100vh-180px)]">
      <div className="flex-shrink-0 border-b p-4">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 mb-2 float-right"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">{group.name}</h2>

        {group.normalizedScore !== null &&
          group.normalizedScore !== undefined && (
            <div>
              <span
                className="px-3 py-1 rounded text-sm font-medium text-white"
                style={{
                  backgroundColor: getScoreColor(group.normalizedScore),
                }}
              >
                {group.normalizedScore.toFixed(1)}/10
              </span>
            </div>
          )}
      </div>

      <Tabs.Root
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <Tabs.List className="flex border-b border-gray-200 px-4 flex-shrink-0">
          <Tabs.Trigger
            value="locations"
            className="px-4 py-3 text-sm font-medium border-b-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-600 hover:text-gray-900"
          >
            Locations
          </Tabs.Trigger>
          <Tabs.Trigger
            value="dishes"
            className="px-4 py-3 text-sm font-medium border-b-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-600 hover:text-gray-900"
          >
            Dishes
          </Tabs.Trigger>
          <Tabs.Trigger
            value="alongside"
            className="px-4 py-3 text-sm font-medium border-b-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-600 hover:text-gray-900"
          >
            Similar
          </Tabs.Trigger>
          <Tabs.Trigger
            value="mentions"
            className="px-4 py-3 text-sm font-medium border-b-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-600 hover:text-gray-900"
          >
            Discussion
          </Tabs.Trigger>
        </Tabs.List>

        <div className="flex-1 overflow-y-auto p-4">
          <Tabs.Content value="locations">
            {group.locations.length > 0 ? (
              <div className="space-y-2">
                {group.locations.map((location: any) => (
                  <button
                    key={location.id}
                    onClick={() => onSelectLocation(location.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                      selectedLocationId === location.id
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900">
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
                <div className="flex flex-wrap gap-2">
                  {filteredDishes.map((dish, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
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

          <Tabs.Content value="alongside">
            {isLoadingAlongside ? (
              <div className="text-sm text-gray-700">
                Loading related restaurants...
              </div>
            ) : mentionedAlongside && mentionedAlongside.length > 0 ? (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Filter restaurants..."
                  value={similarFilter}
                  onChange={(e) => setSimilarFilter(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-2">
                  {filteredSimilar.map((coGroup) => (
                    <button
                      key={coGroup.id}
                      onClick={() => onSelectGroup?.(coGroup.id)}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors cursor-pointer"
                      title={`${coGroup.count} co-mention${coGroup.count !== 1 ? 's' : ''}`}
                    >
                      {coGroup.name} ({coGroup.count})
                    </button>
                  ))}
                </div>
                {filteredSimilar.length === 0 && similarFilter && (
                  <p className="text-sm text-gray-600">
                    No matching restaurants
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-700">
                No related restaurants found
              </p>
            )}
          </Tabs.Content>

          <Tabs.Content value="mentions">
            {isLoadingMentions ? (
              <div className="text-sm text-gray-700">Loading mentions...</div>
            ) : mentions && mentions.length > 0 ? (
              <div className="space-y-4">
                {mentions.map((mention: any) => (
                  <div
                    key={mention.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition overflow-hidden"
                  >
                    {mention.type === 'comment' && mention.postTitle && (
                      <div className="text-xs text-gray-600 mb-2 truncate">
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
                      <blockquote className="text-sm text-gray-800 mb-2 italic break-words">
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
