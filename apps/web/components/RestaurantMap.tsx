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


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl text-gray-700">Loading restaurant groups...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl text-red-600">
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
    const selectedGroup = displayGroups.find((g) => g.id === selectedGroupId);
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

    // Find the group to get bounds
    const group = displayGroups.find((g) => g.id === groupId);
    if (!group || !mapRef.current) return;

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
  };

  const defaultCenter = { lat: 34.0522, lng: -118.2437 };
  const defaultZoom = 11;

  const totalLocations = displayLocations.length;
  const totalGroups = displayGroups.length;

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Restaurant Map</h1>
            <p className="text-sm text-gray-600">
              {hasActiveSearch
                ? `${totalGroups} groups, ${totalLocations} locations`
                : `${totalGroups} groups (score > 8), ${totalLocations} locations`}
            </p>
          </div>
          <RestaurantSearch onSelectGroup={handleSelectGroup} />
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
                />
              );
            })}
          </GoogleMapReact>
        </div>

        {/* Sidebar */}
        {selectedGroupId && (
          <RestaurantSidebar
            groupId={selectedGroupId}
            selectedLocationId={selectedLocationId}
            onClose={() => {
              setSelectedGroupId(null);
              setSelectedLocationId(null);
            }}
            onSelectLocation={(locationId) => handleSelectGroup(selectedGroupId, locationId)}
          />
        )}
      </div>
    </div>
  );
}
