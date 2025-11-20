import { create } from 'zustand';

type SearchResult = {
  id: number;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  normalizedScore: number | null;
  dishMatches?: string[];
  mentions?: number;
  avgSentiment?: number | null;
  compoundScore?: number;
};

type SearchStore = {
  searchResults: SearchResult[];
  setSearchResults: (results: SearchResult[]) => void;
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
