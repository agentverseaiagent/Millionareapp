import { useState, useCallback } from 'react';
import { searchVehicles } from './api';
import type { VehicleSearchResult } from './types';

export function useVehicleSearch() {
  const [results, setResults] = useState<VehicleSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setResults(await searchVehicles(query));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
}
