'use client';

import { trpc } from '../lib/providers';

interface RestaurantSidebarProps {
  groupId: number;
  selectedLocationId: number | null;
  onClose: () => void;
  onSelectLocation: (locationId: number) => void;
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
}: RestaurantSidebarProps) {
  // Fetch group details with all locations
  const { data: group, isLoading: isLoadingGroup } =
    trpc.customRestaurantGroup.getGroupById.useQuery({ id: groupId });

  // Fetch restaurant dishes
  const { data: dishes, isLoading: isLoadingDishes } =
    trpc.customRestaurantGroup.getGroupDishes.useQuery({ id: groupId });

  // Fetch restaurant mentions
  const { data: mentions, isLoading: isLoadingMentions } =
    trpc.customRestaurantGroup.getGroupMentions.useQuery({ id: groupId });

  if (isLoadingGroup) {
    return (
      <div className="w-96 bg-white border-l flex flex-col h-full">
        <div className="flex-shrink-0 bg-white border-b p-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 mb-4"
          >
            ✕ Close
          </button>
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="w-96 bg-white border-l flex flex-col h-full">
        <div className="flex-shrink-0 bg-white border-b p-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 mb-4"
          >
            ✕ Close
          </button>
          <div className="text-red-500">Group not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 bg-white border-l flex flex-col h-full">
      <div className="flex-shrink-0 bg-white border-b p-6">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 mb-4"
        >
          ✕ Close
        </button>

        <h2 className="text-2xl font-bold mb-2">{group.name}</h2>

        <p className="text-sm text-gray-600 mb-4">
          {group.locationCount} location{group.locationCount !== 1 ? 's' : ''}
        </p>

        {group.normalizedScore !== null && group.normalizedScore !== undefined && (
          <div className="mb-4">
            <span className="font-semibold text-sm">Score:</span>
            <span
              className="ml-2 px-3 py-1 rounded text-sm font-medium text-white"
              style={{
                backgroundColor: getScoreColor(group.normalizedScore),
              }}
            >
              {group.normalizedScore.toFixed(1)}/10
            </span>
          </div>
        )}

        {group.rawScore !== null && group.rawScore !== undefined && (
          <p className="text-sm text-gray-600 mb-4">
            Raw Score: {group.rawScore.toFixed(2)}
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Locations List */}
        {group.locations.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-3">
              Locations ({group.locations.length})
            </h3>
            <div className="space-y-2">
              {group.locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => onSelectLocation(location.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                    selectedLocationId === location.id
                      ? 'bg-blue-50 border-blue-500'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-sm">{location.name}</div>
                  {location.address && (
                    <div className="text-xs text-gray-600 mt-1">
                      {location.address}
                      {location.city && `, ${location.city}`}
                      {location.state && `, ${location.state}`}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dishes Mentioned */}
        {isLoadingDishes ? (
          <div className="text-sm text-gray-500 mb-6">Loading dishes...</div>
        ) : dishes && dishes.length > 0 ? (
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">Popular Dishes</h3>
            <div className="flex flex-wrap gap-2">
              {dishes.map((dish, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {dish}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* Reddit Mentions */}
        {isLoadingMentions ? (
          <div className="text-sm text-gray-500">Loading mentions...</div>
        ) : mentions && mentions.length > 0 ? (
          <div>
            <h3 className="font-semibold text-sm mb-3">
              Reddit Mentions ({mentions.length})
            </h3>
            <div className="space-y-4">
              {mentions.map((mention: any) => (
                <div
                  key={mention.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition overflow-hidden"
                >
                  {mention.type === 'comment' && mention.postTitle && (
                    <div className="text-xs text-gray-500 mb-2 truncate">
                      from: {mention.postTitle}
                    </div>
                  )}

                  <blockquote className="text-sm text-gray-700 mb-2 italic break-words">
                    "{getExcerpt(mention.body)}"
                  </blockquote>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="px-2 py-0.5 bg-gray-100 rounded flex-shrink-0">
                        {mention.type}
                      </span>
                      {mention.author && (
                        <span className="truncate">by u/{mention.author}</span>
                      )}
                      {mention.score !== null && (
                        <span className="flex-shrink-0">
                          • {mention.score} points
                        </span>
                      )}
                    </div>
                  </div>

                  {mention.permalink && (
                    <a
                      href={`https://reddit.com${mention.permalink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm mt-2 inline-block truncate max-w-full"
                    >
                      Read full {mention.type} on Reddit →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No mentions found</p>
        )}
      </div>
    </div>
  );
}
