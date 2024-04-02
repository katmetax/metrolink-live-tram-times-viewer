import { useEffect, useState } from 'react';

/**
 * Stores up to 4 of the most recent tram stop searches
 * @param departureStation The departure station to save
 */
export const useStoreRecentTramSearches = (departureStation: string) => {
  const [recentTramSearches, setRecentTramSearches] = useState<string[]>([]);

  useEffect(() => {
    const storedRecentTramSearches = localStorage.getItem('recentTramSearches');

    if (storedRecentTramSearches) {
      setRecentTramSearches(JSON.parse(storedRecentTramSearches));
    } else {
      localStorage.setItem(
        'recentTramSearches',
        JSON.stringify([departureStation])
      );
    }
  }, []);

  useEffect(() => {
    const addDepartureStationToRecentSearches = [departureStation].concat(
      recentTramSearches
    );
    const dedupedRecentSearches = Array.from(
      new Set(addDepartureStationToRecentSearches)
    );

    if (dedupedRecentSearches.length > 4) {
      const fourRecentTramSearches = dedupedRecentSearches.slice(0, -1);

      localStorage.setItem(
        'recentTramSearches',
        JSON.stringify(fourRecentTramSearches)
      );
    } else {
      localStorage.setItem(
        'recentTramSearches',
        JSON.stringify(dedupedRecentSearches)
      );
    }
  }, [recentTramSearches]);
};
