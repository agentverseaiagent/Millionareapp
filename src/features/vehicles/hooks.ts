import { useState, useCallback, useRef } from 'react';
import { searchVehicles } from './api';
import type { VehicleSearchResult } from './types';

const DEBOUNCE_MS = 200;

export function useVehicleSearch() {
  const [results, setResults] = useState<VehicleSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Monotonically incrementing generation counter — ensures only the
  // response matching the most recent request is applied to state.
  // Without this, a slow "hon" response can overwrite a fast "honda"
  // response, replacing the make-first result set with a stale one.
  const generationRef = useRef(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback((query: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      generationRef.current++;
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounceRef.current = setTimeout(async () => {
      const gen = ++generationRef.current;
      setError(null);
      try {
        const data = await searchVehicles(query);
        if (gen === generationRef.current) setResults(data);
      } catch (err: any) {
        if (gen === generationRef.current) setError(err.message);
      } finally {
        if (gen === generationRef.current) setLoading(false);
      }
    }, DEBOUNCE_MS);
  }, []);

  return { results, loading, error, search };
}
