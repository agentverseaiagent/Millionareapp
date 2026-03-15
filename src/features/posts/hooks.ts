import { useState, useEffect, useCallback } from 'react';
import { getGlobalFeed, getModelFeed } from './api';
import type { Post } from './types';

export function useGlobalFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setPosts(await getGlobalFeed());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { posts, loading, error, refresh };
}

export function useModelFeed(vehicleModelId: string | null) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!vehicleModelId) {
      setPosts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setPosts(await getModelFeed(vehicleModelId));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [vehicleModelId]);

  useEffect(() => { refresh(); }, [refresh]);

  return { posts, loading, error, refresh };
}
