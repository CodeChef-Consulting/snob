'use client';

import { trpc } from '../lib/providers';
import GoogleMapReact from 'google-map-react';
import { useState, useRef } from 'react';
import RestaurantSidebar from './RestaurantSidebar';
import RestaurantSearch from './RestaurantSearch';
import { useSearchStore } from '../store/searchStore';

type RestaurantLocation = {
  id: number;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  latitude: number | null;
  longitude: number | null;
  googlePlaceId: string | null;
};

type RestaurantGroup = {
  id: number;
  name: string;
  normalizedScore: number | null;
  rawScore: number | null;
  locationCount: number;
  locations: RestaurantLocation[];
};

type MarkerProps = {
  lat: number;
  lng: number;
  location: RestaurantLocation;
  groupId: number;
  groupName: string;
  normalizedScore: number | null;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  $hover?: boolean;
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

const Marker = ({ normalizedScore, isSelected, isHighlighted, onClick }: MarkerProps) => {
  const color = getScoreColor(normalizedScore);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer transform -translate-x-1/2 -translate-y-full relative"
      style={{ position: 'absolute', zIndex: isSelected ? 1000 : isHighlighted ? 500 : 1 }}
    >
      <div
        className={`rounded-full shadow-lg flex items-center justify-center text-white text-xs font-bold transition-all ${
          isSelected
            ? 'w-10 h-10 border-2 border-white'
            : 'w-8 h-8 border-2 border-white'
        }`}
        style={{ backgroundColor: color }}
      >
        {normalizedScore !== null ? normalizedScore.toFixed(1) : '?'}
      </div>
      <div
        className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent mx-auto"
        style={{ borderTopColor: color }}
      />
    </div>
  );
};

export default function RestaurantMap() {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const isDraggingRef = useRef(false);
  const mapRef = useRef<any>(null);

  const { searchResults, hasActiveSearch } = useSearchStore();

  const {
    data: groups,
    isLoading,
    error,
  } = trpc.customRestaurantGroup.getHighScoringGroups.useQuery({
    minScore: 8,
    limit: 500,
  });

  // Fetch selected group details if it's not in the current groups list
  const { data: selectedGroupData } = trpc.customRestaurantGroup.getGroupById.useQuery(
    { id: selectedGroupId! },
    { enabled: selectedGroupId !== null }
  );


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl text-gray-900">Loading restaurant groups...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl text-red-700">
          Error loading restaurant groups: {error.message}
        </div>
      </div>
    );
  }

  // Flatten all locations from all groups for marker display
  const allLocations =
    groups?.flatMap((group) =>
      group.locations
        .filter((loc) => loc.latitude !== null && loc.longitude !== null)
        .map((loc) => ({
          ...loc,
          groupId: group.id,
          groupName: group.name,
          normalizedScore: group.normalizedScore,
        }))
    ) ?? [];

  // If there's an active search, use search results; otherwise show all locations
  const displayGroups = hasActiveSearch ? searchResults : groups ?? [];

  // Determine which locations to display
  let displayLocations;
  if (selectedGroupId) {
    // If a group is selected, only show locations for that group
    let selectedGroup = displayGroups.find((g) => g.id === selectedGroupId);

    // If not found in displayGroups, use the separately fetched group data
    if (!selectedGroup && selectedGroupData) {
      selectedGroup = selectedGroupData;
    }

    displayLocations = selectedGroup
      ? selectedGroup.locations
          .filter((loc) => loc.latitude !== null && loc.longitude !== null)
          .map((loc) => ({
            ...loc,
            groupId: selectedGroup.id,
            groupName: selectedGroup.name,
            normalizedScore: selectedGroup.normalizedScore,
          }))
      : [];
  } else if (hasActiveSearch) {
    // If searching but no group selected, show all search results
    displayLocations = searchResults.flatMap((group) =>
      group.locations
        .filter((loc) => loc.latitude !== null && loc.longitude !== null)
        .map((loc) => ({
          ...loc,
          groupId: group.id,
          groupName: group.name,
          normalizedScore: group.normalizedScore,
        }))
    );
  } else {
    // Default: show all locations
    displayLocations = allLocations;
  }

  const handleSelectGroup = (groupId: number, locationId?: number) => {
    // Ignore clicks that happened during/after drag
    if (isDraggingRef.current) {
      return;
    }

    setSelectedGroupId(groupId);
    setSelectedLocationId(locationId ?? null);

    // Use setTimeout to ensure map panning happens after state updates and data fetching
    setTimeout(() => {
      if (!mapRef.current) return;

      // Find the group - check displayGroups first, then selectedGroupData
      let group = displayGroups.find((g) => g.id === groupId);
      if (!group && selectedGroupData && selectedGroupData.id === groupId) {
        group = selectedGroupData;
      }

      if (!group) return;

      const validLocations = group.locations.filter(
        (loc) => loc.latitude !== null && loc.longitude !== null
      );

      if (validLocations.length === 0) return;

      // If specific location selected, pan to it
      if (locationId) {
        const location = validLocations.find((loc) => loc.id === locationId);
        if (location && location.latitude && location.longitude) {
          mapRef.current.panTo({ lat: location.latitude, lng: location.longitude });
          mapRef.current.setZoom(15);
          return;
        }
      }

      // Otherwise, fit bounds to show all locations
      if (validLocations.length === 1) {
        // Single location - just pan and zoom
        const loc = validLocations[0];
        mapRef.current.panTo({ lat: loc.latitude!, lng: loc.longitude! });
        mapRef.current.setZoom(14);
      } else {
        // Multiple locations - fit bounds
        const bounds = new google.maps.LatLngBounds();
        validLocations.forEach((loc) => {
          bounds.extend({ lat: loc.latitude!, lng: loc.longitude! });
        });
        mapRef.current.fitBounds(bounds);
      }
    }, 100);
  };

  const defaultCenter = { lat: 34.0522, lng: -118.2437 };
  const defaultZoom = 11;

  return (
    <div className="h-screen flex relative">
      {/* Map - Full screen */}
      <div className="flex-1">
        <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
            }}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            options={{
              fullscreenControl: false,
            }}
            onClick={() => {
              setSelectedGroupId(null);
              setSelectedLocationId(null);
            }}
            onGoogleApiLoaded={({ map }) => {
              mapRef.current = map;

              // Track drag events using ref to avoid state timing issues
              map.addListener('dragstart', () => {
                isDraggingRef.current = true;
              });
              map.addListener('dragend', () => {
                // Keep dragging flag set for a short time after drag ends
                setTimeout(() => {
                  isDraggingRef.current = false;
                }, 200);
              });
            }}
            yesIWantToUseGoogleMapApiInternals
          >
            {displayLocations.map((location) => {
              const isPartOfSelectedGroup = selectedGroupId === location.groupId;
              const isThisLocationSelected = selectedLocationId === location.id;

              return (
                <Marker
                  key={`${location.groupId}-${location.id}`}
                  lat={location.latitude!}
                  lng={location.longitude!}
                  location={location}
                  groupId={location.groupId}
                  groupName={location.groupName}
                  normalizedScore={location.normalizedScore}
                  isSelected={isThisLocationSelected}
                  isHighlighted={isPartOfSelectedGroup}
                  onClick={() => handleSelectGroup(location.groupId, location.id)}
                  $hover={false}
                />
              );
            })}
          </GoogleMapReact>
      </div>

      {/* Toggle visibility button - Fixed position */}
      <button
        onClick={() => setIsPanelVisible(!isPanelVisible)}
        className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-lg rounded-full shadow-lg p-2 hover:bg-white transition-colors"
        aria-label={isPanelVisible ? "Hide search panel" : "Show search panel"}
      >
        {isPanelVisible ? (
          // Eye slash icon (hide)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        ) : (
          // Eye icon (show)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        )}
      </button>

      {/* Floating search and sidebar panel - Top right */}
      {isPanelVisible && (
        <div className="absolute top-4 right-4 flex flex-col gap-4 max-w-md w-96 z-10">
          <RestaurantSearch onSelectGroup={handleSelectGroup} />

          {selectedGroupId && (
            <RestaurantSidebar
              groupId={selectedGroupId}
              selectedLocationId={selectedLocationId}
              onClose={() => {
                setSelectedGroupId(null);
                setSelectedLocationId(null);
              }}
              onSelectLocation={(locationId) => handleSelectGroup(selectedGroupId, locationId)}
              onSelectGroup={(groupId) => handleSelectGroup(groupId)}
            />
          )}
        </div>
      )}
    </div>
  );
}
