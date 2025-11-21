import _ from 'lodash';

type RestaurantLocationLike = {
  id: number;
  name: string;
  source: string;
  googlePlaceId: string | null;
  lookupAliases: string[];
  metadata: any;
  createdAt: Date;
};

/**
 * Sort locations by winner priority: Open Data Portal first, then by createdAt (oldest wins)
 */
export function sortByWinnerPriority<T extends RestaurantLocationLike>(
  locations: T[]
): T[] {
  return _.sortBy(locations, [
    (l) => (l.source === 'Open Data Portal' ? 0 : 1),
    (l) => l.createdAt.getTime(),
  ]);
}

/**
 * Calculate final merged data from a group of duplicate locations
 * Winner = Open Data Portal source first, then oldest by createdAt
 */
export function calculateMergedData(locations: RestaurantLocationLike[]): {
  finalName: string;
  finalGooglePlaceId: string | null;
  finalAliases: string[];
  finalMetadata: any;
} {
  const sorted = sortByWinnerPriority(locations);
  const winner = _.first(sorted)!;
  const losers = _.tail(sorted);

  // Use Google Place name if winner is from Open Data Portal and there's a Google Place loser
  const googlePlaceLoser = losers.find((l) => l.source === 'Google Places API');
  const finalName =
    winner.source === 'Open Data Portal' && googlePlaceLoser
      ? googlePlaceLoser.name
      : winner.name;

  // Use oldest non-null googlePlaceId
  const finalGooglePlaceId =
    winner.googlePlaceId ||
    losers.find((l) => l.googlePlaceId)?.googlePlaceId ||
    null;

  // Merge all unique aliases
  const allAliases = _.flatMap(sorted, (l) => l.lookupAliases);
  const finalAliases = _.compact(_.uniq(allAliases));

  // Merge metadata with winner taking priority
  const allMetadata = _.map(sorted, (l) => l.metadata || {});
  const finalMetadata = _.merge(
    {},
    ..._.reverse([...allMetadata]),
    winner.metadata
  );

  return { finalName, finalGooglePlaceId, finalAliases, finalMetadata };
}
