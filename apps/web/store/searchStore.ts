import { create } from 'zustand';

type RestaurantLocation = {
  id: number;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
};

type RestaurantGroup = {
  id: number;
  name: string;
  normalizedScore: number | null;
  rawScore: number | null;
  locationCount: number;
  locations: RestaurantLocation[];
  // Dish search specific fields
  dishMatches?: string[];
  mentions?: number;
  avgSentiment?: number | null;
  compoundScore?: number;
};

type SearchStore = {
  searchResults: RestaurantGroup[];
  setSearchResults: (results: RestaurantGroup[]) => void;
  clearSearchResults: () => void;
  hasActiveSearch: boolean;
  setHasActiveSearch: (active: boolean) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
  clearSearchResults: () => set({ searchResults: [], hasActiveSearch: false }),
  hasActiveSearch: false,
  setHasActiveSearch: (active) => set({ hasActiveSearch: active }),
}));
